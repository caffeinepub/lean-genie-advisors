import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";

interface CaseStudyCardProps {
  image?: string;
  category: string;
  title: string;
  description: string[];
  results: string[];
  delay?: number;
}

export function CaseStudyCard({
  image,
  category,
  title,
  description,
  results,
  delay = 0,
}: CaseStudyCardProps) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.15 });

  return (
    <motion.div
      ref={ref as React.RefObject<HTMLDivElement>}
      initial={{ opacity: 0, y: 32 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: delay / 1000, duration: 0.6, ease: "easeOut" }}
      className="group overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition-all duration-300 hover:shadow-card-hover"
    >
      {image && (
        <div className="relative h-56 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
          <div className="absolute bottom-4 left-4">
            <span className="inline-flex items-center rounded-full bg-aqua-500/90 px-3 py-1 font-body text-xs font-semibold text-white backdrop-blur-sm">
              {category}
            </span>
          </div>
        </div>
      )}

      <div className="p-7">
        {!image && (
          <p className="mb-2 font-body text-xs font-semibold uppercase tracking-widest text-aqua-600">
            {category}
          </p>
        )}
        <h3 className="mb-4 font-display text-2xl font-bold text-foreground">
          {title}
        </h3>

        {description.map((para) => (
          <p
            key={para}
            className="mb-3 font-body text-sm leading-relaxed text-muted-foreground"
          >
            {para}
          </p>
        ))}

        <div className="mt-5 rounded-xl bg-slate-50 p-4">
          <p className="mb-3 font-body text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Key Results
          </p>
          <ul className="space-y-2">
            {results.map((result) => (
              <li key={result} className="flex items-center gap-2.5">
                <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-aqua-600" />
                <span className="font-body text-sm font-medium text-foreground">
                  {result}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}
