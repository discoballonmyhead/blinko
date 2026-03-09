import { Link } from "react-router-dom";
import { useFadeIn } from "../hooks/useFadeIn";
import { Check, Zap } from "lucide-react";
import { AnimatedGridPattern } from "../components/AnimatedGridPattern";
import { ParticleBackground } from "../components/ParticleBackground";
import { siteConfig } from "../config/site.config";

function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, style } = useFadeIn({ delay, y: 18 });
  return <div ref={ref} style={style}>{children}</div>;
}

export function PricingPage() {
  return (
    <div className="bg-[#030814] min-h-screen text-white overflow-x-hidden">
      {/* Hero */}
      <section className="relative pt-40 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_0%,rgba(0,194,255,0.12),transparent)]" />
          <AnimatedGridPattern numSquares={15} maxOpacity={0.18} duration={6} />
          <ParticleBackground config={{ count: 30, speed: 0.25 }} />
        </div>
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00C2FF]/10 border border-[#00C2FF]/20 text-[#00C2FF] text-xs font-semibold uppercase tracking-widest mb-8"
          >
            <Zap size={12} />
            Pricing
          </div>
          <h1
            className="text-5xl md:text-7xl font-black leading-tight mb-5"
          >
            {siteConfig.pricing.headline}
          </h1>
          <p
            className="text-white/50 text-xl"
          >
            {siteConfig.pricing.subheadline}
          </p>
        </div>
      </section>

      {/* Plans */}
      <section className="py-16 px-6 pb-32">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {siteConfig.pricing.plans.map((plan, i) => (
              <FadeUp key={plan.name} delay={i * 0.12}>
                <div
                  className={`relative h-full flex flex-col rounded-2xl p-8 border transition-all duration-500 ${
                    plan.highlighted
                      ? "border-[#00C2FF]/40 bg-gradient-to-b from-[#00C2FF]/[0.08] to-[#0066FF]/[0.04] shadow-[0_0_60px_rgba(0,194,255,0.12)]"
                      : "border-white/[0.07] bg-[#080f1f] hover:border-white/20"
                  }`}
                >
                  {plan.highlighted && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <div className="px-4 py-1.5 rounded-full bg-gradient-to-r from-[#00C2FF] to-[#0066FF] text-white text-xs font-bold uppercase tracking-wider shadow-lg">
                        Most Popular
                      </div>
                    </div>
                  )}

                  {/* Plan header */}
                  <div className="mb-6">
                    <h3
                      className={`text-sm font-bold uppercase tracking-widest mb-3 ${
                        plan.highlighted ? "text-[#00C2FF]" : "text-white/40"
                      }`}
                    >
                      {plan.name}
                    </h3>
                    <div className="flex items-baseline gap-1 mb-3">
                      <span className="text-5xl font-black text-white">{plan.price}</span>
                      {plan.period && (
                        <span className="text-white/30 text-sm">{plan.period}</span>
                      )}
                    </div>
                    <p className="text-white/40 text-sm leading-relaxed">{plan.description}</p>
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 mb-8 flex-1">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                            plan.highlighted ? "bg-[#00C2FF]/20" : "bg-white/[0.06]"
                          }`}
                        >
                          <Check
                            size={11}
                            className={plan.highlighted ? "text-[#00C2FF]" : "text-white/40"}
                          />
                        </div>
                        <span className="text-white/60 text-sm leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Link
                    to={plan.ctaPath}
                    className={`block text-center py-3.5 px-6 rounded-xl font-bold text-sm transition-all duration-200 ${
                      plan.highlighted
                        ? "bg-gradient-to-r from-[#00C2FF] to-[#0066FF] text-white hover:opacity-90 shadow-[0_0_30px_rgba(0,194,255,0.3)]"
                        : "bg-white/[0.05] border border-white/10 text-white/70 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    {plan.cta}
                  </Link>
                </div>
              </FadeUp>
            ))}
          </div>

          {/* Fine print */}
          <FadeUp delay={0.4}>
            <p className="text-center text-white/25 text-sm mt-10">
              All prices are project-based estimates. Custom scoping available for all plans.
              <br />
              <Link to="/#contact" className="text-[#00C2FF]/60 hover:text-[#00C2FF] underline transition-colors">
                Talk to us
              </Link>{" "}
              to find the right fit.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* FAQ / reassurance strip */}
      <section className="py-16 px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              {
                title: "No lock-in contracts",
                desc: "Work with us project-by-project or retainer—your choice.",
              },
              {
                title: "Fiverr-backed reputation",
                desc: "Pro & Top Rated freelancer with dozens of verified client reviews.",
              },
              {
                title: "Results guaranteed",
                desc: "We iterate until the insights are actionable and the client is satisfied.",
              },
            ].map((item, i) => (
              <FadeUp key={item.title} delay={i * 0.1}>
                <div className="p-6">
                  <div className="w-10 h-10 rounded-xl bg-[#00C2FF]/10 flex items-center justify-center mx-auto mb-4">
                    <Check size={18} className="text-[#00C2FF]" />
                  </div>
                  <h4 className="text-white font-bold mb-2">{item.title}</h4>
                  <p className="text-white/40 text-sm">{item.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
