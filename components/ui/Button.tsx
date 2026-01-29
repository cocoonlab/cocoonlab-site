import type { ReactNode, ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";
import Link from "next/link";
import type { Route } from "next";
import type { UrlObject } from "url";

type ButtonVariant = "primary" | "secondary" | "accent";

type ButtonBaseProps = {
  children: ReactNode;
  className?: string;
  variant?: ButtonVariant;
};

type ButtonAsButtonProps = ButtonBaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type ButtonAsNextLinkProps = ButtonBaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
    href: Route | UrlObject;
    useAnchor?: false;
  };

type ButtonAsAnchorProps = ButtonBaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
    href: string;
    useAnchor: true;
  };

type ButtonProps = ButtonAsButtonProps | ButtonAsNextLinkProps | ButtonAsAnchorProps;

const VARIANT_STYLES: Record<ButtonVariant, string> = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  accent: "btn-accent"
};

export function Button(props: ButtonProps) {
  const { children, className, variant = "primary", ...rest } = props;
  const classes = [VARIANT_STYLES[variant], className].filter(Boolean).join(" ");

  if ("href" in rest && rest.href) {
    if ("useAnchor" in rest && rest.useAnchor) {
      const { useAnchor, href, ...anchorProps } = rest as ButtonAsAnchorProps;
      return (
        <a href={href} className={classes} {...anchorProps}>
          {children}
        </a>
      );
    }

    const { href, ...linkProps } = rest as ButtonAsNextLinkProps;
    return (
      <Link href={href} className={classes} {...linkProps}>
        {children}
      </Link>
    );
  }

  const buttonProps = rest as ButtonAsButtonProps;
  return (
    <button className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
