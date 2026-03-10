import { Link } from "react-router-dom";

import { siteConfig } from "../config/site.config";
import { useIsMobile } from "../hooks/isMobile";

export function PrivacyPage() {
  const isMobile = useIsMobile();

  return (
    <div style={{ minHeight: "100vh", background: "#030814", padding: isMobile ? "90px 20px 64px" : "120px 24px 80px" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <Link to="/" style={{
          color: "#00C2FF", fontSize: 13, textDecoration: "none",
          display: "inline-flex", alignItems: "center", gap: 6,
          marginBottom: isMobile ? 32 : 48, opacity: 0.65,
        }}>
          &larr; Back to home
        </Link>
        <h1 style={{
          fontFamily: "Syne, sans-serif", fontWeight: 800,
          fontSize: isMobile ? "clamp(1.8rem,7vw,2.4rem)" : "clamp(2rem,4vw,3rem)",
          color: "#fff", marginBottom: 10,
        }}>
          Privacy Policy
        </h1>
        <p style={{ color: "rgba(255,255,255,0.28)", fontSize: 13, marginBottom: isMobile ? 36 : 56 }}>
          Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
        </p>

        {[
          {
            title: "Information We Collect",
            body: `We collect information you provide directly to us, such as when you fill out a contact form, request a demo, or engage our services. This may include your name, email address, company name, and details about your data needs. We also collect usage data such as pages visited, time spent on the site, and referring URLs through standard web analytics tools.`,
          },
          {
            title: "How We Use Your Information",
            body: `We use the information we collect to respond to your inquiries, provide and improve our analytics services, send you relevant communications about our work, and comply with legal obligations. We do not sell, rent, or share your personal information with third parties for their marketing purposes.`,
          },
          {
            title: "Data Storage and Security",
            body: `Your data is stored securely and we implement industry-standard technical and organisational measures to protect it against unauthorised access, alteration, disclosure, or destruction. We retain your data only for as long as necessary to fulfil the purposes outlined in this policy.`,
          },
          {
            title: "Cookies",
            body: `We use cookies and similar tracking technologies to improve your browsing experience, analyse site traffic, and understand where our visitors come from. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.`,
          },
          {
            title: "Third-Party Services",
            body: `We may use third-party services such as analytics providers and hosting platforms that collect, monitor, and analyse usage data. These third parties have their own privacy policies governing the use of such information.`,
          },
          {
            title: "Your Rights",
            body: `You have the right to access, correct, or delete your personal data at any time. To exercise these rights, please contact us at the email address below. We will respond to your request within 30 days.`,
          },
          {
            title: "Contact",
            body: `If you have any questions about this Privacy Policy, please contact us at ${siteConfig.contact.email}.`,
          },
        ].map(section => (
          <div key={section.title} style={{
            marginBottom: isMobile ? 28 : 40,
            paddingBottom: isMobile ? 28 : 40,
            borderBottom: "1px solid rgba(255,255,255,0.04)",
          }}>
            <h2 style={{
              fontFamily: "Syne, sans-serif", fontWeight: 700,
              fontSize: isMobile ? "1rem" : "1.15rem",
              color: "#fff", marginBottom: 10,
            }}>
              {section.title}
            </h2>
            <p style={{ color: "rgba(255,255,255,0.48)", fontSize: isMobile ? "0.9rem" : "0.95rem", lineHeight: 1.85 }}>
              {section.body}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
