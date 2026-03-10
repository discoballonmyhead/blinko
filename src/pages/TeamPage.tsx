/**
 * TeamPage.tsx
 * Standalone team/leadership page — responsive, aesthetic, fragment return.
 */

import { useState } from "react";
import BlurText from "../components/BlurText";
import { FadeUp } from "../components/FadeUp";
import { HeroParticleField } from "../components/HeroParticleField";
import { siteConfig } from "../config/site.config";
import { useIsMobile } from "../hooks/isMobile";


function PersonCard({
    person,
    isMobile,
}: {
    person: typeof siteConfig.leadership[0];
    isMobile: boolean;
}) {
    const accent = person.accent ?? "#00C2FF";

    return (
        <div
            style={{
                background: "rgba(8,15,31,0.88)",
                backdropFilter: "blur(16px)",
                border: `1px solid ${accent}22`,
                borderRadius: 24,
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
                alignItems: "stretch",
                boxShadow: `0 0 48px ${accent}0c`,
                overflow: "hidden",
                transition: "box-shadow 0.3s ease, border-color 0.3s ease",
                height: "100%",
            }
            }
            onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.boxShadow = `0 0 64px ${accent}1a`;
                (e.currentTarget as HTMLElement).style.borderColor = `${accent}40`;
            }}
            onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.boxShadow = `0 0 48px ${accent}0c`;
                (e.currentTarget as HTMLElement).style.borderColor = `${accent}22`;
            }}>
            {/* Image / initial panel */}
            < div
                style={{
                    width: isMobile ? "100%" : "38%",
                    flexShrink: 0,
                    position: "relative",
                    minHeight: isMobile ? 200 : 300,
                }}
            >
                {
                    person.image ? (
                        <img
                            src={person.image}
                            alt={person.name}
                            style={{
                                position: "absolute",
                                inset: 0,
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                objectPosition: "center top",
                                display: "block",
                            }}
                        />
                    ) : (
                        <div
                            style={{
                                position: "absolute",
                                inset: 0,
                                background: `linear-gradient(160deg, ${accent}1a, ${accent}06)`,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontFamily: "Syne, sans-serif",
                                fontWeight: 800,
                                fontSize: isMobile ? "4rem" : "5rem",
                                color: `${accent}70`,
                                letterSpacing: "-0.04em",
                            }}
                        >
                            {person.name[0]}
                        </div>
                    )}
                {
                    isMobile && (
                        <div
                            style={
                                {
                                    position: "absolute",
                                    bottom: 0,
                                    left: 0,
                                    right: 0,
                                    height: 60,
                                    background: "linear-gradient(to bottom, transparent, rgba(8,15,31,0.88))",
                                    pointerEvents: "none",
                                }
                            }
                        />
                    )
                }
            </div>

            {/* Content */}
            <div
                style={
                    {
                        flex: 1,
                        minWidth: 0,
                        padding: isMobile ? "20px 24px 28px" : "36px 36px",
                        display: "flex",
                        flexDirection: "column",
                    }
                }
            >
                <span
                    style={
                        {
                            color: accent,
                            fontSize: 10,
                            fontWeight: 700,
                            letterSpacing: "0.16em",
                            textTransform: "uppercase",
                            marginBottom: 8,
                            display: "block",
                        }
                    }
                >
                    {person.role}
                </span>
                < h3
                    style={{
                        fontFamily: "Syne, sans-serif",
                        fontWeight: 800,
                        fontSize: isMobile ? "1.4rem" : "1.85rem",
                        color: "#fff",
                        margin: "0 0 4px",
                        lineHeight: 1.1,
                    }}
                >
                    {person.name}
                </h3>
                < p
                    style={{
                        color: "rgba(255,255,255,0.28)",
                        fontSize: 13,
                        marginBottom: person.bio ? 16 : 20,
                    }}
                >
                    {person.title}
                </p>
                {
                    person.bio && (
                        <p
                            style={
                                {
                                    color: "rgba(255,255,255,0.55)",
                                    fontSize: "0.92rem",
                                    lineHeight: 1.8,
                                    marginBottom: 24,
                                    flex: 1,
                                }
                            }
                        >
                            {person.bio}
                        </p>
                    )
                }
                {
                    person.linkedin && (
                        <a
                            href={person.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 8,
                                padding: "9px 20px",
                                borderRadius: 10,
                                background: `${accent}12`,
                                border: `1px solid ${accent}28`,
                                color: accent,
                                fontSize: 13,
                                fontWeight: 700,
                                textDecoration: "none",
                                alignSelf: "flex-start",
                                transition: "background 0.2s",
                            }
                            }
                            onMouseEnter={e => {
                                (e.currentTarget as HTMLElement).style.background = `${accent}22`;
                            }}
                            onMouseLeave={e => {
                                (e.currentTarget as HTMLElement).style.background = `${accent}12`;
                            }}
                        >
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" >
                                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                                <rect x="2" y="9" width="4" height="12" />
                                <circle cx="4" cy="4" r="2" />
                            </svg>
                            LinkedIn
                        </a>
                    )}
            </div>
        </div>
    );
}

