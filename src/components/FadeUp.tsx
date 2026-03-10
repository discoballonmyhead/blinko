import { useFadeIn } from "../hooks/useFadeIn";

export function FadeUp({ children, delay = 0, className = "", style = {} }: {
    children: React.ReactNode;
    delay?: number;
    className?: string;
    style?: React.CSSProperties;
}) {
    const { ref, style: fadeStyle } = useFadeIn({ delay, y: 18 });
    return (
        <div ref={ref} style={{ ...fadeStyle, ...style }
        } className={className} >
            {children}
        </div>
    );
}