import { useState } from "react";
import { Link } from "react-router-dom";
import { useFadeIn } from "../hooks/useFadeIn";
import {
  BarChart3, Layout, BrainCircuit,
  Zap, Layers, RefreshCw, Shield,
  ArrowRight, Linkedin, Send, ChevronRight, MapPin, Mail,
} from "lucide-react";
import { AnimatedGridPattern } from "../components/AnimatedGridPattern";
import { HeroParticleField } from "../components/HeroParticleField";
import { ParticleSplitSection } from "../components/ParticleSplitSection";
import { siteConfig } from "../config/site.config";
import { sectionParticles } from "../config/particles.config";

// ─────────────────────────────────────────────────────────────────────────────
// Utility components
// ─────────────────────────────────────────────────────────────────────────────

const iconMap: Record<string, React.ReactNode> = {
  BarChart3: <BarChart3 size={24} />,
  Layout: <Layout size={24} />,
  BrainCircuit: <BrainCircuit size={24} />,
  Zap: <Zap size={18} />,
  Layers: <Layers size={18} />,
  RefreshCw: <RefreshCw size={18} />,
  Shield: <Shield size={18} />,
};

function FadeUp({ children, delay = 0, className = "" }: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  const { ref, style } = useFadeIn({ delay, y: 18 });
  return <div ref={ref} style={style} className={className}>{children}</div>;
}

// ─────────────────────────────────────────────────────────────────────────────
// ProductContent — just the text/card side of each product section
// (The particle shape is handled by ParticleSplitSection wrapper)
// ─────────────────────────────────────────────────────────────────────────────

// ── Leadership Section ────────────────────────────────────────────────────────

