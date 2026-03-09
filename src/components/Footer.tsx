import { Link } from "react-router-dom";
import { siteConfig } from "../config/site.config";

export function Footer() {
  return (
    <footer className="relative bg-[#020810] border-t border-white/5 pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              {siteConfig.brand.logo ? (
                <img src={siteConfig.brand.logo} alt={siteConfig.brand.name} style={{ height: 28, width: "auto" }} />
              ) : (
                <>
                  <div className="w-8 h-8 relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#00C2FF] to-[#0066FF] rounded-lg opacity-80" />
                    <div className="absolute inset-[2px] bg-[#020810] rounded-md flex items-center justify-center">
                      <span className="text-[#00C2FF] font-bold text-xs">{siteConfig.brand.name[0]}</span>
                    </div>
                  </div>
                  <span className="text-white font-bold text-lg">
                    {siteConfig.brand.name}<span className="text-[#00C2FF]">.</span>
                  </span>
                </>
              )}
            </div>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs">
              {siteConfig.footer.tagline}
            </p>
            <div className="flex items-center gap-3 mt-5">
              {siteConfig.contact.linkedin && (
                <a
                  href={siteConfig.contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/5 hover:bg-[#00C2FF]/20 text-white/50 hover:text-[#00C2FF] transition-all duration-200"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect x="2" y="9" width="4" height="12" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </a>
              )}
            </div>
          </div>

          {/* Links */}
          <div>
            <ul className="space-y-2.5">
              <li><Link to="/products" className="text-white/40 hover:text-white text-sm transition-colors">Products</Link></li>
              <li><Link to="/pricing" className="text-white/40 hover:text-white text-sm transition-colors">Pricing</Link></li>
              <li>
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    const el = document.getElementById("contact");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                    else { sessionStorage.setItem("scrollTo", "contact"); window.location.href = "/"; }
                  }}
                  className="text-white/40 hover:text-white text-sm transition-colors cursor-pointer"
                >
                  Contact
                </a>
              </li>
              <li><Link to="/privacy" className="text-white/40 hover:text-white text-sm transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-white/40 hover:text-white text-sm transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-white/20 text-xs font-semibold uppercase tracking-widest mb-4">Contact</p>
            <ul className="space-y-2.5">
              {siteConfig.contact.offices.map((office) => (
                <li key={office.city}>
                  <p className="text-[#00C2FF] text-xs font-semibold mb-0.5">{office.city}</p>
                  <p className="text-white/40 text-sm">{office.address}</p>
                </li>
              ))}
              <li>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="text-white/40 hover:text-[#00C2FF] text-sm transition-colors"
                >
                  {siteConfig.contact.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-white/20 text-xs">
            © {new Date().getFullYear()} {siteConfig.brand.name} {siteConfig.brand.tagline}. All rights reserved.
          </p>
        </div>
      </div >
    </footer >
  );
}