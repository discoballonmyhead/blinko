/**
 * DemoPage - full-screen demo viewer. Temporarily disabled.
 * Route: /demo/:productId
 *
 * Will be re-enabled when demo videos/URLs are ready.
 */

import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export function DemoPage() {
  return (
    <div style={{
      minHeight: "100vh", background: "#030814",
      display: "flex", alignItems: "center", justifyContent: "center",
      flexDirection: "column", gap: 20, padding: 24, textAlign: "center",
    }}>
      <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 18 }}>Demo coming soon.</p>
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
