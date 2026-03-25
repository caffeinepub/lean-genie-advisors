import { useCounterAnimation } from "@/hooks/useCounterAnimation";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { motion } from "motion/react";

interface AnimatedStatCardProps {
  label: string;
  value: string;
  numericValue?: number;
  delay?: number;
  dark?: boolean;
}

export function AnimatedStatCard({
  label,
  value,
  numericValue,
  delay = 0,
  dark = false,
}: AnimatedStatCardProps) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.3 });
  const animatedCount = useCounterAnimation({
    end: numericValue || 0,
    enabled: isVisible && !!numericValue,
    duration: 2000,
  });

  return (
    <motion.div
      ref={ref as React.RefObject<HTMLDivElement>}
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: delay / 1000, duration: 0.5 }}
      className={`rounded-xl p-5 transition-all duration-300 hover:scale-[1.02] ${
        dark
          ? "border border-white/10 bg-white/5 hover:bg-white/8"
          : "border border-border bg-white shadow-sm hover:shadow-glow-sm"
      }`}
    >
      {/* Accent line */}
      <div className="mb-3 h-0.5 w-6 rounded-full bg-gradient-to-r from-aqua-400 to-teal-400" />
      <p
        className={`mb-1 font-body text-[11px] font-semibold uppercase tracking-widest ${
          dark ? "text-white/40" : "text-muted-foreground"
        }`}
      >
        {label}
      </p>
      <p
        className={`font-display text-base font-bold leading-snug ${
          dark ? "text-white" : "text-foreground"
        }`}
      >
        {numericValue && isVisible ? animatedCount : value}
      </p>
    </motion.div>
  );
}