function LeadershipSection() {
  const team = siteConfig.leadership;
  const [activeIdx, setActiveIdx] = useState(0);

  // Unique roles for the filter tabs
  const roles = ["All", ...Array.from(new Set(team.map(p => p.role)))];
  const [activeRole, setActiveRole] = useState("All");

  const filtered = activeRole === "All" ? team : team.filter(p => p.role === activeRole);
  const active = filtered[activeIdx] ?? filtered[0];

  // Reset selected card when filter changes
  const handleRole = (role: string) => { setActiveRole(role); setActiveIdx(0); };

  return (
    <section id="founder" style={{ position: "relative", zIndex: 2, padding: "88px 64px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <FadeUp>
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <span className="eyebrow" style={{ marginBottom: 20, display: "inline-flex" }}>Our Team</span>
            <h2 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "clamp(1.9rem,3.5vw,2.8rem)", color: "#fff", marginBottom: 14 }}>
              The People Behind Blinko
            </h2>
            <p style={{ color: "rgba(255,255,255,0.48)", fontSize: "1rem", maxWidth: 520, margin: "0 auto" }}>
              A team of data scientists, engineers, and strategists obsessed with turning data into decisions.
            </p>
          </div>

          {/* Role filter tabs — only shown when more than one role exists */}
          {roles.length > 2 && (
            <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 44, flexWrap: "wrap" }}>
              {roles.map(role => (
                <button key={role} onClick={() => handleRole(role)} style={{
                  padding: "8px 22px", borderRadius: 100, cursor: "pointer", fontSize: 13, fontWeight: 600,
                  fontFamily: "DM Sans, sans-serif", letterSpacing: "0.04em", border: "1px solid",
                  transition: "all 0.2s ease",
                  background: activeRole === role ? "rgba(0,194,255,0.12)" : "transparent",
                  borderColor: activeRole === role ? "rgba(0,194,255,0.4)" : "rgba(255,255,255,0.1)",
                  color: activeRole === role ? "#00C2FF" : "rgba(255,255,255,0.45)",
                }}>
                  {role}
                </button>
              ))}
            </div>
          )}

          {/* Layout: card grid left + expanded detail right (single person → centred card) */}
          {filtered.length === 1 ? (
            // Single person — wide centred card
            <PersonCard person={filtered[0]} expanded />
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: 24, alignItems: "start" }}>
              {/* Card list */}
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {filtered.map((person, i) => (
                  <button key={person.name} onClick={() => setActiveIdx(i)} style={{
                    display: "flex", alignItems: "center", gap: 14,
                    padding: "14px 18px", borderRadius: 16, cursor: "pointer", textAlign: "left",
                    border: "1px solid", transition: "all 0.2s ease", width: "100%",
                    background: activeIdx === i ? "rgba(8,15,31,0.95)" : "rgba(8,15,31,0.5)",
                    borderColor: activeIdx === i ? (person.accent ?? "rgba(0,194,255,0.35)") : "rgba(255,255,255,0.07)",
                    boxShadow: activeIdx === i ? `0 0 20px ${(person.accent ?? "#00C2FF")}18` : "none",
                  }}>
                    {/* Mini avatar */}
                    {person.image ? (
                      <img src={person.image} alt={person.name}
                        style={{ width: 44, height: 44, borderRadius: 10, objectFit: "cover", flexShrink: 0 }} />
                    ) : (
                      <div style={{
                        width: 44, height: 44, borderRadius: 10, flexShrink: 0,
                        background: `linear-gradient(135deg, ${(person.accent ?? "#00C2FF")}22, ${(person.accent ?? "#00C2FF")}08)`,
                        border: `1px solid ${(person.accent ?? "#00C2FF")}30`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "1.1rem",
                        color: person.accent ?? "#00C2FF",
                      }}>
                        {person.name[0]}
                      </div>
                    )}
                    <div style={{ minWidth: 0 }}>
                      <div style={{ color: "#fff", fontWeight: 600, fontSize: 14, fontFamily: "Syne, sans-serif", marginBottom: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {person.name}
                      </div>
                      <div style={{ color: person.accent ?? "#00C2FF", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                        {person.role}
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Expanded detail panel */}
              {active && <PersonCard person={active} expanded key={active.name} />}
            </div>
          )}
        </FadeUp>
      </div>
    </section>
  );
}

// Individual person card
function PersonCard({ person, expanded }: {
  person: typeof siteConfig.leadership[0];
  expanded?: boolean;
}) {
  const accent = person.accent ?? "#00C2FF";
  return (
    <div style={{
      background: "rgba(8,15,31,0.88)", backdropFilter: "blur(16px)",
      border: `1px solid ${accent}20`,
      borderRadius: 24, padding: expanded ? "44px 48px" : "28px 32px",
      display: "flex", gap: 40, alignItems: "flex-start", flexWrap: "wrap",
      boxShadow: `0 0 40px ${accent}0a`,
      transition: "all 0.3s ease",
    }}>
      {/* Avatar */}
      <div style={{ flexShrink: 0 }}>
        {person.image ? (
          <img src={person.image} alt={person.name} style={{
            width: expanded ? 130 : 90, height: expanded ? 130 : 90,
            borderRadius: 16, objectFit: "cover",
            border: `1px solid ${accent}30`,
          }} />
        ) : (
          <div style={{
            width: expanded ? 130 : 90, height: expanded ? 130 : 90, borderRadius: 16,
            background: `linear-gradient(135deg, ${accent}18, ${accent}06)`,
            border: `1px solid ${accent}28`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "Syne, sans-serif", fontWeight: 800,
            fontSize: expanded ? "3rem" : "2rem", color: accent,
          }}>
            {person.name[0]}
          </div>
        )}
      </div>

      {/* Text */}
      <div style={{ flex: 1, minWidth: 240 }}>
        <span style={{ color: accent, fontSize: 11, fontWeight: 700, letterSpacing: "0.13em", textTransform: "uppercase" }}>
          {person.role}
        </span>
        <h3 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: expanded ? "1.85rem" : "1.3rem", color: "#fff", marginTop: 8, marginBottom: 4 }}>
          {person.name}
        </h3>
        <p style={{ color: "rgba(255,255,255,0.32)", fontSize: 14, marginBottom: 18 }}>
          {person.title}
        </p>
        {expanded && (
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.95rem", lineHeight: 1.8, marginBottom: 26, maxWidth: 560 }}>
            {/*person.bio*/}
          </p>
        )}
        {person.linkedin && (
          <a href={person.linkedin} target="_blank" rel="noopener noreferrer" style={{
            display: "inline-flex", alignItems: "center", gap: 8, padding: "9px 20px",
            borderRadius: 10, background: `${accent}14`, border: `1px solid ${accent}30`,
            color: accent, fontSize: 13, fontWeight: 700, textDecoration: "none",
            transition: "all 0.2s ease",
          }}>
            <Linkedin size={13} /> LinkedIn
          </a>
        )}
      </div>
    </div>
  );
}

