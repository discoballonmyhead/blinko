import { useState } from "react";
import { Link } from "react-router-dom";
import { useFadeIn } from "../hooks/useFadeIn";
import {
  BarChart3, Layout, BrainCircuit,
  Zap, Layers, RefreshCw, Shield,
  ArrowRight, Send, ChevronRight, Mail, Phone,
} from "lucide-react";
import { TestimonialMarquee } from "../components/TestimonialMarquee";
import { AnimatedGridPattern } from "../components/AnimatedGridPattern";
import { HeroParticleField } from "../components/HeroParticleField";
import { ParticleSplitSection } from "../components/ParticleSplitSection";
import { siteConfig } from "../config/site.config";
import { sectionParticles } from "../config/particles.config";
import BlurText from "../components/BlurText";


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
function FadeUp({ children, delay = 0, className = "", style = {} }: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const { ref, style: fadeStyle } = useFadeIn({ delay, y: 18 });
  return (
    <div ref={ref} style={{ ...fadeStyle, ...style }} className={className}>
      {children}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ProductContent — just the text/card side of each product section
// (The particle shape is handled by ParticleSplitSection wrapper)
// ─────────────────────────────────────────────────────────────────────────────

// ── Leadership Section ────────────────────────────────────────────────────────

function LeadershipSection() {
  const team = siteConfig.leadership;
  const [activeIdx, setActiveIdx] = useState(0);

  const roles = ["All", ...Array.from(new Set(team.map(p => p.role)))];
  const [activeRole, setActiveRole] = useState("All");

  const filtered = activeRole === "All" ? team : team.filter(p => p.role === activeRole);
  const active = filtered[activeIdx] ?? filtered[0];

  const handleRole = (role: string) => { setActiveRole(role); setActiveIdx(0); };

  return (
    <section id="founder" style={{ position: "relative", zIndex: 2, padding: "88px 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <FadeUp>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <BlurText
              text="Our Team"
              animateBy="words" direction="top" delay={80} stepDuration={0.35}
              style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "clamp(2.6rem,5vw,4rem)", justifyContent: "center", margin: "0 0 12px", background: "linear-gradient(135deg, #00C2FF, #0066FF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
            />
            <BlurText
              text="The people behind Blinko"
              animateBy="words" direction="top" delay={120} stepDuration={0.32}
              style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: "clamp(1.2rem,2.5vw,1.6rem)", color: "rgba(255,255,255,0.55)", justifyContent: "center", margin: "0 0 14px" }}
            />
            <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.95rem", maxWidth: 520, margin: "0 auto" }}>
              A team of data scientists, engineers, and strategists obsessed with turning data into decisions.
            </p>
          </div>

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

          {filtered.length === 1 ? (
            <PersonCard person={filtered[0]} expanded />
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: 24, alignItems: "start" }}>
              {/* Sidebar list */}
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

              {/* Active card — full height portrait */}
              {active && <PersonCard person={active} expanded key={active.name} />}
            </div>
          )}
        </FadeUp>
      </div>
    </section>
  );
}
function PersonCard({ person, expanded }: {
  person: typeof siteConfig.leadership[0];
  expanded?: boolean;
}) {
  const accent = person.accent ?? "#00C2FF";

  return (
    <div style={{
      background: "rgba(8,15,31,0.88)", backdropFilter: "blur(16px)",
      border: `1px solid ${accent}20`,
      borderRadius: 24,
      display: "flex",
      flexDirection: "row",
      alignItems: "stretch",
      boxShadow: `0 0 40px ${accent}0a`,
      transition: "all 0.3s ease",
      overflow: "hidden",
      minHeight: expanded ? 360 : 160,
    }}>
      {/* Left strip */}
      <div style={{ width: "30%", flexShrink: 0, position: "relative", minHeight: expanded ? 360 : 160 }}>
        {person.image ? (
          <img src={person.image} alt={person.name} style={{
            position: "absolute", inset: 0,
            width: "100%", height: "100%",
            objectFit: "cover",
            objectPosition: "center top",
            display: "block",
          }} />
        ) : (
          <div style={{
            position: "absolute", inset: 0,
            background: `linear-gradient(160deg, ${accent}22, ${accent}06)`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "Syne, sans-serif", fontWeight: 800,
            fontSize: expanded ? "3.5rem" : "2.5rem",
            color: `${accent}80`,
          }}>
            {person.name[0]}
          </div>
        )}
      </div>

      {/* Right content */}
      <div style={{ flex: 1, minWidth: 0, padding: expanded ? "36px 36px" : "24px 28px" }}>
        <span style={{ color: accent, fontSize: 11, fontWeight: 700, letterSpacing: "0.13em", textTransform: "uppercase" }}>
          {person.role}
        </span>
        <h3 style={{
          fontFamily: "Syne, sans-serif", fontWeight: 800,
          fontSize: expanded ? "1.85rem" : "1.3rem",
          color: "#fff", marginTop: 8, marginBottom: 4,
        }}>
          {person.name}
        </h3>
        <p style={{ color: "rgba(255,255,255,0.32)", fontSize: 14, marginBottom: 18 }}>
          {person.title}
        </p>
        {expanded && person.bio && (
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.95rem", lineHeight: 1.8, marginBottom: 26, maxWidth: 480 }}>
            {person.bio}
          </p>
        )}
        {person.linkedin && (
          <a href={person.linkedin} target="_blank" rel="noopener noreferrer" style={{
            display: "inline-flex", alignItems: "center", gap: 8, padding: "9px 20px",
            borderRadius: 10, background: `${accent}14`, border: `1px solid ${accent}30`,
            color: accent, fontSize: 13, fontWeight: 700, textDecoration: "none",
          }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect x="2" y="9" width="4" height="12" />
              <circle cx="4" cy="4" r="2" />
            </svg> LinkedIn
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
            {/**i removed the span for shwoing what it is it looked AI uglyu bS */}

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
            {/*I removed the stats row, it looked horrible */}
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
        <section id="about" style={{ position: "relative", zIndex: 2, padding: "100px 24px" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 64 }}>
              <BlurText
                text="Why Blinko"
                animateBy="words" direction="top" delay={80} stepDuration={0.35}
                style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "clamp(2.6rem,5vw,4rem)", justifyContent: "center", margin: "0 0 12px", background: "linear-gradient(135deg, #79e0ff, #00c3ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
              />
              <BlurText
                text="Built on four fundamentals"
                animateBy="words" direction="top" delay={120} stepDuration={0.32}
                style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: "clamp(1.2rem,2.5vw,1.6rem)", color: "rgba(255,255,255,0.55)", justifyContent: "center", margin: 0 }}
              />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }}>
              {siteConfig.pillars.map((p, i) => (
                <FadeUp key={p.title} delay={i * 0.1}>
                  <div style={{
                    background: "rgba(8,15,31,0.6)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    borderRadius: 20, padding: "32px 24px", textAlign: "center",
                    height: "100%",
                  }}>
                    <div style={{
                      width: 44, height: 44, borderRadius: 10,
                      background: "rgba(0,194,255,0.07)", color: "#00C2FF",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      margin: "0 auto 16px",
                    }}>
                      {iconMap[p.icon]}
                    </div>
                    <div style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: "1rem", color: "#fff", marginBottom: 8 }}>
                      {p.title}
                    </div>
                    <div style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.83rem", lineHeight: 1.65 }}>
                      {p.description}
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════ CASE STUDIES BENTO ══════════════════════════ */}
        <section style={{ position: "relative", zIndex: 2, padding: "80px 24px" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <FadeUp>
              <BlurText
                text="Case Studies & Feats"
                animateBy="words" direction="top" delay={80} stepDuration={0.35}
                style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "clamp(2.6rem,5vw,4rem)", justifyContent: "flex-start", margin: "0 0 12px", background: "linear-gradient(135deg, #00C2FF, #0066FF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
              />
              <BlurText
                text="Results that speak for themselves"
                animateBy="words" direction="top" delay={120} stepDuration={0.32}
                style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: "clamp(1.2rem,2.5vw,1.6rem)", color: "rgba(255,255,255,0.55)", justifyContent: "flex-start", margin: "0 0 48px" }}
              />
            </FadeUp>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 16 }}>

              {/* Case study 1 — large, col 5 */}
              <div style={{ gridColumn: "span 5" }}>
                <FadeUp delay={0} style={{ height: "100%" }}>
                  <div style={{
                    background: "rgba(8,15,31,0.88)", border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: 24, padding: "44px 40px", height: "100%",
                    display: "flex", flexDirection: "column", justifyContent: "space-between",
                  }}>
                    <div>
                      <div className="gradient-text" style={{ fontFamily: "Syne, sans-serif", fontSize: "clamp(3.5rem,6vw,5rem)", fontWeight: 800, lineHeight: 1 }}>
                        {siteConfig.caseStudies[0]?.metric}
                      </div>
                      <div style={{ color: "#00FFB2", fontSize: 12, fontWeight: 700, margin: "8px 0 20px", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                        {siteConfig.caseStudies[0]?.label}
                      </div>
                      <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.95rem", lineHeight: 1.75 }}>
                        {siteConfig.caseStudies[0]?.description}
                      </p>
                    </div>
                    <span style={{ color: "rgba(255,255,255,0.15)", fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", marginTop: 28, display: "block" }}>
                      {siteConfig.caseStudies[0]?.client}
                    </span>
                  </div>
                </FadeUp>
              </div>

              {/* Case study 2 — col 4 */}
              <div style={{ gridColumn: "span 4" }}>
                <FadeUp delay={0.1} style={{ height: "100%" }}>
                  <div style={{
                    background: "rgba(0,194,255,0.04)", border: "1px solid rgba(0,194,255,0.12)",
                    borderRadius: 24, padding: "44px 36px", height: "100%",
                    display: "flex", flexDirection: "column", justifyContent: "space-between",
                  }}>
                    <div>
                      <div className="gradient-text" style={{ fontFamily: "Syne, sans-serif", fontSize: "clamp(3.5rem,6vw,5rem)", fontWeight: 800, lineHeight: 1 }}>
                        {siteConfig.caseStudies[1]?.metric}
                      </div>
                      <div style={{ color: "#00FFB2", fontSize: 12, fontWeight: 700, margin: "8px 0 20px", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                        {siteConfig.caseStudies[1]?.label}
                      </div>
                      <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.95rem", lineHeight: 1.75 }}>
                        {siteConfig.caseStudies[1]?.description}
                      </p>
                    </div>
                    <span style={{ color: "rgba(255,255,255,0.15)", fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", marginTop: 28, display: "block" }}>
                      {siteConfig.caseStudies[1]?.client}
                    </span>
                  </div>
                </FadeUp>
              </div>

              {/* Case study 3 — tall, col 3, row span 2 */}
              <div style={{ gridColumn: "span 3", gridRow: "span 2" }}>
                <FadeUp delay={0.15} style={{ height: "100%" }}>
                  <div style={{
                    background: "linear-gradient(160deg, rgba(0,102,255,0.12), rgba(0,194,255,0.04))",
                    border: "1px solid rgba(0,102,255,0.18)",
                    borderRadius: 24, padding: "40px 28px", height: "100%",
                    display: "flex", flexDirection: "column", justifyContent: "space-between",
                  }}>
                    <div>
                      <div className="gradient-text" style={{ fontFamily: "Syne, sans-serif", fontSize: "clamp(3rem,5vw,4.2rem)", fontWeight: 800, lineHeight: 1 }}>
                        {siteConfig.caseStudies[2]?.metric}
                      </div>
                      <div style={{ color: "#00FFB2", fontSize: 12, fontWeight: 700, margin: "8px 0 20px", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                        {siteConfig.caseStudies[2]?.label}
                      </div>
                      <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.88rem", lineHeight: 1.75 }}>
                        {siteConfig.caseStudies[2]?.description}
                      </p>
                    </div>
                    <span style={{ color: "rgba(255,255,255,0.15)", fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", marginTop: 28, display: "block" }}>
                      {siteConfig.caseStudies[2]?.client}
                    </span>
                  </div>
                </FadeUp>
              </div>

              {/* Bottom row — 3 individual stat boxes + one combined */}
              {siteConfig.stats.slice(0, 3).map((s, i) => (
                <div key={i} style={{ gridColumn: "span 3" }}>
                  <FadeUp delay={0.2 + i * 0.08} style={{ height: "100%" }}>
                    <div style={{
                      background: "rgba(8,15,31,0.6)", border: "1px solid rgba(255,255,255,0.06)",
                      borderRadius: 24, padding: "32px 28px", height: "100%",
                      display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center",
                    }}>
                      <div className="gradient-text" style={{ fontFamily: "Syne, sans-serif", fontSize: "2.6rem", fontWeight: 800, lineHeight: 1 }}>
                        {s.value}
                      </div>
                      <div style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.78rem", marginTop: 10, lineHeight: 1.5, maxWidth: 120 }}>
                        {s.label}
                      </div>
                    </div>
                  </FadeUp>
                </div>
              ))}

            </div>
          </div>
        </section>

        {/* ══════════════════════════ TESTIMONIALS ══════════════════════════ */}
        <section style={{ position: "relative", zIndex: 2, padding: "80px 0" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", paddingBottom: 48 }}>
            <FadeUp>
              <div style={{ textAlign: "center", marginBottom: 52, padding: "0 24px" }}>
                <BlurText
                  text="What clients say"
                  animateBy="words" direction="top" delay={80} stepDuration={0.35}
                  style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "clamp(2.6rem,5vw,4rem)", justifyContent: "center", margin: "0 0 12px", background: "linear-gradient(135deg, #00C2FF, #0066FF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
                />
                <BlurText
                  text="Trusted by data-driven teams worldwide"
                  animateBy="words" direction="top" delay={120} stepDuration={0.32}
                  style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: "clamp(1.2rem,2.5vw,1.6rem)", color: "rgba(255,255,255,0.55)", justifyContent: "center", margin: 0 }}
                />
              </div>
            </FadeUp>
          </div>
          <TestimonialMarquee />
        </section>

        {/* ══════════════════════════ FOUNDER ══════════════════════════ */}
        {/* ══════════════════════════ LEADERSHIP ══════════════════════════ */}
        <LeadershipSection />

        {/* ══════════════════════════ PRICING ══════════════════════════ */}


        {/* ══════════════════════════ CONTACT ══════════════════════════ */}
        <section id="contact" style={{ position: "relative", zIndex: 2, padding: "80px 24px 120px" }}>
          <div style={{ maxWidth: 580, margin: "0 auto" }}>
            <FadeUp>
              <div style={{ textAlign: "center", marginBottom: 48 }}>
                <BlurText
                  text="Get in touch"
                  animateBy="words" direction="top" delay={80} stepDuration={0.35}
                  style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "clamp(2.6rem,5vw,4rem)", justifyContent: "center", margin: "0 0 12px", background: "linear-gradient(135deg, #00C2FF, #0066FF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
                />
                <BlurText
                  text={siteConfig.contact.subheadline}
                  animateBy="words" direction="top" delay={120} stepDuration={0.32}
                  style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: "clamp(1.2rem,2.5vw,1.6rem)", color: "rgba(255,255,255,0.55)", justifyContent: "center", margin: 0 }}
                />
              </div>

              {/* Contact info pills */}
              <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12, marginBottom: 40 }}>
                <a href={`mailto:${siteConfig.contact.email}`} style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  padding: "10px 20px", borderRadius: 100,
                  background: "rgba(0,194,255,0.08)", border: "1px solid rgba(0,194,255,0.2)",
                  color: "#00C2FF", fontSize: 14, textDecoration: "none", fontWeight: 500,
                }}>
                  <Mail size={14} /> {siteConfig.contact.email}
                </a>
                {siteConfig.contact.phone && (
                  <a href={`tel:${siteConfig.contact.phone}`} style={{
                    display: "inline-flex", alignItems: "center", gap: 8,
                    padding: "10px 20px", borderRadius: 100,
                    background: "rgba(0,194,255,0.08)", border: "1px solid rgba(0,194,255,0.2)",
                    color: "#00C2FF", fontSize: 14, textDecoration: "none", fontWeight: 500,
                  }}>
                    <Phone size={14} /> {siteConfig.contact.phone}
                  </a>
                )}
              </div>

              {/* Simple mailto form */}
              <div style={{
                background: "rgba(8,15,31,0.88)", backdropFilter: "blur(16px)",
                border: "1px solid rgba(255,255,255,0.07)", borderRadius: 22, padding: "40px 36px",
              }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 20 }}>
                  {[
                    { label: "Name", key: "name", type: "text", placeholder: "Your name" },
                    { label: "Email", key: "email", type: "email", placeholder: "you@company.com" },
                  ].map(f => (
                    <div key={f.key}>
                      <label style={{ display: "block", color: "rgba(255,255,255,0.3)", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>{f.label}</label>
                      <input
                        type={f.type}
                        placeholder={f.placeholder}
                        value={formData[f.key as "name" | "email"]}
                        onChange={e => setFormData({ ...formData, [f.key]: e.target.value })}
                        style={{ width: "100%", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, padding: "12px 16px", color: "#fff", fontSize: 14, outline: "none", boxSizing: "border-box" }}
                      />
                    </div>
                  ))}
                  <div>
                    <label style={{ display: "block", color: "rgba(255,255,255,0.3)", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>Message</label>
                    <textarea
                      rows={4}
                      placeholder="Tell us about your data needs..."
                      value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                      style={{ width: "100%", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, padding: "12px 16px", color: "#fff", fontSize: 14, outline: "none", resize: "none", boxSizing: "border-box" }}
                    />
                  </div>
                </div>
                <button
                  onClick={() => {
                    const subject = encodeURIComponent(`Enquiry from ${formData.name || "website"}`);
                    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`);
                    window.location.href = `mailto:${siteConfig.contact.email}?subject=${subject}&body=${body}`;
                  }}
                  className="btn-primary"
                  style={{ width: "100%", justifyContent: "center" }}
                >
                  Send Message <Send size={14} />
                </button>
              </div>
            </FadeUp>
          </div>
        </section>
      </div>
    </>
  );
}
