import { Link } from "react-router-dom";
import { useFadeIn } from "../hooks/useFadeIn";

import { BarChart3, Layout, BrainCircuit, ChevronRight, Play, ExternalLink, Monitor } from "lucide-react";
import { AnimatedGridPattern } from "../components/AnimatedGridPattern";
import { ParticleBackground } from "../components/ParticleBackground";
import { siteConfig } from "../config/site.config";
import { useIsMobile } from "../hooks/isMobile";

const iconMap: Record<string, React.ReactNode> = {
  BarChart3: <BarChart3 size={36} />,
  Layout: <Layout size={36} />,
  BrainCircuit: <BrainCircuit size={36} />,
};

function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, style } = useFadeIn({ delay, y: 18 });
  return <div ref={ref} style={style}>{children}</div>;
}

function DemoButton({ product }: { product: typeof siteConfig.products[0] }) {
  const label = product.demoType === "video" ? "Watch Demo" : "View Demo";
  const icon = product.demoType === "video"
    ? <Play size={15} />
    : product.demoType === "url"
      ? <ExternalLink size={15} />
      : <Monitor size={15} />;

  return (
    <Link
      to={`/demo/${product.id}`}
      style={{
        display: "inline-flex", alignItems: "center", gap: 7,
        padding: "11px 22px", borderRadius: 11, fontWeight: 700, fontSize: 13,
        textDecoration: "none", color: "#fff",
        background: `linear-gradient(135deg, ${product.color}, #0066FF)`,
        boxShadow: `0 0 28px ${product.color}35`,
        transition: "opacity 0.2s",
      }}
      onMouseEnter={e => (e.currentTarget as HTMLElement).style.opacity = "0.85"}
      onMouseLeave={e => (e.currentTarget as HTMLElement).style.opacity = "1"}
    >
      {icon}{label}
    </Link>
  );
}

export function ProductsPage() {
  const isMobile = useIsMobile();

  return (
    <div style={{ background: "#030814", minHeight: "100vh", color: "#fff", overflowX: "hidden" }}>

      {/* ── Hero ── */}
      <section style={{
        position: "relative", overflow: "hidden",
        paddingTop: isMobile ? 100 : 160,
        paddingBottom: isMobile ? 48 : 96,
        paddingLeft: isMobile ? 20 : 24,
        paddingRight: isMobile ? 20 : 24,
      }}>
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 60% at 50% 0%, rgba(0,102,255,0.2) 0%, transparent 70%)" }} />
          <AnimatedGridPattern numSquares={isMobile ? 10 : 20} maxOpacity={0.2} duration={6} />
          {!isMobile && <ParticleBackground config={{ count: 40, speed: 0.3 }} />}
        </div>
        <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 10 }}>
          <span className="eyebrow mb-6 inline-flex">Our Products</span>
          <h1 style={{
            fontFamily: "Syne, sans-serif", fontWeight: 800,
            fontSize: isMobile ? "clamp(2.2rem,9vw,3rem)" : "clamp(2.8rem,6vw,4.5rem)",
            lineHeight: 0.95, marginBottom: 20, marginTop: 16,
          }}>
            <span style={{ color: "#fff" }}>Powerful tools for</span><br />
            <span className="gradient-text-blue">every data need</span>
          </h1>
          <p style={{
            color: "rgba(255,255,255,0.45)",
            fontSize: isMobile ? "0.95rem" : "1.1rem",
            lineHeight: 1.65, maxWidth: 480, margin: "0 auto",
          }}>
            From raw data to boardroom decisions — our three product lines cover the full analytics journey.
          </p>
        </div>
      </section>

      {/* ── Products list ── */}
      <section style={{ padding: isMobile ? "16px 16px 80px" : "20px 24px 120px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", flexDirection: "column", gap: isMobile ? 48 : 96 }}>
          {siteConfig.products.map((product, i) => (
            <FadeUp key={product.id} delay={0.1}>
              <div style={{
                display: "flex",
                // On mobile always column, on desktop alternate row direction
                flexDirection: isMobile ? "column" : (i % 2 === 0 ? "row" : "row-reverse"),
                gap: isMobile ? 28 : 64,
                alignItems: isMobile ? "stretch" : "center",
              }}>

                {/* Visual panel */}
                <div style={{ flex: "1 1 360px", minWidth: 0 }}>
                  <div style={{
                    position: "relative", borderRadius: 20, overflow: "hidden",
                    border: "1px solid rgba(255,255,255,0.07)",
                    aspectRatio: "16/10",
                    background: `linear-gradient(135deg, ${product.color}0d, ${product.color}06)`,
                  }}>
                    <div style={{ position: "absolute", inset: 0, opacity: 0.25 }}>
                      <AnimatedGridPattern numSquares={10} maxOpacity={0.35} duration={7} />
                    </div>
                    <div style={{
                      position: "absolute", inset: 0,
                      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 14,
                    }}>
                      <div style={{
                        width: isMobile ? 64 : 88, height: isMobile ? 64 : 88,
                        borderRadius: isMobile ? 16 : 22,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        background: `${product.color}1a`, color: product.color,
                        boxShadow: `0 0 60px ${product.color}35`,
                      }}>
                        {iconMap[product.icon]}
                      </div>
                      <span style={{ color: "rgba(255,255,255,0.25)", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                        {product.name}
                      </span>
                    </div>
                    <div style={{ position: "absolute", bottom: 14, right: 14 }}>
                      <DemoButton product={product} />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div style={{ flex: "1 1 300px", minWidth: 0 }}>
                  <span style={{
                    display: "inline-block", padding: "5px 14px", borderRadius: 100,
                    fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
                    marginBottom: 14, background: `${product.color}15`, color: product.color,
                  }}>
                    {product.name}
                  </span>
                  <h2 style={{
                    fontFamily: "Syne, sans-serif", fontWeight: 800,
                    fontSize: isMobile ? "clamp(1.4rem,5vw,1.8rem)" : "clamp(1.6rem,3vw,2.2rem)",
                    color: "#fff", lineHeight: 1.1, marginBottom: 14,
                  }}>
                    {product.subtitle}
                  </h2>
                  <p style={{
                    color: "rgba(255,255,255,0.48)", fontSize: isMobile ? "0.92rem" : "1rem",
                    lineHeight: 1.75, marginBottom: 20,
                  }}>
                    {product.description}
                  </p>
                  <ul style={{
                    display: "grid",
                    gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                    gap: isMobile ? "8px 0" : "10px 16px",
                    marginBottom: 28,
                  }}>
                    {product.features.map((f: string) => (
                      <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: 7, color: "rgba(255,255,255,0.55)", fontSize: "0.88rem" }}>
                        <ChevronRight size={13} style={{ color: product.color, flexShrink: 0, marginTop: 2 }} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <DemoButton product={product} />
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>
    </div>
  );
}