// ── Product Content ───────────────────────────────────────────────────────────

function ProductContent({ product }: { product: typeof siteConfig.products[0] }) {
  return (
    <div>
      <span style={{
        display: "inline-flex", alignItems: "center", gap: 7,
        padding: "5px 14px", borderRadius: 100,
        fontSize: 11, fontWeight: 700, letterSpacing: "0.1em",
        textTransform: "uppercase", marginBottom: 24,
        background: `${product.color}16`, color: product.color,
        border: `1px solid ${product.color}28`,
      }}>
        {iconMap[product.icon]} {product.name}
      </span>

      <h2 style={{
        fontFamily: "Syne, sans-serif", fontWeight: 800,
        fontSize: "clamp(1.7rem, 2.6vw, 2.4rem)",
        color: "#fff", lineHeight: 1.1, marginBottom: 18,
      }}>
        {product.subtitle}
      </h2>

      <p style={{
        color: "rgba(255,255,255,0.48)", fontSize: "0.97rem",
        lineHeight: 1.8, marginBottom: 28, maxWidth: 480,
      }}>
        {product.description}
      </p>

      <ul style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 36 }}>
        {product.features.map((f: string) => (
          <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: 10, color: "rgba(255,255,255,0.55)", fontSize: "0.9rem" }}>
            <ChevronRight size={13} style={{ color: product.color, flexShrink: 0, marginTop: 3 }} />{f}
          </li>
        ))}
      </ul>

      <Link
        to={`/products#${product.id}`}
        style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          padding: "11px 24px", borderRadius: 10,
          background: `${product.color}18`, border: `1px solid ${product.color}30`,
          color: product.color, fontSize: 13, fontWeight: 700, textDecoration: "none",
          transition: "background 0.2s",
        }}
      >
        Explore {product.name} <ArrowRight size={13} />
      </Link>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main Page
// ─────────────────────────────────────────────────────────────────────────────

