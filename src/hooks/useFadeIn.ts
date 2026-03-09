import { useEffect, useRef, useState } from "react";

export function useFadeIn<T extends HTMLElement = HTMLDivElement>(
  options: { delay?: number; duration?: number; y?: number; once?: boolean } = {}
) {
  const { delay = 0, duration = 0.6, y = 20, once = true } = options;
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); if (once) obs.disconnect(); }
        else if (!once) setVisible(false);
      },
      { rootMargin: "-60px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [once]);

  return {
    ref,
    style: {
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : `translateY(${y}px)`,
      transition: `opacity ${duration}s ease ${delay}s, transform ${duration}s ease ${delay}s`,
    } as React.CSSProperties,
  };
}
