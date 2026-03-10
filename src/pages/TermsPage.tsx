import { Link } from "react-router-dom";

import { siteConfig } from "../config/site.config";
import { useIsMobile } from "../hooks/isMobile";

export function TermsPage() {
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
          Terms of Service
        </h1>
        <p style={{ color: "rgba(255,255,255,0.28)", fontSize: 13, marginBottom: isMobile ? 36 : 56 }}>
          Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
        </p>

        {[
          {
            title: "Acceptance of Terms",
            body: `By accessing or using the ${siteConfig.brand.name} website or engaging our services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our site or services.`,
          },
          {
            title: "Services",
            body: `${siteConfig.brand.name} provides data analytics consulting, business intelligence, and related data services. The scope, deliverables, timeline, and fees for any engagement are defined in a separate statement of work or service agreement between you and ${siteConfig.brand.name}.`,
          },
          {
            title: "Intellectual Property",
            body: `All content on this website including text, graphics, logos, and code is the property of ${siteConfig.brand.name} and is protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works without our express written permission. Deliverables produced under a client engagement are governed by the terms of that specific agreement.`,
          },
          {
            title: "Confidentiality",
            body: `We treat all client data, business information, and project details as strictly confidential. We do not disclose client information to third parties except as required by law or with your explicit consent. We expect the same discretion from clients regarding any proprietary methods or materials we share during an engagement.`,
          },
          {
            title: "Limitation of Liability",
            body: `${siteConfig.brand.name} provides analytics and consulting services based on the data and information you provide. We are not liable for decisions made based on our analysis, inaccuracies in source data supplied by clients, or any indirect, incidental, or consequential damages arising from use of our services.`,
          },
          {
            title: "Payment Terms",
            body: `Payment terms are defined in individual service agreements. Unless otherwise specified, invoices are due within 14 days of issue. Late payments may incur interest at a rate of 1.5% per month. We reserve the right to suspend work on an engagement in the event of overdue invoices.`,
          },
          {
            title: "Termination",
            body: `Either party may terminate a service engagement with written notice as specified in the relevant agreement. Upon termination, you will be invoiced for all work completed to date. These Terms of Service remain in effect with respect to any prior use of our website or services.`,
          },
          {
            title: "Governing Law",
            body: `These terms are governed by and construed in accordance with applicable law. Any disputes arising from these terms or our services will be subject to the exclusive jurisdiction of the relevant courts.`,
          },
          {
            title: "Contact",
            body: `For questions about these Terms of Service, please reach out at ${siteConfig.contact.email}.`,
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
