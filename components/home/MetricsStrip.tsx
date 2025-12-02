import { motion } from "framer-motion";

const metrics = [
  {
    label: "Admin, costing & compliance",
    value: "45h",
    caption: "per 100 project hours"
  },
  {
    label: "Rework from early misalignment",
    value: "8h",
    caption: "saved through clearer briefs"
  },
  {
    label: "Concept phase at risk of non-payment",
    value: "~30h",
    caption: "shifted towards paid work"
  }
];

export function MetricsStrip() {
  return (
    <section aria-label="Cocoon impact metrics">
      <div className="container-x">
        <motion.div
          className="grid gap-4 rounded-2xl border border-border-subtle bg-surface-raised/80 p-4 shadow-soft md:grid-cols-3 md:p-6"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {metrics.map((m) => (
            <div
              key={m.label}
              className="flex flex-col gap-1 border-border-subtle/60 md:border-l md:first:border-l-0 md:pl-4 md:first:pl-0"
            >
              <p className="text-xs text-text-muted/80">{m.caption}</p>
              <p className="text-2xl font-semibold text-white">{m.value}</p>
              <p className="text-xs text-text-muted">{m.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
