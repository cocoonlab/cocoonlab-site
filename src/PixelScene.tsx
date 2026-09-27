import type { CSSProperties, ReactNode } from "react";
import { Component, useEffect, useRef } from "react";
import { hexToRgb, type Raster } from "./pixel/raster.ts";
import type { Painter, Scene } from "./pixel/scene.ts";

const FPS = 12;
/** A settled moment to hold on when motion is reduced. */
const STILL_TIME = 7.5;

function toCanvas(raster: Raster, palette: readonly string[]) {
  const canvas = document.createElement("canvas");
  canvas.width = raster.width;
  canvas.height = raster.height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return canvas;
  const image = ctx.createImageData(raster.width, raster.height);
  const rgb = palette.map((hex) => (hex ? hexToRgb(hex) : null));
  raster.data.forEach((ink, i) => {
    const c = ink ? rgb[ink] : null;
    if (!c) return;
    image.data[i * 4] = c[0];
    image.data[i * 4 + 1] = c[1];
    image.data[i * 4 + 2] = c[2];
    image.data[i * 4 + 3] = 255;
  });
  ctx.putImageData(image, 0, 0);
  return canvas;
}

function toMaskCanvas(raster: Raster) {
  const canvas = document.createElement("canvas");
  canvas.width = raster.width;
  canvas.height = raster.height;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    const image = ctx.createImageData(raster.width, raster.height);
    raster.data.forEach((alpha, i) => {
      image.data[i * 4] = image.data[i * 4 + 1] = image.data[i * 4 + 2] = 255;
      image.data[i * 4 + 3] = alpha;
    });
    ctx.putImageData(image, 0, 0);
  }
  return canvas;
}

type PixelSceneProps = {
  scene: Scene;
  className?: string;
  /** Accessible description; without one the scene is decorative. */
  label?: string;
};

/** Whatever goes wrong in a scene stays in its frame; the page around it keeps rendering. */
class SceneBoundary extends Component<{ fallback: ReactNode; children: ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

/**
 * Paints a pixel scene on a canvas at one canvas pixel per cell. CSS picks the
 * whole-number unit (`--u`) and how many rows show (`--rows`); the canvas is
 * scaled with `image-rendering: pixelated`, cropped around the scene's focus,
 * animated at 12 fps (24 for cellular assembly) while on screen, and held
 * still when motion is reduced. A scene that fails leaves its frame empty.
 */
export function PixelScene(props: PixelSceneProps) {
  const { scene, className } = props;
  const empty = (
    <div
      className={`pixel-scene${className ? ` ${className}` : ""}`}
      style={{ "--rows": scene.height } as CSSProperties}
      aria-hidden="true"
    />
  );
  return (
    <SceneBoundary fallback={empty}>
      <LiveScene {...props} />
    </SceneBoundary>
  );
}

function LiveScene({ scene, className, label }: PixelSceneProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const frame = frameRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!frame || !canvas || !ctx) return;

    const back = toCanvas(scene.still, scene.palette);
    const front = scene.front ? toCanvas(scene.front, scene.palette) : null;
    const mask = scene.mask ? toMaskCanvas(scene.mask) : null;
    // Reuse buffers; no GPU readback or per-frame canvas allocation.
    const assemblyMask = scene.assembly ? document.createElement("canvas") : null;
    const assemblySource = scene.assembly ? document.createElement("canvas") : null;
    if (assemblyMask && assemblySource) {
      assemblyMask.width = assemblySource.width = scene.width;
      assemblyMask.height = assemblySource.height = scene.height;
    }
    const assemblyContext = assemblyMask?.getContext("2d");
    const sourceContext = assemblySource?.getContext("2d");
    const assemblyImage = assemblyContext?.createImageData(scene.width, scene.height);
    if (assemblyImage) assemblyImage.data.fill(255);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fps = scene.assembly ? 24 : FPS;

    let cols = scene.width;
    let offset = 0;
    let time = reduced.matches ? STILL_TIME : 0;

    const put = (x: number, y: number, w: number, h: number, ink: number) => {
      const color = scene.palette[ink];
      if (!color) return;
      ctx.fillStyle = color;
      ctx.fillRect(Math.round(x) - offset, Math.round(y), w, h);
    };
    const painter: Painter = {
      px: (x, y, ink) => put(x, y, 1, 1, ink),
      rect: (x, y, w, h, ink) => put(x, y, Math.round(w), Math.round(h), ink),
      stamp: (sprite, x, y) => {
        for (let sy = 0; sy < sprite.height; sy++) {
          for (let sx = 0; sx < sprite.width; sx++) {
            const ink = sprite.data[sy * sprite.width + sx]!;
            if (ink) put(Math.round(x) + sx, Math.round(y) + sy, 1, 1, ink);
          }
        }
      },
      shiftRow: (y, dx, x0, x1) => {
        const from = Math.max(0, x0 - dx);
        const to = Math.min(scene.width, x1 - dx);
        if (to > from) ctx.drawImage(back, from, y, to - from, 1, from + dx - offset, y, to - from, 1);
      },
      front: () => {
        if (front) ctx.drawImage(front, offset, 0, cols, scene.height, 0, 0, cols, scene.height);
      },
    };

