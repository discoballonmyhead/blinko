import { Link } from "react-router-dom";
import { useFadeIn } from "../hooks/useFadeIn";
import { BarChart3, Layout, BrainCircuit, ChevronRight, Play, ExternalLink, Monitor } from "lucide-react";
import { AnimatedGridPattern } from "../components/AnimatedGridPattern";
import { ParticleBackground } from "../components/ParticleBackground";
import { siteConfig } from "../config/site.config";

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
  const icon = product.demoType === "video" ? <Play size={15} /> : product.demoType === "url" ? <ExternalLink size={15} /> : <Monitor size={15} />;

  return (
    <Link
      to={`/demo/${product.id}`}
      style={{
        display: "inline-flex", alignItems: "center", gap: 7, padding: "11px 22px",
        borderRadius: 11, fontWeight: 700, fontSize: 13, textDecoration: "none", color: "#fff",
        background: `linear-gradient(135deg, ${product.color}, #0066FF)`,
        boxShadow: `0 0 28px ${product.color}35`, transition: "all 0.2s",
      }}
      onMouseEnter={e => (e.currentTarget as HTMLElement).style.opacity = "0.88"}
      onMouseLeave={e => (e.currentTarget as HTMLElement).style.opacity = "1"}
    >
      {icon}{label}
    </Link>
  );
}

export function ProductsPage() {
  return (
    <div style={{ background: "#030814", minHeight: "100vh", color: "#fff", overflowX: "hidden" }}>

      {/* Hero */}
      <section style={{ position: "relative", paddingTop: 160, paddingBottom: 96, paddingLeft: 24, paddingRight: 24, overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 60% at 50% 0%, rgba(0,102,255,0.2) 0%, transparent 70%)" }} />
          <AnimatedGridPattern numSquares={20} maxOpacity={0.2} duration={6} />
          <ParticleBackground config={{ count: 40, speed: 0.3 }} />
        </div>
        <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 10 }}>
          <div>
            <span className="eyebrow mb-8 inline-flex">Our Products</span>
          </div>
          <h1
            style={{ fontFamily: "Syne,sans-serif", fontWeight: 800, fontSize: "clamp(2.8rem,6vw,4.5rem)", lineHeight: 0.95, marginBottom: 20, marginTop: 20 }}>
            <span style={{ color: "#fff" }}>Powerful tools for</span><br />
            <span className="gradient-text-blue">every data need</span>
          </h1>
          <p
            style={{ color: "rgba(255,255,255,0.45)", fontSize: "1.15rem", lineHeight: 1.65, maxWidth: 500, margin: "0 auto" }}>
            From raw data to boardroom decisions — our three product lines cover the full analytics journey.
          </p>
        </div>
      </section>

      {/* Products — alternating layout */}
      <section style={{ padding: "20px 24px 120px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", flexDirection: "column", gap: 96 }}>
          {siteConfig.products.map((product, i) => (
            <FadeUp key={product.id} delay={0.1}>
              <div style={{ display: "flex", flexDirection: i % 2 === 0 ? "row" : "row-reverse", gap: 64, alignItems: "center", flexWrap: "wrap" }}>

                {/* Visual panel */}
                <div style={{ flex: "1 1 360px", minWidth: 280 }}>
                  <div style={{
                    position: "relative", borderRadius: 20, overflow: "hidden",
                    border: "1px solid rgba(255,255,255,0.07)", aspectRatio: "16/10",
                    background: `linear-gradient(135deg, ${product.color}0d, ${product.color}06)`,
                  }}>
                    <div className="absolute inset-0 opacity-25">
                      <AnimatedGridPattern numSquares={10} maxOpacity={0.35} duration={7} />
                    </div>
                    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 14 }}>
                      <div style={{
                        width: 88, height: 88, borderRadius: 22, display: "flex", alignItems: "center", justifyContent: "center",
                        background: `${product.color}1a`, color: product.color,
                        boxShadow: `0 0 60px ${product.color}35`,
                      }}>
                        {iconMap[product.icon]}
                      </div>
                      <span style={{ color: "rgba(255,255,255,0.25)", fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>{product.name}</span>
                    </div>
                    {/* Demo badge */}
                    <div style={{ position: "absolute", bottom: 16, right: 16 }}>
                      <DemoButton product={product} />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div style={{ flex: "1 1 300px" }}>
                  <span style={{ display: "inline-block", padding: "5px 14px", borderRadius: 100, fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16, background: `${product.color}15`, color: product.color }}>
                    {product.name}
                  </span>
                  <h2 style={{ fontFamily: "Syne,sans-serif", fontWeight: 800, fontSize: "clamp(1.6rem,3vw,2.2rem)", color: "#fff", lineHeight: 1.1, marginBottom: 16 }}>
                    {product.subtitle}
                  </h2>
                  <p style={{ color: "rgba(255,255,255,0.48)", fontSize: "1rem", lineHeight: 1.75, marginBottom: 24 }}>
                    {product.description}
                  </p>
                  <ul style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 16px", marginBottom: 32 }}>
                    {product.features.map(f => (
                      <li key={f} style={{ display: "flex", alignItems: "center", gap: 7, color: "rgba(255,255,255,0.55)", fontSize: "0.88rem" }}>
                        <ChevronRight size={13} style={{ color: product.color, flexShrink: 0 }} />{f}
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
