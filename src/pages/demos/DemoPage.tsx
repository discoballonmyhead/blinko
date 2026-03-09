/**
 * DemoPage — full-screen demo viewer.
 * Reached via /demo/:productId
 *
 * Behaviour per demoType:
 *   "url"   → redirects immediately to demoUrl in a new tab, shows a "launching" screen
 *   "video" → renders a full-screen video player
 *   "page"  → navigates the user to the internal demoPage route
 */

import { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ExternalLink, Play } from "lucide-react";
import { siteConfig } from "../../config/site.config";

export function DemoPage() {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const product = siteConfig.products.find((p) => p.id === productId);

  useEffect(() => {
    if (!product) return;

    if (product.demoType === "url" && product.demoUrl) {
      // Open external URL immediately in new tab
      window.open(product.demoUrl, "_blank", "noopener,noreferrer");
    } else if (product.demoType === "page" && product.demoPage) {
      // Navigate to internal static demo page
      navigate(product.demoPage, { replace: true });
    }
  }, [product]);

  if (!product) {
    return (
      <div style={{ minHeight: "100vh", background: "#030814", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 20 }}>
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 18 }}>Product not found.</p>
        <Link to="/products" style={{ color: "#00C2FF", textDecoration: "none", display: "flex", alignItems: "center", gap: 6 }}>
          <ArrowLeft size={16} /> Back to Products
        </Link>
      </div>
    );
  }

  // ── URL type: show "launching" screen while new tab opens ──
  if (product.demoType === "url") {
    return (
      <div style={{ minHeight: "100vh", background: "#030814", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 24, padding: 24 }}>
        <div style={{ width: 72, height: 72, borderRadius: "50%", background: `${product.color}18`, border: `1px solid ${product.color}40`, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <ExternalLink style={{ color: product.color }} size={30} />
        </div>
        <div style={{ textAlign: "center" }}>
          <h2 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "1.8rem", color: "#fff", marginBottom: 10 }}>
            Launching {product.name} Demo
          </h2>
          <p style={{ color: "rgba(255,255,255,0.4)", marginBottom: 24, maxWidth: 380 }}>
            The demo has opened in a new tab. If it didn't open,{" "}
            <a href={product.demoUrl!} target="_blank" rel="noopener noreferrer"
              style={{ color: "#00C2FF" }}>click here</a>.
          </p>
          <Link to="/products"
            style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 22px", borderRadius: 10, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.7)", textDecoration: "none", fontSize: 14, fontWeight: 600 }}>
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
        {/* Minimal top bar */}
        <div style={{ padding: "16px 28px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid rgba(255,255,255,0.06)", background: "rgba(3,8,20,0.9)", backdropFilter: "blur(16px)" }}>
          <Link to="/products" style={{ display: "flex", alignItems: "center", gap: 8, color: "rgba(255,255,255,0.55)", textDecoration: "none", fontSize: 14, fontWeight: 600 }}
            className="hover:text-white transition-colors">
            <ArrowLeft size={16} /> Products
          </Link>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: product.color, boxShadow: `0 0 10px ${product.color}` }} />
            <span style={{ color: "#fff", fontFamily: "Syne,sans-serif", fontWeight: 700, fontSize: 15 }}>{product.name}</span>
          </div>
          <div style={{ width: 80 }} />
        </div>

        {/* Video */}
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: 32 }}>
          {product.demoVideo ? (
            <video
              src={product.demoVideo}
              controls
              autoPlay
              style={{ maxWidth: "100%", maxHeight: "calc(100vh - 140px)", borderRadius: 16, border: "1px solid rgba(255,255,255,0.08)", boxShadow: `0 0 80px ${product.color}20` }}
            />
          ) : (
            <div style={{ textAlign: "center" }}>
              <div style={{ width: 80, height: 80, borderRadius: "50%", background: `${product.color}15`, border: `1px solid ${product.color}30`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
                <Play style={{ color: product.color }} size={32} />
              </div>
              <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 15 }}>
                Video not configured yet.<br />Add a .mp4 path to <code style={{ color: "#00C2FF" }}>demoVideo</code> in site.config.ts
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // page type is handled by useEffect redirect above — this is a fallback
  return null;
}
