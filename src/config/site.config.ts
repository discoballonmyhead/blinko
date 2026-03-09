// ============================================================
// BLINKO ANALYTICS - SITE CONFIGURATION
// Edit this file to update all website content
// ============================================================

export const siteConfig = {
  // ─── Brand ───────────────────────────────────────────────
  brand: {
    name: "Blinko",
    tagline: "Analytics",
    logo: `${import.meta.env.BASE_URL}images/logo_header.png`,
    favicon: `${import.meta.env.BASE_URL}images/logo.png`,
  },

  // ─── Navigation ──────────────────────────────────────────
  // Hash links like "/#about" work from ANY page — they navigate
  // to home then auto-scroll to the section with that id.
  nav: {
    links: [
      { label: "Home", path: "/" },
      { label: "Products", path: "/products" },
      { label: "Pricing", path: "/pricing" },
      { label: "About", path: "/#about" },
      { label: "Contact", path: "/#contact" },

    ],
  },

  // ─── Hero Section ─────────────────────────────────────────
  hero: {
    headline: "Insight in a Blink",
    subheadline: "Turn your data into action, fast.",
    description:
      "Blinko Analytics empowers businesses with advanced data science, machine learning, and business intelligence — delivering decisions at the speed of insight.",
    primaryCTA: { label: "Explore Products", path: "/products" },
    secondaryCTA: { label: "View Pricing", path: "/pricing" },
  },

  // ─── Stats ────────────────────────────────────────────────
  stats: [
    { value: "46%", label: "Increase in automation efficiency" },
    { value: "61%", label: "Faster issue response times" },
    { value: "2400+", label: "Hours saved per year per client" },
    { value: "8+", label: "Years of data science expertise" },
  ],

  // ─── Products ─────────────────────────────────────────────
  // demoType options:
  //   "url"      → opens an external URL in a new tab (live service, GitHub Pages, etc.)
  //   "video"    → opens a full-screen video player page using demoVideo path
  //   "page"     → navigates to an internal route in this same repo (e.g. "/demos/analytics")
  //
  // For "url":   set demoUrl to the full https:// address
  // For "video": set demoVideo to a path inside /public (e.g. "/videos/demo.mp4")
  // For "page":  set demoPage to an internal route path (e.g. "/demos/bi-dashboard")
  products: [
    {
      id: "blink-analytics",
      name: "Blink Analytics",
      subtitle: "Advanced Data Analysis & Statistics",
      description:
        "Uncover decisive answers hidden in your data with robust statistical analysis. Turn raw numbers into evidence-backed insights that validate ideas, quantify impact, and guide smarter business moves.",
      features: [
        "Hypothesis Testing",
        "Regression Analysis",
        "Advanced Data Visualization",
        "Statistical Modeling",
      ],
      demoType: "url" as "url" | "video" | "page",
      demoUrl: "https://www.blinko-analytics.com",  // ← replace with your live demo URL
      demoVideo: null as string | null,
      demoPage: null as string | null,
      icon: "BarChart3",
      color: "#00C2FF",
    },
    {
      id: "blink-bi",
      name: "Blink Business Intelligence",
      subtitle: "Customized Internal Company Applications",
      description:
        "Transform complex data into actionable insights with interactive dashboards, reports, and chatbots. Our solutions make your data easy to interpret, enabling fast, informed decisions.",
      features: [
        "Interactive Dashboards",
        "Custom Business Apps",
        "AI Chatbots",
        "Real-time Reporting",
      ],
      demoType: "video" as "url" | "video" | "page",
      demoUrl: null as string | null,
      demoVideo: "/videos/bi-demo.mp4",  // ← drop your .mp4 in /public/videos/
      demoPage: null as string | null,
      icon: "Layout",
      color: "#00FFB2",
    },
    {
      id: "blink-predictive",
      name: "Blink Predictive Analytics",
      subtitle: "Premium Data Science & Machine Learning",
      description:
        "Discover the potential of your data with cutting-edge analytics and machine learning. We predict trends, optimize operations, and uncover valuable opportunities to give your business a competitive edge.",
      features: [
        "Machine Learning Models",
        "Predictive Forecasting",
        "Deep Learning",
        "Big Data Analysis",
      ],
      demoType: "page" as "url" | "video" | "page",
      demoUrl: null as string | null,
      demoVideo: null as string | null,
      demoPage: "/demos/predictive",  // ← internal route, see src/pages/demos/
      icon: "BrainCircuit",
      color: "#6404ff",
    },
  ],

  // ─── Why Choose Us ────────────────────────────────────────
  pillars: [
    { icon: "Zap", title: "Fast", description: "Fast-track from data to decision — maximum business value" },
    { icon: "Layers", title: "Flexible", description: "Flexible solutions, boutique-style care" },
    { icon: "RefreshCw", title: "Full-cycle", description: "Full-cycle partnership with end-to-end support" },
    { icon: "Shield", title: "Firm", description: "Firm data foundation — clean, unified, ready" },
  ],

  // ─── Testimonials ─────────────────────────────────────────
  testimonials: [
    {
      quote: "This work is an outstanding example of thorough analysis and strategic insight. The professionalism and expertise are truly commendable.",
      author: "Chris M.",
      role: "Operations Director",
      company: "Germany",
      avatar: null,
      source: "Fiverr",
    },
    {
      quote: "Dror delivered a machine learning pipeline that cut our processing time in half. Exceptional technical depth and clear communication throughout.",
      author: "Sarah K.",
      role: "Head of Product",
      company: "TechFlow Inc.",
      avatar: null,
      source: "Fiverr",
    },
    {
      quote: "The dashboard Blinko built gave us visibility we never had before. Our team actually uses it every day — that says everything.",
      author: "James R.",
      role: "CEO",
      company: "Alcrest Partners",
      avatar: null,
      source: "Upwork",
    },
    {
      quote: "Incredibly knowledgeable in both statistics and business context. Rare combination. Will absolutely work together again.",
      author: "Priya S.",
      role: "Data Lead",
      company: "Fractal Analytics",
      avatar: null,
      source: "LinkedIn",
    },
    {
      quote: "The predictive model Blinko built for our sales pipeline improved forecast accuracy by over 30%. Highly recommended.",
      author: "Marc D.",
      role: "VP Sales",
      company: "Solventis",
      avatar: null,
      source: "Fiverr",
    },
    {
      quote: "Fast, precise, and genuinely cares about the outcome. Not just a freelancer — a real data partner.",
      author: "Yuki T.",
      role: "Founder",
      company: "Novu Labs",
      avatar: null,
      source: "Fiverr",
    },
    {
      quote: "Working with Blinko transformed how we think about our data. The ROI from the first engagement paid for a year of work.",
      author: "Elena V.",
      role: "CFO",
      company: "Meridian Group",
      avatar: null,
      source: "Direct",
    },
    {
      quote: "Clear deliverables, on time, and the analysis actually changed our strategy. That's exactly what you want from a consultant.",
      author: "Omar A.",
      role: "Strategy Manager",
      company: "Intel",
      avatar: null,
      source: "Direct",
    },
  ],

  // ─── Success Stories ──────────────────────────────────────
  caseStudies: [
    { metric: "46%", label: "Increase", description: "Automation in financial reviews helps to 2x the number of clients assessed", client: "Solventis", url: "#" },
    { metric: "61%", label: "Faster", description: "Issue response leads to 10–12 hrs/week saved per user", client: "Fractal", url: "#" },
    { metric: "2400", label: "hrs/year Saved", description: "AI-powered data matching makes high-confidence outreach", client: "Alcrest Partners", url: "#" },
  ],

  // ─── Leadership ───────────────────────────────────────────
  //
  // Add as many people as you like. Each person shows up as a card
  // in the Leadership section on the homepage.
  //
  // Fields:
  //   name       Full name
  //   role       Short role label shown in the coloured badge  (e.g. "Founder", "CTO")
  //   title      Full job title shown under the name
  //   bio        Paragraph bio — 2-4 sentences works best
  //   image      Path inside /public  e.g. "/images/dror.jpg"  — null shows initials avatar
  //   linkedin   Full https:// URL — null hides the button
  //   accent     Hex colour for this person's card accent / badge  (optional, defaults to cyan)
  //
  leadership: [
    {
      name: "Dror Rosentraub",
      role: "Founder & CEO",
      title: "Chief Executive Officer, Head Data Scientist and Consultant",
      bio: null,
      image: `${import.meta.env.BASE_URL}leadership/dror.jpg` as string | null,
      linkedin: "https://www.linkedin.com/in/dror-rosentraub/" as string | null,
      accent: "#00C2FF",
    },
    {
      name: "Mai Tran",
      role: "Co-Founder & CRO",
      title: "Chief Marketing Officer & Business Analyst",
      bio: null,
      // bio: "I'm a data scientist and the founder of Blinko Analytics with over 8 years of experience and two degrees in statistics, including a master's from the Georgia Institute of Technology. I've worked with companies like Intel and Perimeter 81, published healthcare analytics research with Oxford University Press, and am a Pro and Top Rated freelancer on Fiverr.",
      image: `${import.meta.env.BASE_URL}leadership/mai.jpg` as string | null,
      linkedin: "https://www.linkedin.com/in/mai-tran-921818174/" as string | null,
      accent: "#00C2FF",
    },
    {
      name: "Sagnik Das",
      role: "CTO",
      title: "Builder & Security Consultant",
      bio: null,
      //bio: "",
      image: `${import.meta.env.BASE_URL}leadership/sagnik.jpg` as string | null,
      linkedin: "https://www.linkedin.com/in/sagnikdas1/" as string | null,
      accent: "#00C2FF",
    },
    // ── Add more team members below ─────────────────────────────────
    // {
    //   name: "Jane Smith",
    //   role: "CTO",
    //   title: "Chief Technology Officer",
    //   bio: "Jane leads all engineering and infrastructure at Blinko...",
    //   image: null as string | null,
    //   linkedin: "https://www.linkedin.com/in/janesmith/" as string | null,
    //   accent: "#7B61FF",
    // },
    // {
    //   name: "Alex Johnson",
    //   role: "Head of Data",
    //   title: "Principal Data Scientist",
    //   bio: "Alex drives our ML research and client model delivery...",
    //   image: null as string | null,
    //   linkedin: null as string | null,
    //   accent: "#00FFB2",
    // },
  ],

  // ─── Pricing ──────────────────────────────────────────────
  pricing: {
    headline: "Simple, Transparent Pricing",
    subheadline: "Choose the plan that fits your data needs. No hidden fees.",
    plans: [
      {
        name: "Starter", price: "$1,500", period: "/ project",
        description: "Perfect for SMBs exploring data analytics for the first time.",
        features: ["Exploratory Data Analysis", "1 Dashboard or Report", "Statistical Summary", "1 round of revisions", "Email support"],
        cta: "Get Started", ctaPath: "/#contact", highlighted: false,
      },
      {
        name: "Growth", price: "$4,500", period: "/ month",
        description: "For businesses ready to operationalize data across their teams.",
        features: ["Everything in Starter", "Custom Business App or Dashboard", "Predictive Model (1 use case)", "Monthly reporting", "Priority support", "Bi-weekly check-ins"],
        cta: "Most Popular", ctaPath: "/#contact", highlighted: true,
      },
      {
        name: "Enterprise", price: "Custom", period: "",
        description: "Full-cycle data partnership tailored to your organization.",
        features: ["Everything in Growth", "Unlimited use cases", "ML pipeline development", "Dedicated data scientist", "SLA & compliance support", "Strategic quarterly reviews"],
        cta: "Contact Us", ctaPath: "/#contact", highlighted: false,
      },
    ],
  },

  // ─── Contact ──────────────────────────────────────────────
  contact: {
    headline: "Ready to blink into action?",
    subheadline: "Drop us a message and we'll get back to you within 24 hours.",
    offices: [
      { city: "Haifa", address: "Pinkser 71, Haifa, Israel" },
      { city: "Hanoi", address: "168 Ngoc Ha Street, Hanoi, Vietnam" },
    ],
    email: "hello@blinko-analytics.com",
    phone: "+972 50 000 0000",       // set to null to hide
    linkedin: "https://www.linkedin.com/in/dror-rosentraub/" as string | null,
  },

  // ─── Footer ───────────────────────────────────────────────
  footer: {
    tagline: "Turning data into decisions since 2016.",
    links: [
      { label: "Privacy Policy", path: "#" },
      { label: "Terms of Service", path: "#" },
    ],
  },
};
