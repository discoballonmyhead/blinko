import { Link } from "react-router-dom";
import { useFadeIn } from "../hooks/useFadeIn";

import { Check, Zap } from "lucide-react";
import { AnimatedGridPattern } from "../components/AnimatedGridPattern";
import { ParticleBackground } from "../components/ParticleBackground";
import { siteConfig } from "../config/site.config";
import { useIsMobile } from "../hooks/isMobile";

function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, style } = useFadeIn({ delay, y: 18 });
  return <div ref={ref} style={style}>{children}</div>;
}

export function PricingPage() {
  const isMobile = useIsMobile();

  return (
    <div className="bg-[#030814] min-h-screen text-white overflow-x-hidden">

      {/* ── Hero ── */}
      <section className="relative overflow-hidden" style={{ paddingTop: isMobile ? 100 : 160, paddingBottom: isMobile ? 48 : 80, paddingLeft: isMobile ? 20 : 24, paddingRight: isMobile ? 20 : 24 }}>
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_0%,rgba(0,194,255,0.12),transparent)]" />
          <AnimatedGridPattern numSquares={isMobile ? 8 : 15} maxOpacity={0.18} duration={6} />
          {!isMobile && <ParticleBackground config={{ count: 30, speed: 0.25 }} />}
        </div>
        <div className="relative z-10" style={{ maxWidth: 680, margin: "0 auto", textAlign: "center" }}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00C2FF]/10 border border-[#00C2FF]/20 text-[#00C2FF] text-xs font-semibold uppercase tracking-widest mb-6">
            <Zap size={12} />
            Pricing
          </div>
          <h1 style={{
            fontFamily: "Syne, sans-serif", fontWeight: 800, color: "#fff",
            fontSize: isMobile ? "clamp(2.4rem,9vw,3.2rem)" : "clamp(3rem,6vw,4.5rem)",
            lineHeight: 1, marginBottom: 16,
          }}>
            {siteConfig.pricing.headline}
          </h1>
          <p style={{ color: "rgba(255,255,255,0.45)", fontSize: isMobile ? "1rem" : "1.15rem", lineHeight: 1.65 }}>
            {siteConfig.pricing.subheadline}
          </p>
        </div>
      </section>

      {/* ── Plans ── */}
      <section style={{ padding: isMobile ? "32px 16px 64px" : "16px 24px 120px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
            gap: isMobile ? 16 : 24,
            alignItems: "stretch",
          }}>
            {siteConfig.pricing.plans.map((plan, i) => (
              <FadeUp key={plan.name} delay={i * 0.12}>
                <div style={{
                  position: "relative", height: "100%", display: "flex", flexDirection: "column",
                  borderRadius: 20, padding: isMobile ? "28px 22px" : "32px",
                  border: plan.highlighted ? "1px solid rgba(0,194,255,0.4)" : "1px solid rgba(255,255,255,0.07)",
                  background: plan.highlighted
                    ? "linear-gradient(to bottom, rgba(0,194,255,0.08), rgba(0,102,255,0.04))"
                    : "rgba(8,15,31,0.9)",
                  boxShadow: plan.highlighted ? "0 0 60px rgba(0,194,255,0.12)" : "none",
                  transition: "border-color 0.3s",
                }}>
                  {plan.highlighted && (
                    <div style={{ position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)" }}>
                      <div style={{
                        padding: "5px 16px", borderRadius: 100,
                        background: "linear-gradient(135deg, #00C2FF, #0066FF)",
                        color: "#fff", fontSize: 10, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase",
                        whiteSpace: "nowrap",
                      }}>
                        Most Popular
                      </div>
                    </div>
                  )}

                  {/* Header */}
                  <div style={{ marginBottom: 20 }}>
                    <h3 style={{
                      fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase",
                      color: plan.highlighted ? "#00C2FF" : "rgba(255,255,255,0.35)",
                      marginBottom: 12, fontFamily: "DM Sans, sans-serif",
                    }}>
                      {plan.name}
                    </h3>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 10 }}>
                      <span style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: isMobile ? "2.6rem" : "3rem", color: "#fff", lineHeight: 1 }}>
                        {plan.price}
                      </span>
                      {plan.period && (
                        <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 13 }}>{plan.period}</span>
                      )}
                    </div>
                    {plan.description && (
                      <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.85rem", lineHeight: 1.6 }}>
                        {plan.description}
                      </p>
                    )}
                  </div>

                  {/* Features */}
                  <ul style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24, flex: 1 }}>
                    {plan.features.map((feature: string) => (
                      <li key={feature} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                        <div style={{
                          width: 20, height: 20, borderRadius: "50%", flexShrink: 0, marginTop: 1,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          background: plan.highlighted ? "rgba(0,194,255,0.15)" : "rgba(255,255,255,0.06)",
                        }}>
                          <Check size={11} style={{ color: plan.highlighted ? "#00C2FF" : "rgba(255,255,255,0.35)" }} />
                        </div>
                        <span style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.88rem", lineHeight: 1.55 }}>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Link
                    to={plan.ctaPath}
                    style={{
                      display: "block", textAlign: "center",
                      padding: "13px 20px", borderRadius: 12,
                      fontWeight: 700, fontSize: 14, textDecoration: "none",
                      color: "#fff", transition: "opacity 0.2s",
                      background: plan.highlighted
                        ? "linear-gradient(135deg, #00C2FF, #0066FF)"
                        : "rgba(255,255,255,0.06)",
                      border: plan.highlighted ? "none" : "1px solid rgba(255,255,255,0.1)",
                      boxShadow: plan.highlighted ? "0 0 28px rgba(0,194,255,0.25)" : "none",
                    }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.opacity = "0.85"}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.opacity = "1"}
                  >
                    {plan.cta}
                  </Link>
                </div>
              </FadeUp>
            ))}
          </div>

          {/* Fine print */}
          <FadeUp delay={0.4}>
            <p style={{ textAlign: "center", color: "rgba(255,255,255,0.22)", fontSize: 13, marginTop: 36, lineHeight: 1.7 }}>
              All prices are project-based estimates. Custom scoping available for all plans.{" "}
              <br style={{ display: isMobile ? "none" : "block" }} />
              <Link to="/#contact" style={{ color: "rgba(0,194,255,0.55)", textDecoration: "underline" }}>Talk to us</Link>{" "}
              to find the right fit.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ── Reassurance strip ── */}
      <section style={{
        padding: isMobile ? "40px 20px 60px" : "64px 24px",
        borderTop: "1px solid rgba(255,255,255,0.05)",
      }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
            gap: isMobile ? 24 : 32,
          }}>
            {[
              { title: "No lock-in contracts", desc: "Work with us project-by-project or retainer—your choice." },
              { title: "Fiverr-backed reputation", desc: "Pro & Top Rated freelancer with dozens of verified client reviews." },
              { title: "Results guaranteed", desc: "We iterate until the insights are actionable and the client is satisfied." },
            ].map((item, i) => (
              <FadeUp key={item.title} delay={i * 0.1}>
                <div style={{ padding: isMobile ? "0" : "8px", textAlign: "center" }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: 12,
                    background: "rgba(0,194,255,0.08)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    margin: "0 auto 14px",
                  }}>
                    <Check size={17} style={{ color: "#00C2FF" }} />
                  </div>
                  <h4 style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, color: "#fff", marginBottom: 6, fontSize: "0.95rem" }}>
                    {item.title}
                  </h4>
                  <p style={{ color: "rgba(255,255,255,0.38)", fontSize: "0.85rem", lineHeight: 1.65 }}>
                    {item.desc}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
