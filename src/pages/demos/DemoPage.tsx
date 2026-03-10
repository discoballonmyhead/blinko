/**
 * DemoPage — full-screen demo viewer. Responsive.
 * Route: /demo/:productId
 */

import { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

import { ArrowLeft, ExternalLink, Play } from "lucide-react";
import { siteConfig } from "../../config/site.config";
import { useIsMobile } from "../../hooks/isMobile";

export function DemoPage() {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const product = siteConfig.products.find((p) => p.id === productId);

  useEffect(() => {
    if (!product) return;
    if (product.demoType === "url" && product.demoUrl) {
      window.open(product.demoUrl, "_blank", "noopener,noreferrer");
    } else if (product.demoType === "page" && product.demoPage) {
      navigate(product.demoPage, { replace: true });
    }
  }, [product]);

  if (!product) {
    return (
      <div style={{
        minHeight: "100vh", background: "#030814",
        display: "flex", alignItems: "center", justifyContent: "center",
        flexDirection: "column", gap: 20, padding: 24, textAlign: "center",
      }}>
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 18 }}>Product not found.</p>
        <Link to="/products" style={{
          color: "#00C2FF", textDecoration: "none",
          display: "inline-flex", alignItems: "center", gap: 6,
          fontSize: 14, fontWeight: 600,
        }}>
          <ArrowLeft size={16} /> Back to Products
        </Link>
      </div>
    );
  }

  // ── URL type: "launching" screen ──
  if (product.demoType === "url") {
    return (
      <div style={{
        minHeight: "100vh", background: "#030814",
        display: "flex", alignItems: "center", justifyContent: "center",
        flexDirection: "column", gap: 24,
        padding: isMobile ? "40px 20px" : 24,
      }}>
        <div style={{
          width: isMobile ? 60 : 72,
          height: isMobile ? 60 : 72,
          borderRadius: "50%",
          background: `${product.color}18`,
          border: `1px solid ${product.color}40`,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <ExternalLink style={{ color: product.color }} size={isMobile ? 24 : 30} />
        </div>
        <div style={{ textAlign: "center", maxWidth: 400 }}>
          <h2 style={{
            fontFamily: "Syne, sans-serif", fontWeight: 800,
            fontSize: isMobile ? "1.4rem" : "1.8rem",
            color: "#fff", marginBottom: 10,
          }}>
            Launching {product.name} Demo
          </h2>
          <p style={{
            color: "rgba(255,255,255,0.4)",
            fontSize: isMobile ? "0.9rem" : "0.95rem",
            lineHeight: 1.65, marginBottom: 28,
          }}>
            The demo has opened in a new tab. If it didn't open,{" "}
            <a href={product.demoUrl!} target="_blank" rel="noopener noreferrer"
              style={{ color: "#00C2FF" }}>click here</a>.
          </p>
          <Link to="/products" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "11px 22px", borderRadius: 10,
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "rgba(255,255,255,0.7)", textDecoration: "none",
            fontSize: 14, fontWeight: 600,
          }}>
            <ArrowLeft size={15} /> Back to Products
          </Link>
        </div>
      </div>
    );
  }

  // ── Video type: full-screen player ──
  if (product.demoType === "video") {
    return (
      <div style={{ minHeight: "100vh", background: "#010509", display: "flex", flexDirection: "column" }}>

        {/* Top bar */}
        <div style={{
          padding: isMobile ? "12px 16px" : "16px 28px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          background: "rgba(3,8,20,0.9)", backdropFilter: "blur(16px)",
          flexShrink: 0, gap: 12,
        }}>
          <Link to="/products" style={{
            display: "flex", alignItems: "center", gap: 6,
            color: "rgba(255,255,255,0.55)", textDecoration: "none",
            fontSize: 13, fontWeight: 600, flexShrink: 0,
          }}>
            <ArrowLeft size={15} />
            {!isMobile && "Products"}
          </Link>

          <div style={{ display: "flex", alignItems: "center", gap: 8, overflow: "hidden" }}>
            <div style={{
              width: 7, height: 7, borderRadius: "50%",
              background: product.color,
              boxShadow: `0 0 8px ${product.color}`,
              flexShrink: 0,
            }} />
            <span style={{
              color: "#fff", fontFamily: "Syne, sans-serif", fontWeight: 700,
              fontSize: isMobile ? 13 : 15,
              whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
            }}>
              {product.name}
            </span>
          </div>

          <div style={{ width: isMobile ? 24 : 80, flexShrink: 0 }} />
        </div>

        {/* Video area */}
        <div style={{
          flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
          padding: isMobile ? "20px 16px" : 32,
        }}>
          {product.demoVideo ? (
            <video
              src={product.demoVideo}
              controls
              autoPlay
              style={{
                maxWidth: "100%",
                maxHeight: isMobile ? "calc(100vh - 120px)" : "calc(100vh - 140px)",
                width: "100%",
                borderRadius: isMobile ? 12 : 16,
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow: `0 0 80px ${product.color}20`,
              }}
            />
          ) : (
            <div style={{ textAlign: "center", padding: "0 20px" }}>
              <div style={{
                width: isMobile ? 64 : 80,
                height: isMobile ? 64 : 80,
                borderRadius: "50%",
                background: `${product.color}15`,
                border: `1px solid ${product.color}30`,
                display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto 20px",
              }}>
                <Play style={{ color: product.color }} size={isMobile ? 26 : 32} />
              </div>
              <p style={{
                color: "rgba(255,255,255,0.35)",
                fontSize: isMobile ? 13 : 15,
                lineHeight: 1.7,
              }}>
                Video not configured yet.<br />
                Add a .mp4 path to{" "}
                <code style={{ color: "#00C2FF", fontSize: 13 }}>demoVideo</code>{" "}
                in site.config.ts
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return null;
}