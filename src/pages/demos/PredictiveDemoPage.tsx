/**
 * PredictiveDemoPage — example of a static demo page that lives
 * inside this same repo. Add your own charts, screenshots, or
 * interactive widgets here.
 *
 * Route: /demos/predictive
 * Linked from: products[2].demoPage in site.config.ts
 */

import { Link } from "react-router-dom";
import { useFadeIn } from "../../hooks/useFadeIn";
import { ArrowLeft, TrendingUp, Brain, Database, BarChart2 } from "lucide-react";
import { ParticleBackground } from "../../components/ParticleBackground";

function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, style } = useFadeIn({ delay, y: 18 });
  return <div ref={ref} style={style}>{children}</div>;
}

// Fake sparkline data for the demo chart
const forecastData = [42, 45, 41, 48, 53, 50, 58, 62, 59, 67, 71, 78, 75, 83, 88, 92, 89, 97, 103, 110];
const actualData = [42, 44, 43, 47, 51, 52, 57, 61, 60, 66, 70, 77, 76, 84, 87, 90, 91, null, null, null];

const W = 520, H = 200;
const minV = 30, maxV = 120;
const toY = (v: number) => H - ((v - minV) / (maxV - minV)) * H;
const toX = (i: number) => (i / (forecastData.length - 1)) * W;

const forecastPath = forecastData.map((v, i) => `${i === 0 ? "M" : "L"} ${toX(i)},${toY(v)}`).join(" ");
const actualPoints = actualData.filter((v) => v !== null) as number[];
const actualPath = actualPoints.map((v, i) => `${i === 0 ? "M" : "L"} ${toX(i)},${toY(v)}`).join(" ");

