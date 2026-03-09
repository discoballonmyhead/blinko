import { Link } from "react-router-dom";
import { Linkedin } from "lucide-react";
import { siteConfig } from "../config/site.config";

export function Footer() {
  return (
    <footer className="relative bg-[#020810] border-t border-white/5 pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#00C2FF] to-[#0066FF] rounded-lg opacity-80" />
                <div className="absolute inset-[2px] bg-[#020810] rounded-md flex items-center justify-center">
                  <span className="text-[#00C2FF] font-bold text-xs">B</span>
                </div>
              </div>
              <span className="text-white font-bold text-lg">
                {siteConfig.brand.name}<span className="text-[#00C2FF]">.</span>
              </span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs">
              {siteConfig.footer.tagline}
            </p>
            <div className="flex items-center gap-3 mt-5">
              <a
                href={siteConfig.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/5 hover:bg-[#00C2FF]/20 text-white/50 hover:text-[#00C2FF] transition-all duration-200"
              >
                <Linkedin size={16} />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-white/20 text-xs font-semibold uppercase tracking-widest mb-4">Pages</p>
            <ul className="space-y-2.5">
              {siteConfig.nav.links.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-white/40 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
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
          <div className="flex items-center gap-4">
            {siteConfig.footer.links.map((l) => (
              <Link key={l.path} to={l.path} className="text-white/20 hover:text-white/50 text-xs transition-colors">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
