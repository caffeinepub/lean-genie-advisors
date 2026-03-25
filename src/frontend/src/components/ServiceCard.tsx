import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { motion } from "motion/react";

interface ServiceCardProps {
  image?: string;
  gradientFallback?: boolean;
  title: string;
  description: string;
  delay?: number;
}

export function ServiceCard({
  image,
  gradientFallback = false,
  title,
  description,
  delay = 0,
}: ServiceCardProps) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <motion.div
      ref={ref as React.RefObject<HTMLDivElement>}
      initial={{ opacity: 0, y: 28 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: delay / 1000, duration: 0.55, ease: "easeOut" }}
      className="group relative overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition-all duration-400 hover:-translate-y-2 hover:shadow-card-hover"
    >
      {/* Image or gradient header */}
      <div className="relative h-48 overflow-hidden">
        {image ? (
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : gradientFallback ? (
          <div className="h-full w-full bg-gradient-to-br from-aqua-500 via-teal-600 to-slate-800">
            {/* Decorative shapes */}
            <div className="absolute inset-0 flex items-center justify-center opacity-20">
              <div className="h-32 w-32 rounded-full border-4 border-white" />
              <div className="absolute h-20 w-20 rounded-full border-2 border-white" />
            </div>
            <div className="absolute bottom-4 left-4 right-4">
              <div className="h-1 w-16 rounded-full bg-white/60" />
              <div className="mt-1.5 h-1 w-10 rounded-full bg-white/40" />
            </div>
          </div>
        ) : null}
        {/* Overlay gradient on bottom of image */}
        <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/20 to-transparent" />
      </div>

      {/* Card content */}
      <div className="p-6">
        {/* Accent line */}
        <div className="mb-4 h-0.5 w-8 rounded-full bg-gradient-to-r from-aqua-500 to-teal-400" />
        <h3 className="mb-2.5 font-display text-lg font-bold text-foreground transition-colors duration-300 group-hover:text-aqua-700">
          {title}
        </h3>
        <p className="font-body text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>
    </motion.div>
  );
}
