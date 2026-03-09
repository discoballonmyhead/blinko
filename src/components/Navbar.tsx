import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { siteConfig } from "../config/site.config";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [location]);

  // After navigating to "/", wait for render then scroll to the hash section
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

  const handleHashLink = (path: string) => {
    const id = path.slice(2); // strip "/#"
    if (location.pathname === "/") {
      // Already on home — just scroll
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      // On another page — navigate home first, then scroll after mount
      sessionStorage.setItem("scrollTo", id);
      navigate("/");
    }
    setMobileOpen(false);
  };

  const isActive = (path: string) => {
    if (path.startsWith("/#")) return location.pathname === "/";
    return path === location.pathname;
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        transition: "all 0.4s ease",
        background: scrolled ? "rgba(3,8,20,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.05)" : "1px solid transparent",
        boxShadow: scrolled ? "0 0 40px rgba(0,194,255,0.05)" : "none",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", height: 70, display: "flex", alignItems: "center", justifyContent: "space-between" }}>

        {/* Logo */}
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
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

        {/* Desktop nav */}
        <nav style={{ display: "flex", alignItems: "center", gap: 2 }} className="hidden md:flex">
          {siteConfig.nav.links.map((link, li) => (
            link.path.startsWith("/#") ? (
              <button key={`nav-${li}`} onClick={() => handleHashLink(link.path)}
                style={{
                  padding: "8px 16px", borderRadius: 8, border: "none", cursor: "pointer", background: "transparent", fontSize: 14, fontWeight: 500, transition: "all 0.2s",
                  color: isActive(link.path) ? "#00C2FF" : "rgba(255,255,255,0.55)"
                }}
                onMouseEnter={e => { if (!isActive(link.path)) { (e.currentTarget as HTMLElement).style.color = "#fff"; (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)"; } }}
                onMouseLeave={e => { if (!isActive(link.path)) { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.55)"; (e.currentTarget as HTMLElement).style.background = "transparent"; } }}>
                {link.label}
              </button>
            ) : (
              <Link key={link.path} to={link.path}
                style={{
                  padding: "8px 16px", borderRadius: 8, textDecoration: "none", fontSize: 14, fontWeight: 500, transition: "all 0.2s", display: "block",
                  color: isActive(link.path) ? "#00C2FF" : "rgba(255,255,255,0.55)"
                }}
                onMouseEnter={e => { if (!isActive(link.path)) { (e.currentTarget as HTMLElement).style.color = "#fff"; (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)"; } }}
                onMouseLeave={e => { if (!isActive(link.path)) { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.55)"; (e.currentTarget as HTMLElement).style.background = "transparent"; } }}>
                {link.label}
              </Link>
            )
          ))}
        </nav>

        {/* Mobile toggle */}
        <button className="md:hidden" style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.8)", padding: 4 }}
          onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
            style={{ background: "rgba(3,8,20,0.97)", backdropFilter: "blur(20px)", borderTop: "1px solid rgba(255,255,255,0.05)", padding: "12px 24px 20px", display: "flex", flexDirection: "column", gap: 2 }}
            className="md:hidden">
            {siteConfig.nav.links.map((link, li) => (
              link.path.startsWith("/#") ? (
                <button key={`mob-${li}`} onClick={() => handleHashLink(link.path)}
                  style={{ textAlign: "left", padding: "12px 16px", borderRadius: 8, border: "none", background: "none", cursor: "pointer", fontSize: 14, color: "rgba(255,255,255,0.65)", fontWeight: 500 }}>
                  {link.label}
                </button>
              ) : (
                <Link key={link.path} to={link.path}
                  style={{ padding: "12px 16px", borderRadius: 8, textDecoration: "none", fontSize: 14, color: "rgba(255,255,255,0.65)", fontWeight: 500, display: "block" }}>
                  {link.label}
                </Link>
              )
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
