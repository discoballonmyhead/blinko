import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { siteConfig } from "../config/site.config";

// Desktop breakpoint — inline nav at 1024px+, drawer below
const DESKTOP_BP = 1024;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(() => window.innerWidth >= DESKTOP_BP);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const desktop = window.innerWidth >= DESKTOP_BP;
      setIsDesktop(desktop);
      if (desktop) setDrawerOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => setDrawerOpen(false), [location]);

  useEffect(() => {
    const pending = sessionStorage.getItem("scrollTo");
    if (pending && location.pathname === "/") {
      sessionStorage.removeItem("scrollTo");
      setTimeout(() => {
        const el = document.getElementById(pending);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 120);
    }
  }, [location]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [drawerOpen]);

  const handleHashLink = (path: string) => {
    const id = path.slice(2);
    if (location.pathname === "/") {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      sessionStorage.setItem("scrollTo", id);
      navigate("/");
    }
    setDrawerOpen(false);
  };

  const isActive = (path: string) => {
    if (path.startsWith("/#")) return location.pathname === "/";
    return path === location.pathname;
  };

  // Reusable desktop nav link
  const DesktopLink = ({ link, li }: { link: typeof siteConfig.nav.links[0]; li: number }) => {
    const active = isActive(link.path);
    const baseStyle: React.CSSProperties = {
      padding: "8px 16px", borderRadius: 8, border: "none",
      cursor: "pointer", background: "transparent",
      fontSize: 14, fontWeight: 500, transition: "all 0.2s",
      color: active ? "#00C2FF" : "rgba(255,255,255,0.55)",
      fontFamily: "DM Sans, sans-serif", textDecoration: "none", display: "block",
    };

    const onEnter = (e: React.MouseEvent) => {
      if (!active) {
        (e.currentTarget as HTMLElement).style.color = "#fff";
        (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)";
      }
    };
    const onLeave = (e: React.MouseEvent) => {
      if (!active) {
        (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.55)";
        (e.currentTarget as HTMLElement).style.background = "transparent";
      }
    };

    if (link.path.startsWith("/#")) {
      return (
        <button key={`nav-${li}`} onClick={() => handleHashLink(link.path)}
          style={baseStyle} onMouseEnter={onEnter} onMouseLeave={onLeave}>
          {link.label}
        </button>
      );
    }
    return (
      <Link key={`nav-${li}`} to={link.path}
        style={baseStyle} onMouseEnter={onEnter} onMouseLeave={onLeave}>
        {link.label}
      </Link>
    );
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
          transition: "background 0.4s ease, backdrop-filter 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease",
          background: scrolled ? "rgba(3,8,20,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.05)" : "1px solid transparent",
          boxShadow: scrolled ? "0 0 40px rgba(0,194,255,0.05)" : "none",
        }}
      >
        <div style={{
          maxWidth: 1280, margin: "0 auto", padding: "0 24px",
          height: 70, display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>

          {/* Logo */}
          <Link to="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", flexShrink: 0 }}>
            {siteConfig.brand.logo ? (
              <img src={siteConfig.brand.logo} alt={siteConfig.brand.name} style={{ height: 32, width: "auto", display: "block" }} />
            ) : (
              <>
                <div style={{ position: "relative", width: 32, height: 32 }}>
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, #00C2FF, #0066FF)", borderRadius: 8, opacity: 0.85 }} />
                  <div style={{ position: "absolute", inset: 2, background: "#030814", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ color: "#00C2FF", fontWeight: 800, fontSize: 13 }}>{siteConfig.brand.name[0]}</span>
                  </div>
                </div>
                <span style={{ color: "#fff", fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: 18, letterSpacing: "-0.02em" }}>
                  {siteConfig.brand.name}<span style={{ color: "#00C2FF" }}>.</span>
                </span>
              </>
            )}
          </Link>

          {/* Desktop inline nav — 1024px+ */}
          {isDesktop && (
            <nav style={{ display: "flex", alignItems: "center", gap: 2 }}>
              {siteConfig.nav.links.map((link, li) => (
                <DesktopLink key={li} link={link} li={li} />
              ))}
            </nav>
          )}

          {/* Hamburger — below 1024px */}
          {!isDesktop && (
            <button
              onClick={() => setDrawerOpen(true)}
              aria-label="Open menu"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 10, cursor: "pointer",
                color: "rgba(255,255,255,0.85)", padding: "8px 10px",
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "background 0.2s",
              }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.1)"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)"}
            >
              <Menu size={20} />
            </button>
          )}
        </div>
      </motion.header>

      {/* ── Drawer (mobile/tablet) ── */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              onClick={() => setDrawerOpen(false)}
              style={{
                position: "fixed", inset: 0, zIndex: 80,
                background: "rgba(0,0,0,0.65)",
                backdropFilter: "blur(4px)",
              }}
            />

            {/* Drawer panel — slides in from right */}
            <motion.div
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              style={{
                position: "fixed", top: 0, right: 0, bottom: 0,
                width: "min(300px, 82vw)",
                zIndex: 90,
                background: "rgba(4,9,22,0.98)",
                backdropFilter: "blur(24px)",
                borderLeft: "1px solid rgba(255,255,255,0.07)",
                boxShadow: "-24px 0 80px rgba(0,0,0,0.6)",
                display: "flex", flexDirection: "column",
              }}
            >
              {/* Header */}
              <div style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "18px 20px",
                borderBottom: "1px solid rgba(255,255,255,0.05)",
                flexShrink: 0,
              }}>
                <Link to="/" onClick={() => setDrawerOpen(false)}
                  style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
                  {siteConfig.brand.logo ? (
                    <img src={siteConfig.brand.logo} alt={siteConfig.brand.name} style={{ height: 26, width: "auto" }} />
                  ) : (
                    <span style={{ color: "#fff", fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: 16, letterSpacing: "-0.02em" }}>
                      {siteConfig.brand.name}<span style={{ color: "#00C2FF" }}>.</span>
                    </span>
                  )}
                </Link>
                <button
                  onClick={() => setDrawerOpen(false)}
                  aria-label="Close menu"
                  style={{
                    background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.09)",
                    borderRadius: 8, cursor: "pointer", color: "rgba(255,255,255,0.6)",
                    padding: 7, display: "flex", alignItems: "center", justifyContent: "center",
                  }}
                >
                  <X size={17} />
                </button>
              </div>

              {/* Links */}
              <nav style={{
                flex: 1, overflowY: "auto",
                padding: "12px 12px 20px",
                display: "flex", flexDirection: "column", gap: 3,
              }}>
                {siteConfig.nav.links.map((link, li) => {
                  const active = isActive(link.path);
                  const linkStyle: React.CSSProperties = {
                    display: "flex", alignItems: "center",
                    padding: "13px 14px", borderRadius: 11,
                    fontSize: 15, fontWeight: 600, cursor: "pointer",
                    textDecoration: "none", border: "none", textAlign: "left", width: "100%",
                    fontFamily: "DM Sans, sans-serif", transition: "background 0.15s, color 0.15s",
                    background: active ? "rgba(0,194,255,0.08)" : "transparent",
                    color: active ? "#00C2FF" : "rgba(255,255,255,0.65)",
                    borderLeft: `2px solid ${active ? "#00C2FF" : "transparent"}`,
                    boxSizing: "border-box",
                  };

                  if (link.path.startsWith("/#")) {
                    return (
                      <button key={`mob-${li}`} onClick={() => handleHashLink(link.path)} style={linkStyle}>
                        {link.label}
                      </button>
                    );
                  }
                  return (
                    <Link key={`mob-${li}`} to={link.path} style={linkStyle}>
                      {link.label}
                    </Link>
                  );
                })}
              </nav>

              {/* Footer */}
              <div style={{
                padding: "16px 20px",
                borderTop: "1px solid rgba(255,255,255,0.05)",
                flexShrink: 0,
              }}>
                <p style={{
                  color: "rgba(255,255,255,0.18)", fontSize: 11,
                  textAlign: "center", fontFamily: "DM Sans, sans-serif",
                  letterSpacing: "0.05em",
                }}>
                  {siteConfig.brand.name} Analytics
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}