export function HomePage() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [formSent, setFormSent] = useState(false);
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setFormSent(true); };

  return (
    <>
      <div style={{ position: "relative", zIndex: 1 }}>

        {/* ══════════════════════════ HERO ══════════════════════════ */}
        <section style={{
          minHeight: "100vh",
          display: "flex", alignItems: "center",
          padding: "0 64px",
          position: "relative",
          overflow: "hidden",
        }}>
          {/* Primary background grid — all settings in src/config/grid.config.ts */}
          <AnimatedGridPattern />

          {/* Ambient particle field — full hero, Indium-style */}
          <HeroParticleField count={200} color="#00C2FF" accentColor="#ffffff" opacity={1} parallax={true} />

          {/* Radial glow */}
          <div style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            background: "radial-gradient(ellipse 60% 50% at 50% 40%, rgba(0,102,255,0.06) 0%, transparent 70%)",
          }} />

          <div style={{ maxWidth: 860, margin: "0 auto", width: "100%", paddingTop: 120, paddingBottom: 80 }}>
            <div>
              <span className="eyebrow" style={{ marginBottom: 32, display: "inline-flex" }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#00C2FF", flexShrink: 0 }} />
                Data Analytics · BI · Machine Learning
              </span>
            </div>

            <h1
              style={{
                fontFamily: "Syne, sans-serif", fontWeight: 800,
                fontSize: "clamp(3.2rem, 7vw, 5.8rem)",
                lineHeight: 0.95, letterSpacing: "-0.03em", marginBottom: 28,
              }}>
              <span style={{ color: "#fff", display: "block" }}>{siteConfig.hero.headline}</span>
              <span className="gradient-text" style={{ display: "block" }}>
                {siteConfig.brand.name}
              </span>
            </h1>

            <p
              style={{
                color: "rgba(255,255,255,0.48)", fontSize: "1.15rem",
                lineHeight: 1.7, maxWidth: 540, marginBottom: 48,
              }}>
              {siteConfig.hero.description}
            </p>

            <div
              style={{ display: "flex", flexWrap: "wrap", gap: 16, marginBottom: 72 }}>
              <Link to={siteConfig.hero.primaryCTA.path} className="btn-primary">
                {siteConfig.hero.primaryCTA.label} <ArrowRight size={16} />
              </Link>
              <Link to={siteConfig.hero.secondaryCTA.path} className="btn-ghost">
                {siteConfig.hero.secondaryCTA.label}
              </Link>
            </div>

            {/* Stats row */}
            <div
              style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12 }}>
              {siteConfig.stats.map((s, i) => (
                <div key={i} style={{
                  background: "rgba(255,255,255,0.025)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: 14, padding: "16px 18px",
                  backdropFilter: "blur(10px)",
                }}>
                  <div className="gradient-text-blue" style={{
                    fontFamily: "Syne, sans-serif", fontSize: "1.65rem", fontWeight: 800,
                  }}>{s.value}</div>
                  <div style={{ color: "rgba(255,255,255,0.32)", fontSize: 12, marginTop: 3 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

        </section>

        {/* ══════════════════════════ PRODUCT SECTIONS ══════════════════════════
         *
         * Each product maps to a sectionParticles entry.
         * Even index (0,2,...) → content LEFT, particle shape RIGHT
         * Odd index  (1,3,...) → content RIGHT, particle shape LEFT
         *
         * To add more product+shape pairs:
         *   1. Add product to siteConfig.products in site.config.ts
         *   2. Add matching entry to sectionParticles in particles.config.ts
         *   3. The grid auto-expands — no other changes needed.
         ════════════════════════════════════════════════════════════════════════ */}
        {siteConfig.products.map((product, i) => {
          const sectionCfg = sectionParticles[i];
          if (!sectionCfg) return null;
          return (
            <ParticleSplitSection
              key={product.id}
              config={sectionCfg}
              index={i}
              style={{ zIndex: 2 }}
            >
              <ProductContent product={product} />
            </ParticleSplitSection>
          );
        })}

        {/* ══════════════════════════ WHY BLINKO ══════════════════════════ */}
        <section id="about" style={{ position: "relative", zIndex: 2, padding: "96px 64px" }}>
          <div style={{
            maxWidth: 1100, margin: "0 auto",
            background: "rgba(2,9,18,0.82)", backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: 28, padding: "64px 56px",
          }}>
            <FadeUp>
              <div style={{ textAlign: "center", marginBottom: 56 }}>
                <span className="eyebrow mb-5 inline-flex">Why Blinko</span>
                <h2 style={{ fontFamily: "Syne, sans-serif", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 800, marginTop: 16 }}>
                  Built on four fundamentals
                </h2>
              </div>
            </FadeUp>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20 }}>
              {siteConfig.pillars.map((p, i) => (
                <FadeUp key={p.title} delay={i * 0.1}>
                  <div style={{
                    background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)",
                    borderRadius: 18, padding: "28px 22px", textAlign: "center",
                  }}>
                    <div style={{
                      width: 48, height: 48, borderRadius: 12,
                      background: "rgba(0,194,255,0.08)", color: "#00C2FF",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      margin: "0 auto 14px",
                    }}>
                      {iconMap[p.icon]}
                    </div>
                    <h3 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "1.05rem", color: "#fff", marginBottom: 8 }}>{p.title}</h3>
                    <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.85rem", lineHeight: 1.65 }}>{p.description}</p>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════ CASE STUDIES ══════════════════════════ */}
        <section style={{ position: "relative", zIndex: 2, padding: "80px 64px" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <FadeUp>
              <span className="eyebrow section-line mb-5 inline-flex">Success Stories</span>
              <h2 style={{ fontFamily: "Syne, sans-serif", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 800, marginTop: 16, marginBottom: 48 }}>
                Results that speak
              </h2>
            </FadeUp>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
              {siteConfig.caseStudies.map((cs, i) => (
                <FadeUp key={cs.client} delay={i * 0.12}>
                  <div style={{
                    background: "rgba(8,15,31,0.88)", backdropFilter: "blur(12px)",
                    border: "1px solid rgba(255,255,255,0.07)", borderRadius: 20, padding: "36px 30px",
                  }}>
                    <div className="gradient-text" style={{ fontFamily: "Syne, sans-serif", fontSize: "3.2rem", fontWeight: 800, lineHeight: 1 }}>{cs.metric}</div>
                    <div style={{ color: "#00FFB2", fontSize: 12, fontWeight: 700, margin: "4px 0 16px", letterSpacing: "0.05em" }}>{cs.label}</div>
                    <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.9rem", lineHeight: 1.7, marginBottom: 18 }}>{cs.description}</p>
                    <span style={{ color: "rgba(255,255,255,0.18)", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>{cs.client}</span>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════ TESTIMONIALS ══════════════════════════ */}
        <section style={{ position: "relative", zIndex: 2, padding: "60px 64px" }}>
          <div style={{ maxWidth: 700, margin: "0 auto" }}>
            {siteConfig.testimonials.map((t, i) => (
              <FadeUp key={i}>
                <div style={{
                  background: "rgba(8,15,31,0.88)", backdropFilter: "blur(16px)",
                  border: "1px solid rgba(255,255,255,0.07)", borderRadius: 24, padding: "52px 48px",
                  marginBottom: 24,
                }}>
                  <div style={{ fontSize: "4rem", color: "rgba(0,194,255,0.15)", fontFamily: "Georgia,serif", lineHeight: 0.6, marginBottom: 20 }}>"</div>
                  <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "1.05rem", lineHeight: 1.8, marginBottom: 28, fontStyle: "italic" }}>{t.quote}</p>
                  <p style={{ color: "#fff", fontFamily: "Syne, sans-serif", fontWeight: 700 }}>{t.author}</p>
                  <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 13, marginTop: 3 }}>{t.company}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </section>

        {/* ══════════════════════════ FOUNDER ══════════════════════════ */}
        {/* ══════════════════════════ LEADERSHIP ══════════════════════════ */}
        <LeadershipSection />

        {/* ══════════════════════════ PRICING ══════════════════════════ */}
        <section id="pricing" style={{ position: "relative", zIndex: 2, padding: "88px 64px" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <FadeUp>
              <div style={{ textAlign: "center", marginBottom: 56 }}>
                <span className="eyebrow mb-5 inline-flex">Pricing</span>
                <h2 style={{ fontFamily: "Syne, sans-serif", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 800, marginTop: 16 }}>
                  Simple, transparent pricing
                </h2>
              </div>
            </FadeUp>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
              {siteConfig.pricing.plans.map((plan, i) => (
                <FadeUp key={plan.name} delay={i * 0.1}>
                  <div style={{
                    background: plan.highlighted ? "rgba(0,94,255,0.12)" : "rgba(8,15,31,0.88)",
                    border: plan.highlighted ? "1px solid rgba(0,194,255,0.3)" : "1px solid rgba(255,255,255,0.07)",
                    borderRadius: 22, padding: "36px 30px",
                    position: "relative", backdropFilter: "blur(12px)",
                  }}>
                    {plan.highlighted && (
                      <div style={{
                        position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)",
                        background: "linear-gradient(135deg, #00C2FF, #0066FF)",
                        color: "#fff", fontSize: 10, fontWeight: 800, letterSpacing: "0.1em",
                        textTransform: "uppercase", padding: "4px 14px", borderRadius: 20,
                      }}>Most Popular</div>
                    )}
                    <h3 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "1.2rem", color: "#fff", marginBottom: 6 }}>{plan.name}</h3>
                    <div style={{ marginBottom: 20 }}>
                      <span style={{ fontFamily: "Syne, sans-serif", fontSize: "2.8rem", fontWeight: 800, color: "#fff" }}>{plan.price}</span>
                      {plan.period && <span style={{ color: "rgba(255,255,255,0.35)", fontSize: 14, marginLeft: 4 }}>{plan.period}</span>}
                    </div>
                    <ul style={{ display: "flex", flexDirection: "column", gap: 9, marginBottom: 28 }}>
                      {plan.features.map((f: string) => (
                        <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: 8, color: "rgba(255,255,255,0.55)", fontSize: "0.88rem" }}>
                          <ChevronRight size={12} style={{ color: "#00C2FF", flexShrink: 0, marginTop: 2 }} />{f}
                        </li>
                      ))}
                    </ul>
                    <button style={{
                      width: "100%", padding: "12px 20px", borderRadius: 10, border: "none",
                      background: plan.highlighted ? "linear-gradient(135deg,#00C2FF,#0066FF)" : "rgba(255,255,255,0.06)",
                      color: "#fff", fontWeight: 700, fontSize: 14, cursor: "pointer",
                    }}>
                      {plan.cta}
                    </button>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════ CONTACT ══════════════════════════ */}
        <section id="contact" style={{ position: "relative", zIndex: 2, padding: "80px 64px 120px" }}>
          <div style={{ maxWidth: 640, margin: "0 auto" }}>
            <FadeUp>
              <div style={{ textAlign: "center", marginBottom: 48 }}>
                <h2 style={{ fontFamily: "Syne, sans-serif", fontSize: "clamp(1.8rem,3.5vw,2.8rem)", fontWeight: 800, marginBottom: 12 }}>
                  {siteConfig.contact.headline}
                </h2>
                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "1rem" }}>{siteConfig.contact.subheadline}</p>
              </div>

              {formSent ? (
                <div style={{
                  background: "rgba(8,15,31,0.9)", border: "1px solid rgba(0,255,178,0.2)",
                  borderRadius: 20, padding: "64px 40px", textAlign: "center",
                }}>
                  <div style={{
                    width: 60, height: 60, borderRadius: "50%", background: "rgba(0,255,178,0.1)",
                    display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px",
                  }}>
                    <Send style={{ color: "#00FFB2" }} size={26} />
                  </div>
                  <h3 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "1.4rem", color: "#fff", marginBottom: 8 }}>Message sent!</h3>
                  <p style={{ color: "rgba(255,255,255,0.4)" }}>We'll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{
                  background: "rgba(8,15,31,0.88)", backdropFilter: "blur(16px)",
                  border: "1px solid rgba(255,255,255,0.07)", borderRadius: 22, padding: "44px 40px",
                }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                    {[
                      { label: "Name", key: "name", type: "text", ph: "Your name" },
                      { label: "Email", key: "email", type: "email", ph: "you@company.com" },
                    ].map(f => (
                      <div key={f.key}>
                        <label style={{ display: "block", color: "rgba(255,255,255,0.3)", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>{f.label}</label>
                        <input type={f.type} required placeholder={f.ph}
                          value={formData[f.key as "name" | "email"]}
                          onChange={e => setFormData({ ...formData, [f.key]: e.target.value })}
                          style={{ width: "100%", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, padding: "12px 16px", color: "#fff", fontSize: 14, outline: "none", boxSizing: "border-box" }} />
                      </div>
                    ))}
                  </div>
                  <div style={{ marginBottom: 24 }}>
                    <label style={{ display: "block", color: "rgba(255,255,255,0.3)", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>Message</label>
                    <textarea required rows={5} placeholder="Tell us about your data needs..."
                      value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })}
                      style={{ width: "100%", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, padding: "12px 16px", color: "#fff", fontSize: 14, outline: "none", resize: "none", boxSizing: "border-box" }} />
                  </div>
                  <button type="submit" className="btn-primary" style={{ width: "100%", justifyContent: "center" }}>
                    Send Message <Send size={14} />
                  </button>
                  <div style={{ marginTop: 24, display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 20 }}>
                    {siteConfig.contact.offices.map((o: { city: string; address: string }) => (
                      <div key={o.city} style={{ display: "flex", alignItems: "center", gap: 6, color: "rgba(255,255,255,0.22)", fontSize: 12 }}>
                        <MapPin size={11} style={{ color: "#00C2FF" }} />{o.address}
                      </div>
                    ))}
                    <a href={`mailto:${siteConfig.contact.email}`} style={{ display: "flex", alignItems: "center", gap: 6, color: "rgba(255,255,255,0.22)", fontSize: 12, textDecoration: "none" }}>
                      <Mail size={11} style={{ color: "#00C2FF" }} />{siteConfig.contact.email}
                    </a>
                  </div>
                </form>
              )}
            </FadeUp>
          </div>
        </section>

      </div>
    </>
  );
}