export function TeamPage() {
    const isMobile = useIsMobile();
    const team = siteConfig.leadership;

    const roles = ["All", ...Array.from(new Set(team.map(p => p.role)))];
    const [activeRole, setActiveRole] = useState("All");
    const filtered = activeRole === "All" ? team : team.filter(p => p.role === activeRole);

    const cols = isMobile ? 1 : Math.min(filtered.length, 2);

    return (
        <>
            {/* ── Hero band ── */}
            < section style={{
                position: "relative",
                minHeight: isMobile ? 300 : 420,
                display: "flex", alignItems: "center",
                padding: isMobile ? "110px 20px 56px" : "140px 64px 80px",
                overflow: "hidden",
            }
            }>
                <HeroParticleField
                    count={isMobile ? 50 : 120}
                    color="#00C2FF"
                    accentColor="#ffffff"
                    opacity={0.65}
                    parallax={!isMobile}
                />
                < div style={{
                    position: "absolute", inset: 0, pointerEvents: "none",
                    background: "radial-gradient(ellipse 70% 60% at 50% 40%, rgba(0,102,255,0.07) 0%, transparent 70%)",
                }} />
                {/* Bottom fade into page body */}
                <div style={
                    {
                        position: "absolute", bottom: 0, left: 0, right: 0, height: 120,
                        background: "linear-gradient(to bottom, transparent, #030814)",
                        pointerEvents: "none",
                    }
                } />

                < div style={{ maxWidth: 860, margin: "0 auto", width: "100%", position: "relative", zIndex: 1 }}>
                    <BlurText
                        text="Our Team"
                        animateBy="words" direction="top" delay={60} stepDuration={0.38}
                        style={{
                            fontFamily: "Syne, sans-serif", fontWeight: 800,
                            fontSize: isMobile ? "clamp(2.8rem,10vw,3.8rem)" : "clamp(3.4rem,7vw,5.2rem)",
                            lineHeight: 0.95, letterSpacing: "-0.03em",
                            margin: "0 0 16px",
                            background: "linear-gradient(135deg, #79e0ff, #0066FF)",
                            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                            justifyContent: isMobile ? "center" : "flex-start",
                        }}
                    />
                    < BlurText
                        text="The people building Blinko"
                        animateBy="words" direction="top" delay={120} stepDuration={0.32}
                        style={{
                            fontFamily: "Syne, sans-serif", fontWeight: 600,
                            fontSize: isMobile ? "1rem" : "1.2rem",
                            color: "rgba(255,255,255,0.4)",
                            margin: 0,
                            justifyContent: isMobile ? "center" : "flex-start",
                        }}
                    />
                    {
                        !isMobile && (
                            <p style={
                                {
                                    color: "rgba(255,255,255,0.26)", fontSize: "0.95rem",
                                    lineHeight: 1.75, maxWidth: 520, marginTop: 14,
                                }
                            }>
                                Data scientists, engineers, and strategists obsessed with turning raw data into decisive action.
                            </p>
                        )
                    }
                </div>
            </section>

            {/* ── Team grid ── */}
            <section style={
                {
                    position: "relative", zIndex: 2,
                    padding: isMobile ? "24px 16px 80px" : "32px 40px 100px",
                }
            }>
                <div style={{ maxWidth: 1100, margin: "0 auto" }}>

                    {/* Role filter — only if more than 1 unique role exists */}
                    {
                        roles.length > 2 && (
                            <FadeUp>
                                <div style={
                                    {
                                        display: "flex", justifyContent: "center",
                                        gap: 8, marginBottom: isMobile ? 28 : 44,
                                        flexWrap: "wrap",
                                    }
                                }>
                                    {
                                        roles.map(role => (
                                            <button
                                                key={role}
                                                onClick={() => setActiveRole(role)}
                                                style={{
                                                    padding: isMobile ? "7px 16px" : "8px 22px",
                                                    borderRadius: 100, cursor: "pointer",
                                                    fontSize: isMobile ? 12 : 13, fontWeight: 600,
                                                    fontFamily: "DM Sans, sans-serif", letterSpacing: "0.04em",
                                                    border: "1px solid", transition: "all 0.2s ease",
                                                    background: activeRole === role ? "rgba(0,194,255,0.12)" : "transparent",
                                                    borderColor: activeRole === role ? "rgba(0,194,255,0.4)" : "rgba(255,255,255,0.1)",
                                                    color: activeRole === role ? "#00C2FF" : "rgba(255,255,255,0.4)",
                                                }
                                                }
                                            >
                                                {role}
                                            </button>
                                        ))}
                                </div>
                            </FadeUp>
                        )}

                    {/* Cards */}
                    <div style={
                        {
                            display: "grid",
                            gridTemplateColumns: `repeat(${cols}, 1fr)`,
                            gap: isMobile ? 16 : 24,
                            alignItems: "start",
                        }
                    }>
                        {
                            filtered.map((person, i) => (
                                <FadeUp key={person.name} delay={i * 0.08} style={{ height: "100%" }} >
                                    <PersonCard person={person} isMobile={isMobile} />
                                </FadeUp>
                            ))}
                    </div>

                    {
                        filtered.length === 0 && (
                            <div style={{ textAlign: "center", padding: "60px 0", color: "rgba(255,255,255,0.2)", fontSize: "0.9rem" }}>
                                No members in this role yet.
                            </div>
                        )
                    }
                </div>
            </section>
        </>
    );
}