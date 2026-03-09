import { useRef, useEffect } from "react";
import { siteConfig } from "../config/site.config";

type Testimonial = typeof siteConfig.testimonials[0];

function Avatar({ person }: { person: Testimonial }) {
    if (person.avatar) {
        return (
            <img
                src={person.avatar}
                alt={person.author}
                style={{ width: 40, height: 40, borderRadius: "50%", objectFit: "cover", flexShrink: 0 }}
            />
        );
    }
    // Fallback — initials avatar with consistent colour derived from name
    const colors = ["#00C2FF", "#7B61FF", "#00FFB2", "#FF6B6B", "#FFB347", "#0066FF"];
    const colorIdx = person.author.charCodeAt(0) % colors.length;
    const color = colors[colorIdx];
    const initials = person.author.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase();
    return (
        <div style={{
            width: 40, height: 40, borderRadius: "50%", flexShrink: 0,
            background: `${color}18`, border: `1px solid ${color}30`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 13, color,
        }}>
            {initials}
        </div>
    );
}

function TestimonialCard({ t }: { t: Testimonial }) {
    return (
        <div style={{
            flexShrink: 0, width: 320, padding: "24px 26px",
            background: "rgba(8,15,31,0.88)", backdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.07)", borderRadius: 20,
            marginRight: 16,
        }}>
            <svg
                width="28" height="22"
                viewBox="0 0 28 22"
                fill="none"
                style={{ marginBottom: 12, flexShrink: 0 }}
            >
                <path
                    d="M0 22V13.6C0 9.87 0.98 6.8 2.94 4.38C4.9 1.96 7.7 0.46 11.34 0L12.6 2.2C10.08 2.76 8.2 3.88 6.96 5.56C5.72 7.24 5.1 9.12 5.1 11.2H10.08V22H0ZM15.96 22V13.6C15.96 9.87 16.94 6.8 18.9 4.38C20.86 1.96 23.66 0.46 27.3 0L28 2.2C25.48 2.76 23.6 3.88 22.36 5.56C21.12 7.24 20.5 9.12 20.5 11.2H25.48V22H15.96Z"
                    fill="currentColor"
                    style={{ color: "rgba(0, 195, 255, 0.84)" }}
                />
            </svg>
            <p style={{
                color: "rgba(255,255,255,0.65)", fontSize: "0.88rem",
                lineHeight: 1.75, marginBottom: 20, fontStyle: "italic",
            }}>
                "{t.quote}"
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <Avatar person={t} />
                <div>
                    <div style={{ color: "#fff", fontWeight: 600, fontSize: 13, fontFamily: "Syne, sans-serif" }}>
                        {t.author}
                    </div>
                    <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 11, marginTop: 2 }}>
                        {t.role} · {t.company}
                    </div>
                </div>
                {t.source && (
                    <div style={{
                        marginLeft: "auto", fontSize: 10, fontWeight: 700,
                        color: "rgba(255,255,255,0.2)", letterSpacing: "0.08em",
                        textTransform: "uppercase",
                    }}>
                        {t.source}
                    </div>
                )}
            </div>
        </div>
    );
}

function MarqueeRow({ items, direction }: { items: Testimonial[]; direction: "left" | "right" }) {
    const trackRef = useRef<HTMLDivElement>(null);
    const animRef = useRef<number>(0);
    const posRef = useRef(direction === "right" ? -items.length * 168 : 0);
    const speed = 0.45;

    useEffect(() => {
        const track = trackRef.current;
        if (!track) return;

        // Each card is 320px + 16px gap = 336px
        const cardW = 336;
        const totalW = items.length * cardW;

        function animate() {
            if (direction === "left") {
                posRef.current -= speed;
                if (posRef.current <= -totalW) posRef.current = 0;
            } else {
                posRef.current += speed;
                if (posRef.current >= 0) posRef.current = -totalW;
            }
            if (track) track.style.transform = `translateX(${posRef.current}px)`;
            animRef.current = requestAnimationFrame(animate);
        }

        animRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animRef.current);
    }, [direction, items.length]);

    // Duplicate for seamless loop
    const doubled = [...items, ...items];

    return (
        <div style={{ overflow: "hidden", width: "100%", position: "relative" }}>
            {/* Edge fades */}
            <div style={{
                position: "absolute", left: 0, top: 0, bottom: 0, width: 120, zIndex: 2,
                background: "linear-gradient(to right, #030814, transparent)",
                pointerEvents: "none",
            }} />
            <div style={{
                position: "absolute", right: 0, top: 0, bottom: 0, width: 120, zIndex: 2,
                background: "linear-gradient(to left, #030814, transparent)",
                pointerEvents: "none",
            }} />
            <div
                ref={trackRef}
                style={{ display: "flex", willChange: "transform" }}
            >
                {doubled.map((t, i) => (
                    <TestimonialCard key={i} t={t} />
                ))}
            </div>
        </div>
    );
}

export function TestimonialMarquee() {
    const all = siteConfig.testimonials;
    if (all.length === 0) return null;

    // Split into two rows
    const mid = Math.ceil(all.length / 2);
    const row1 = all.slice(0, mid);
    const row2 = all.slice(mid);

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 16, padding: "8px 0" }}>
            <MarqueeRow items={row1} direction="left" />
            {row2.length > 0 && <MarqueeRow items={row2} direction="right" />}
        </div>
    );
}