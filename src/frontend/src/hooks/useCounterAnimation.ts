import { useEffect, useState } from "react";

interface UseCounterAnimationOptions {
  start?: number;
  end: number;
  duration?: number;
  enabled?: boolean;
}

export function useCounterAnimation({
  start = 0,
  end,
  duration = 2000,
  enabled = true,
}: UseCounterAnimationOptions) {
  const [count, setCount] = useState(start);

  useEffect(() => {
    if (!enabled) return;

    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);

      // Easing function (ease-out)
      const eased = 1 - (1 - percentage) ** 3;
      const currentCount = Math.floor(start + (end - start) * eased);

      setCount(currentCount);

      if (percentage < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [start, end, duration, enabled]);

  return count;
}