export function PredictiveDemoPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#030814", color: "#fff", overflow: "hidden" }}>
      {/* Top bar */}
      <div style={{ position: "sticky", top: 0, zIndex: 40, padding: "16px 28px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(3,8,20,0.9)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <Link to="/products" style={{ display: "flex", alignItems: "center", gap: 8, color: "rgba(255,255,255,0.5)", textDecoration: "none", fontSize: 14, fontWeight: 600 }}>
          <ArrowLeft size={15} /> Products
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#00FFB2", boxShadow: "0 0 10px #00FFB2" }} />
          <span style={{ fontFamily: "Syne,sans-serif", fontWeight: 700, fontSize: 15 }}>Blink Predictive Analytics — Demo</span>
        </div>
        <div style={{ width: 80 }} />
      </div>

      {/* Hero */}
      <section style={{ position: "relative", padding: "80px 24px 60px", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 60% at 50% 0%, rgba(0,255,178,0.07) 0%, transparent 70%)" }} />
          <ParticleBackground config={{ count: 30, speed: 0.25, colors: ["#00FFB2", "#00C2FF"] }} />
        </div>
        <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 10 }}>
          <div>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 16px", borderRadius: 100, background: "rgba(0,255,178,0.1)", border: "1px solid rgba(0,255,178,0.2)", color: "#00FFB2", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 28 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#00FFB2" }} />
              Live Demo Preview
            </span>
            <h1 style={{ fontFamily: "Syne,sans-serif", fontWeight: 800, fontSize: "clamp(2.2rem,5vw,3.5rem)", lineHeight: 1, marginBottom: 16 }}>
              Predictive Analytics<br />
              <span style={{ background: "linear-gradient(135deg, #00FFB2, #00C2FF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                in Action
              </span>
            </h1>
            <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "1.1rem", lineHeight: 1.65, maxWidth: 520, margin: "0 auto" }}>
              This demo shows a sample ML forecasting dashboard. Replace this page with your actual app screenshots, embedded iframes, or interactive prototypes.
            </p>
          </div>
        </div>
      </section>

      {/* Forecast Chart Demo */}
      <section style={{ padding: "0 24px 80px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <FadeUp>
            <div style={{ background: "rgba(8,15,31,0.9)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 24, padding: "36px 40px", marginBottom: 24 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 32, flexWrap: "wrap", gap: 12 }}>
                <div>
                  <h3 style={{ fontFamily: "Syne,sans-serif", fontWeight: 800, fontSize: "1.2rem", color: "#fff", marginBottom: 4 }}>Revenue Forecast</h3>
                  <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 13 }}>90-day prediction with 94% confidence interval</p>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <div style={{ width: 24, height: 2, background: "#00FFB2", borderRadius: 2 }} />
                    <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 12 }}>Forecast</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <div style={{ width: 24, height: 2, background: "#00C2FF", borderRadius: 2 }} />
                    <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 12 }}>Actual</span>
                  </div>
                </div>
              </div>

              {/* SVG Chart */}
              <div style={{ overflowX: "auto" }}>
                <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", maxWidth: W, display: "block", margin: "0 auto" }}>
                  {/* Grid lines */}
                  {[0, 0.25, 0.5, 0.75, 1].map((t) => (
                    <line key={t} x1={0} y1={H * t} x2={W} y2={H * t} stroke="rgba(255,255,255,0.04)" strokeWidth={1} />
                  ))}

                  {/* Forecast area fill */}
                  <path
                    d={`${forecastPath} L ${toX(forecastData.length - 1)},${H} L 0,${H} Z`}
                    fill="rgba(0,255,178,0.05)"
                  />

                  {/* Forecast line */}
                  <path d={forecastPath} fill="none" stroke="#00FFB2" strokeWidth={2} strokeDasharray="6 3" />

                  {/* Actual area fill */}
                  <path
                    d={`${actualPath} L ${toX(actualPoints.length - 1)},${H} L 0,${H} Z`}
                    fill="rgba(0,194,255,0.07)"
                  />

                  {/* Actual line */}
                  <path d={actualPath} fill="none" stroke="#00C2FF" strokeWidth={2.5} />

                  {/* Data points on actual */}
                  {actualPoints.map((v, i) => (
                    <circle key={i} cx={toX(i)} cy={toY(v)} r={3} fill="#00C2FF" />
                  ))}

                  {/* Divider — forecast starts here */}
                  <line x1={toX(actualPoints.length - 1)} y1={0} x2={toX(actualPoints.length - 1)} y2={H}
                    stroke="rgba(255,255,255,0.12)" strokeWidth={1} strokeDasharray="4 3" />
                  <text x={toX(actualPoints.length - 1) + 6} y={14} fill="rgba(255,255,255,0.3)" fontSize={10}>Forecast →</text>
                </svg>
              </div>
            </div>
          </FadeUp>

          {/* KPI Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { icon: <TrendingUp size={18} />, label: "Model Accuracy", value: "94.2%", color: "#00FFB2" },
              { icon: <Brain size={18} />, label: "Features Used", value: "47", color: "#00C2FF" },
              { icon: <Database size={18} />, label: "Training Records", value: "2.4M", color: "#0066FF" },
              { icon: <BarChart2 size={18} />, label: "Forecast Horizon", value: "90 days", color: "#00FFB2" },
            ].map((kpi, i) => (
              <FadeUp key={i} delay={i * 0.08}>
                <div style={{ background: "rgba(8,15,31,0.9)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: "20px 20px" }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: `${kpi.color}15`, color: kpi.color, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12 }}>
                    {kpi.icon}
                  </div>
                  <div style={{ fontFamily: "Syne,sans-serif", fontWeight: 800, fontSize: "1.4rem", color: "#fff" }}>{kpi.value}</div>
                  <div style={{ color: "rgba(255,255,255,0.35)", fontSize: 12, marginTop: 2 }}>{kpi.label}</div>
                </div>
              </FadeUp>
            ))}
          </div>

          {/* CTA */}
          <FadeUp delay={0.3}>
            <div style={{ background: "linear-gradient(135deg, rgba(0,255,178,0.08), rgba(0,194,255,0.06))", border: "1px solid rgba(0,255,178,0.15)", borderRadius: 20, padding: "40px 36px", textAlign: "center" }}>
              <h3 style={{ fontFamily: "Syne,sans-serif", fontWeight: 800, fontSize: "1.5rem", color: "#fff", marginBottom: 10 }}>
                Want this built for your business?
              </h3>
              <p style={{ color: "rgba(255,255,255,0.4)", marginBottom: 24, maxWidth: 400, margin: "0 auto 24px" }}>
                This is a sample visualization. We build custom ML pipelines, dashboards, and forecasting models tailored to your data.
              </p>
              <Link to="/#contact"
                style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 28px", borderRadius: 12, background: "linear-gradient(135deg, #00FFB2, #00C2FF)", color: "#030814", fontWeight: 800, fontSize: 14, textDecoration: "none" }}>
                Get in Touch
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>
    </div>
  );
}
