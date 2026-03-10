/**
 * PredictiveDemoPage — responsive demo page.
 * Route: /demos/predictive
 */

import { Link } from "react-router-dom";
import { useFadeIn } from "../../hooks/useFadeIn";

import { ArrowLeft, TrendingUp, Brain, Database, BarChart2 } from "lucide-react";
import { ParticleBackground } from "../../components/ParticleBackground";
import { useIsMobile } from "../../hooks/isMobile";

function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, style } = useFadeIn({ delay, y: 18 });
  return <div ref={ref} style={style}>{children}</div>;
}

const forecastData = [42, 45, 41, 48, 53, 50, 58, 62, 59, 67, 71, 78, 75, 83, 88, 92, 89, 97, 103, 110];
const actualData = [42, 44, 43, 47, 51, 52, 57, 61, 60, 66, 70, 77, 76, 84, 87, 90, 91, null, null, null];

const W = 520, H = 200;
const minV = 30, maxV = 120;
const toY = (v: number) => H - ((v - minV) / (maxV - minV)) * H;
const toX = (i: number) => (i / (forecastData.length - 1)) * W;

const forecastPath = forecastData.map((v, i) => `${i === 0 ? "M" : "L"} ${toX(i)},${toY(v)}`).join(" ");
const actualPoints = actualData.filter((v): v is number => v !== null);
const actualPath = actualPoints.map((v, i) => `${i === 0 ? "M" : "L"} ${toX(i)},${toY(v)}`).join(" ");

