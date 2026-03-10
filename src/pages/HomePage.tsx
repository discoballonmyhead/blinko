import {
  ArrowRight,
  BarChart3,
  BrainCircuit,
  ChevronRight,
  Layers,
  Layout,
  Mail, Phone,
  RefreshCw,
  Send,
  Shield,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatedGridPattern } from "../components/AnimatedGridPattern";
import BlurText from "../components/BlurText";
import { FadeUp } from "../components/FadeUp";
import { HeroParticleField } from "../components/HeroParticleField";
import { ParticleSplitSection } from "../components/ParticleSplitSection";
import { TestimonialMarquee } from "../components/TestimonialMarquee";
import { sectionParticles } from "../config/particles.config";
import { siteConfig } from "../config/site.config";
import { useIsMobile } from "../hooks/isMobile";


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


// ─────────────────────────────────────────────────────────────────────────────
// ProductContent — just the text/card side of each product section
// (The particle shape is handled by ParticleSplitSection wrapper)
// ─────────────────────────────────────────────────────────────────────────────

// ── Leadership Section ────────────────────────────────────────────────────────

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
  const isMobile = useIsMobile();

  return (
    <>
      <div style={{ position: "relative", zIndex: 1 }}>

        {/* ══════════════════════════ HERO ══════════════════════════ */}
        <section style={{
          minHeight: "100vh",
          display: "flex", alignItems: "center",
          padding: isMobile ? "0 20px" : "0 64px",
          position: "relative",
          overflow: "hidden",
        }}>
          <AnimatedGridPattern />
          <HeroParticleField count={isMobile ? 80 : 200} color="#00C2FF" accentColor="#ffffff" opacity={1} parallax={!isMobile} />
          <div style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            background: "radial-gradient(ellipse 60% 50% at 50% 40%, rgba(0,102,255,0.06) 0%, transparent 70%)",
          }} />

          <div style={{
            maxWidth: 860, margin: "0 auto", width: "100%",
            paddingTop: isMobile ? 100 : 120,
            paddingBottom: isMobile ? 60 : 80,
          }}>
            <h1 style={{
              fontFamily: "Syne, sans-serif", fontWeight: 800,
              fontSize: isMobile ? "clamp(2.6rem, 11vw, 3.6rem)" : "clamp(3.2rem, 7vw, 5.8rem)",
              lineHeight: 0.95, letterSpacing: "-0.03em", marginBottom: 24,
            }}>
              <span style={{ color: "#fff", display: "block" }}>{siteConfig.hero.headline}</span>
              <span className="gradient-text" style={{ display: "block" }}>{siteConfig.brand.name}</span>
            </h1>

            <p style={{
              color: "rgba(255,255,255,0.48)",
              fontSize: isMobile ? "1rem" : "1.15rem",
              lineHeight: 1.7, maxWidth: 540, marginBottom: 40,
            }}>
              {siteConfig.hero.description}
            </p>

            <div style={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              flexWrap: "wrap", gap: 12, marginBottom: 72,
            }}>
              <Link to={siteConfig.hero.primaryCTA.path} className="btn-primary" style={isMobile ? { justifyContent: "center" } : {}}>
                {siteConfig.hero.primaryCTA.label} <ArrowRight size={16} />
              </Link>
              <Link to={siteConfig.hero.secondaryCTA.path} className="btn-ghost" style={isMobile ? { justifyContent: "center" } : {}}>
                {siteConfig.hero.secondaryCTA.label}
              </Link>
            </div>
          </div>
        </section>

        {/* ══════════════════════════ PRODUCT SECTIONS ══════════════════════════ */}
        {siteConfig.products.map((product, i) => {
          const sectionCfg = sectionParticles[i];
          if (!sectionCfg) return null;
          return (
            <ParticleSplitSection key={product.id} config={sectionCfg} index={i} style={{ zIndex: 2 }}>
              <ProductContent product={product} />
            </ParticleSplitSection>
          );
        })}

        {/* ══════════════════════════ WHY BLINKO ══════════════════════════ */}
        <section id="about" style={{
          position: "relative", zIndex: 2,
          padding: isMobile ? "72px 20px" : "100px 24px",
        }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: isMobile ? 40 : 64 }}>
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
            <div style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, 1fr)",
              gap: isMobile ? 12 : 16,
            }}>
              {siteConfig.pillars.map((p, i) => (
                <FadeUp key={p.title} delay={i * 0.1}>
                  <div style={{
                    background: "rgba(8,15,31,0.6)", border: "1px solid rgba(255,255,255,0.06)",
                    borderRadius: 20, padding: isMobile ? "24px 16px" : "32px 24px",
                    textAlign: "center", height: "100%",
                  }}>
                    <div style={{
                      width: 44, height: 44, borderRadius: 10,
                      background: "rgba(0,194,255,0.07)", color: "#00C2FF",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      margin: "0 auto 16px",
                    }}>
                      {iconMap[p.icon]}
                    </div>
                    <div style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: isMobile ? "0.88rem" : "1rem", color: "#fff", marginBottom: 8 }}>
                      {p.title}
                    </div>
                    <div style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.8rem", lineHeight: 1.65 }}>
                      {p.description}
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>
        {/* ══════════════════════════ CASE STUDIES BENTO ══════════════════════════ */}
        {(!isMobile || siteConfig.mobile.showCaseStudies) && (
          <section style={{ position: "relative", zIndex: 2, padding: isMobile ? "60px 16px" : "80px 24px" }}>
            <div style={{ maxWidth: 1100, margin: "0 auto" }}>
              <FadeUp>
                <BlurText
                  text="Case Studies & Feats"
                  animateBy="words" direction="top" delay={80} stepDuration={0.35}
                  style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "clamp(2.6rem,5vw,4rem)", justifyContent: isMobile ? "center" : "flex-start", margin: "0 0 12px", background: "linear-gradient(135deg, #00C2FF, #0066FF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
                />
                <BlurText
                  text="Results that speak for themselves"
                  animateBy="words" direction="top" delay={120} stepDuration={0.32}
                  style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: "clamp(1.2rem,2.5vw,1.6rem)", color: "rgba(255,255,255,0.55)", justifyContent: isMobile ? "center" : "flex-start", margin: "0 0 36px", textAlign: isMobile ? "center" : "left" }}
                />
              </FadeUp>

              {isMobile ? (
                /* ── Mobile: simple stacked cards ── */
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {/* Case study cards */}
                  {siteConfig.caseStudies.slice(0, 3).map((cs, i) => (
                    <FadeUp key={i} delay={i * 0.08}>
                      <div style={{
                        background: i === 2
                          ? "linear-gradient(160deg, rgba(0,102,255,0.12), rgba(0,194,255,0.04))"
                          : i === 1
                            ? "rgba(0,194,255,0.04)"
                            : "rgba(8,15,31,0.88)",
                        border: `1px solid ${i === 2 ? "rgba(0,102,255,0.18)" : i === 1 ? "rgba(0,194,255,0.12)" : "rgba(255,255,255,0.07)"}`,
                        borderRadius: 20, padding: "28px 24px",
                        display: "flex", flexDirection: "row", alignItems: "center", gap: 20,
                      }}>
                        <div style={{ flexShrink: 0 }}>
                          <div className="gradient-text" style={{ fontFamily: "Syne, sans-serif", fontSize: "2.6rem", fontWeight: 800, lineHeight: 1 }}>
                            {cs.metric}
                          </div>
                          <div style={{ color: "#00FFB2", fontSize: 10, fontWeight: 700, marginTop: 4, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                            {cs.label}
                          </div>
                        </div>
                        <div>
                          <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.85rem", lineHeight: 1.65, margin: 0 }}>
                            {cs.description}
                          </p>
                          <span style={{ color: "rgba(255,255,255,0.15)", fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 8, display: "block" }}>
                            {cs.client}
                          </span>
                        </div>
                      </div>
                    </FadeUp>
                  ))}
                  {/* Stat boxes — 2-col grid on mobile */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 4 }}>
                    {siteConfig.stats.slice(0, 3).map((s, i) => (
                      <FadeUp key={i} delay={0.24 + i * 0.07} style={{ gridColumn: i === 2 ? "span 2" : "span 1" }}>
                        <div style={{
                          background: "rgba(8,15,31,0.6)", border: "1px solid rgba(255,255,255,0.06)",
                          borderRadius: 20, padding: "24px 20px",
                          display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center",
                        }}>
                          <div className="gradient-text" style={{ fontFamily: "Syne, sans-serif", fontSize: "2rem", fontWeight: 800, lineHeight: 1 }}>
                            {s.value}
                          </div>
                          <div style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.75rem", marginTop: 8, lineHeight: 1.5 }}>
                            {s.label}
                          </div>
                        </div>
                      </FadeUp>
                    ))}
                  </div>
                </div>
              ) : (
                /* ── Desktop: original 12-col bento ── */
                <div style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 16 }}>
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
              )}
            </div>
          </section>
        )}

        {/* ══════════════════════════ TESTIMONIALS ══════════════════════════ */}
        {(!isMobile || siteConfig.mobile.showTestimonials) && (
          <section style={{ position: "relative", zIndex: 2, padding: isMobile ? "60px 0" : "80px 0" }}>
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
        )}



        {/* ══════════════════════════ CONTACT ══════════════════════════ */}
        {(!isMobile || siteConfig.mobile.showContact) && (
          <section id="contact" style={{ position: "relative", zIndex: 2, padding: isMobile ? "60px 16px 80px" : "80px 24px 120px" }}>
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
                <div style={{
                  background: "rgba(8,15,31,0.88)", backdropFilter: "blur(16px)",
                  border: "1px solid rgba(255,255,255,0.07)", borderRadius: 22,
                  padding: isMobile ? "28px 20px" : "40px 36px",
                }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 20 }}>
                    {[
                      { label: "Name", key: "name", type: "text", placeholder: "Name" },
                      { label: "Email", key: "email", type: "email", placeholder: "name@company.com" },
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
        )}
      </div>
    </>
  );
}