    let laidOut = false;
    const draw = () => {
      if (!laidOut) return;
      ctx.clearRect(0, 0, cols, scene.height);
      ctx.drawImage(back, offset, 0, cols, scene.height, 0, 0, cols, scene.height);
      if (scene.animate) scene.animate(painter, time);
      else painter.front();
      if (mask) {
        ctx.globalCompositeOperation = "destination-in";
        ctx.drawImage(mask, offset, 0, cols, scene.height, 0, 0, cols, scene.height);
        ctx.globalCompositeOperation = "source-over";
      }
      if (scene.assembly && assemblyMask && assemblySource && assemblyContext && sourceContext && assemblyImage) {
        const next = scene.assembly(time);
        sourceContext.clearRect(0,0,scene.width,scene.height);
        sourceContext.drawImage(canvas,offset,0);
        for (let i = 0; i < next.mask.data.length; i++) {
          assemblyImage.data[i * 4 + 3] = next.mask.data[i]!;
        }
        assemblyContext.putImageData(assemblyImage, 0, 0);
        ctx.globalCompositeOperation = "destination-in";
        ctx.drawImage(assemblyMask, offset, 0, cols, scene.height, 0, 0, cols, scene.height);
        ctx.globalCompositeOperation = "source-over";
        for(const piece of next.pieces) {
          if(!piece.alpha || piece.x+piece.size<offset || piece.x>offset+cols) continue;
          ctx.globalAlpha=piece.alpha;
          ctx.drawImage(assemblySource,piece.sx,piece.sy,piece.size,piece.size,
            piece.x-offset,piece.y,piece.size,piece.size);
        }
        ctx.globalAlpha=1;
      }
      scene.overlay?.(painter, time);
    };

    const layout = () => {
      const width = frame.clientWidth;
      // A frame with no width yet (hidden, or not laid out) has nothing to
      // paint, and a zero-width canvas cannot be drawn from. The observer
      // calls again once the frame has a size.
      if (!width) return;
      const styles = getComputedStyle(frame);
      const requestedUnit = Math.max(1, Math.round(parseFloat(styles.getPropertyValue("--u")) || 2));
      const focus = parseFloat(styles.getPropertyValue("--focus"));
      const align = parseFloat(styles.getPropertyValue("--align"));
      const fit = styles.getPropertyValue("--fit-whole").trim() === "1";
      // Up to this share of a fitted scene's width may be cropped at its
      // edges to reach the next whole pixel, so the scene fills its frame.
      const crop = Math.min(0.5, Math.max(0, parseFloat(styles.getPropertyValue("--fit-crop")) || 0));
      // Fit product models in whole physical pixels. On a Retina display a
      // 1.5 CSS-pixel cell is three crisp screen pixels, avoiding the abrupt
      // half-size drop between desktop and tablet columns.
      const pixelRatio = Math.max(1, window.devicePixelRatio || 1);
      const fittedUnit = Math.floor(width / (scene.width * (1 - crop)) * pixelRatio) / pixelRatio;
      const unit = fit ? Math.max(1, Math.min(requestedUnit, fittedUnit)) : requestedUnit;
      if (fit) frame.style.height = `${scene.height * unit}px`;
      cols = Math.min(scene.width, Math.ceil(width / unit));
      offset = Math.round((scene.width - cols) * (Number.isFinite(focus) ? focus : scene.focus));
      canvas.width = cols;
      canvas.height = scene.height;
      canvas.style.width = `${cols * unit}px`;
      canvas.style.height = `${scene.height * unit}px`;
      canvas.style.left = `${Math.floor((width - cols * unit) * (Number.isFinite(align) ? align : 0.5))}px`;
      ctx.imageSmoothingEnabled = false;
      laidOut = true;
      draw();
      frame.dataset.ready = "true";
    };

    let raf = 0;
    let last = 0;
    let visible = false;
    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      if (!last) last = now;
      const next = time + Math.min(0.25, (now - last) / 1000);
      last = now;
      if (Math.floor(next * fps) !== Math.floor(time * fps)) {
        time = next;
        draw();
      } else {
        time = next;
      }
    };
    const start = () => {
      if (raf || reduced.matches || !visible || document.hidden) return;
      last = 0;
      raf = requestAnimationFrame(tick);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };
    const sync = () => {
      if (reduced.matches) {
        stop();
        time = STILL_TIME;
        draw();
      } else if (visible && !document.hidden) {
        start();
      } else {
        stop();
      }
    };

    layout();

    const resize = new ResizeObserver(layout);
    resize.observe(frame);
    const onScreen = new IntersectionObserver(
      (entries) => {
        visible = entries.some((entry) => entry.isIntersecting);
        sync();
      },
      { rootMargin: "120px" },
    );
    onScreen.observe(frame);
    document.addEventListener("visibilitychange", sync);
    reduced.addEventListener("change", sync);

    return () => {
      stop();
      resize.disconnect();
      onScreen.disconnect();
      document.removeEventListener("visibilitychange", sync);
      reduced.removeEventListener("change", sync);
    };
  }, [scene]);

  return (
    <div
      ref={frameRef}
      className={`pixel-scene${className ? ` ${className}` : ""}`}
      style={{ "--rows": scene.height } as CSSProperties}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      <canvas ref={canvasRef} className="pixel-canvas" />
    </div>
  );
}