export function PredictiveDemoPage() {
  const isMobile = useIsMobile();

  return (
    <div style={{ minHeight: "100vh", background: "#030814", color: "#fff", overflowX: "hidden" }}>

      {/* ── Top bar ── */}
      <div style={{
        position: "sticky", top: 0, zIndex: 40,
        padding: isMobile ? "14px 16px" : "16px 28px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: "rgba(3,8,20,0.92)", backdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        gap: 12,
      }}>
        <Link to="/products" style={{
          display: "flex", alignItems: "center", gap: 6,
          color: "rgba(255,255,255,0.5)", textDecoration: "none",
          fontSize: 13, fontWeight: 600, flexShrink: 0,
        }}>
          <ArrowLeft size={14} /> {isMobile ? "" : "Products"}
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#00FFB2", boxShadow: "0 0 8px #00FFB2", flexShrink: 0 }} />
          <span style={{
            fontFamily: "Syne, sans-serif", fontWeight: 700,
            fontSize: isMobile ? 12 : 15,
            whiteSpace: isMobile ? "nowrap" : "normal",
            overflow: "hidden", textOverflow: "ellipsis",
          }}>
            {isMobile ? "Predictive Demo" : "Blink Predictive Analytics — Demo"}
          </span>
        </div>
        <div style={{ width: isMobile ? 24 : 80, flexShrink: 0 }} />
      </div>

      {/* ── Hero ── */}
      <section style={{
        position: "relative",
        padding: isMobile ? "48px 20px 36px" : "80px 24px 60px",
        overflow: "hidden",
      }}>
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 60% at 50% 0%, rgba(0,255,178,0.07) 0%, transparent 70%)" }} />
          {!isMobile && <ParticleBackground config={{ count: 30, speed: 0.25, colors: ["#00FFB2", "#00C2FF"] }} />}
        </div>
        <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 10 }}>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "5px 14px", borderRadius: 100,
            background: "rgba(0,255,178,0.1)", border: "1px solid rgba(0,255,178,0.2)",
            color: "#00FFB2", fontSize: 10, fontWeight: 700, letterSpacing: "0.1em",
            textTransform: "uppercase", marginBottom: isMobile ? 20 : 28,
          }}>
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#00FFB2", flexShrink: 0 }} />
            Live Demo Preview
          </span>
          <h1 style={{
            fontFamily: "Syne, sans-serif", fontWeight: 800,
            fontSize: isMobile ? "clamp(1.8rem,7vw,2.4rem)" : "clamp(2.2rem,5vw,3.5rem)",
            lineHeight: 1.05, marginBottom: 14,
          }}>
            Predictive Analytics<br />
            <span style={{ background: "linear-gradient(135deg, #00FFB2, #00C2FF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              in Action
            </span>
          </h1>
          <p style={{
            color: "rgba(255,255,255,0.45)",
            fontSize: isMobile ? "0.9rem" : "1.05rem",
            lineHeight: 1.65, maxWidth: 480, margin: "0 auto",
          }}>
            This demo shows a sample ML forecasting dashboard. Replace this page with your actual app screenshots, embedded iframes, or interactive prototypes.
          </p>
        </div>
      </section>

      {/* ── Chart + KPIs ── */}
      <section style={{ padding: isMobile ? "0 16px 60px" : "0 24px 80px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>

          {/* Chart card */}
          <FadeUp>
            <div style={{
              background: "rgba(8,15,31,0.9)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 20, marginBottom: 20,
              padding: isMobile ? "24px 20px" : "36px 40px",
            }}>
              <div style={{
                display: "flex", alignItems: "flex-start", justifyContent: "space-between",
                marginBottom: 24, flexWrap: "wrap", gap: 12,
              }}>
                <div>
                  <h3 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: isMobile ? "1rem" : "1.2rem", color: "#fff", marginBottom: 4 }}>
                    Revenue Forecast
                  </h3>
                  <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 12 }}>
                    90-day prediction with 94% confidence interval
                  </p>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <div style={{ width: 20, height: 2, background: "#00FFB2", borderRadius: 2 }} />
                    <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 11 }}>Forecast</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <div style={{ width: 20, height: 2, background: "#00C2FF", borderRadius: 2 }} />
                    <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 11 }}>Actual</span>
                  </div>
                </div>
              </div>

              <div style={{ overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
                <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", minWidth: isMobile ? 300 : "auto", maxWidth: W, display: "block", margin: "0 auto" }}>
                  {[0, 0.25, 0.5, 0.75, 1].map((t) => (
                    <line key={t} x1={0} y1={H * t} x2={W} y2={H * t} stroke="rgba(255,255,255,0.04)" strokeWidth={1} />
                  ))}
                  <path d={`${forecastPath} L ${toX(forecastData.length - 1)},${H} L 0,${H} Z`} fill="rgba(0,255,178,0.05)" />
                  <path d={forecastPath} fill="none" stroke="#00FFB2" strokeWidth={2} strokeDasharray="6 3" />
                  <path d={`${actualPath} L ${toX(actualPoints.length - 1)},${H} L 0,${H} Z`} fill="rgba(0,194,255,0.07)" />
                  <path d={actualPath} fill="none" stroke="#00C2FF" strokeWidth={2.5} />
                  {actualPoints.map((v, i) => (
                    <circle key={i} cx={toX(i)} cy={toY(v)} r={3} fill="#00C2FF" />
                  ))}
                  <line x1={toX(actualPoints.length - 1)} y1={0} x2={toX(actualPoints.length - 1)} y2={H}
                    stroke="rgba(255,255,255,0.12)" strokeWidth={1} strokeDasharray="4 3" />
                  <text x={toX(actualPoints.length - 1) + 6} y={14} fill="rgba(255,255,255,0.3)" fontSize={10}>Forecast →</text>
                </svg>
              </div>
            </div>
          </FadeUp>

          {/* KPI cards — 2 col on mobile, 4 on desktop */}
          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, 1fr)",
            gap: isMobile ? 10 : 16,
            marginBottom: isMobile ? 20 : 28,
          }}>
            {[
              { icon: <TrendingUp size={16} />, label: "Model Accuracy", value: "94.2%", color: "#00FFB2" },
              { icon: <Brain size={16} />, label: "Features Used", value: "47", color: "#00C2FF" },
              { icon: <Database size={16} />, label: "Training Records", value: "2.4M", color: "#0066FF" },
              { icon: <BarChart2 size={16} />, label: "Forecast Horizon", value: "90 days", color: "#00FFB2" },
            ].map((kpi, i) => (
              <FadeUp key={i} delay={i * 0.08}>
                <div style={{
                  background: "rgba(8,15,31,0.9)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: 16,
                  padding: isMobile ? "16px 14px" : "20px",
                  height: "100%",
                }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: 9,
                    background: `${kpi.color}15`, color: kpi.color,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    marginBottom: 10,
                  }}>
                    {kpi.icon}
                  </div>
                  <div style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: isMobile ? "1.2rem" : "1.4rem", color: "#fff" }}>
                    {kpi.value}
                  </div>
                  <div style={{ color: "rgba(255,255,255,0.35)", fontSize: isMobile ? 11 : 12, marginTop: 2 }}>
                    {kpi.label}
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>

          {/* CTA */}
          <FadeUp delay={0.3}>
            <div style={{
              background: "linear-gradient(135deg, rgba(0,255,178,0.08), rgba(0,194,255,0.06))",
              border: "1px solid rgba(0,255,178,0.15)",
              borderRadius: 20,
              padding: isMobile ? "28px 20px" : "40px 36px",
              textAlign: "center",
            }}>
              <h3 style={{
                fontFamily: "Syne, sans-serif", fontWeight: 800,
                fontSize: isMobile ? "1.15rem" : "1.5rem",
                color: "#fff", marginBottom: 10,
              }}>
                Want this built for your business?
              </h3>
              <p style={{
                color: "rgba(255,255,255,0.4)",
                fontSize: isMobile ? "0.88rem" : "0.95rem",
                lineHeight: 1.65,
                maxWidth: 400, margin: "0 auto 24px",
              }}>
                This is a sample visualization. We build custom ML pipelines, dashboards, and forecasting models tailored to your data.
              </p>
              <Link to="/#contact" style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: isMobile ? "11px 22px" : "12px 28px",
                borderRadius: 12,
                background: "linear-gradient(135deg, #00FFB2, #00C2FF)",
                color: "#030814", fontWeight: 800, fontSize: 14,
                textDecoration: "none",
              }}>
                Get in Touch
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>
    </div>
  );
}