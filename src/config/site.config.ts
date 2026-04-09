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
  // Hash links like "/#about" work from ANY page - they navigate
  // to home then auto-scroll to the section with that id.
  nav: {
    links: [
      { label: "Home", path: "/" },
      { label: "Products", path: "/products" },
      { label: "Pricing", path: "/pricing" },
      { label: "Team", path: "/team" },
      { label: "Contact", path: "/#contact" },

    ],
  },

  // ─── Hero Section ─────────────────────────────────────────
  hero: {
    headline: "Your business data, finally in one clear view",
    subheadline: "Blinko helps finance, fintech, and ecommerce teams turn messy data into clear, live dashboards - without hiring a full in-house data or dev team.",
    description:
      "Built for growing teams stuck between spreadsheets, disconnected tools, and slow reporting.",
    primaryCTA: { label: "Book a Blueprint Call", path: "/#contact" },
    secondaryCTA: { label: "See Example Dashboards", path: "/products" },
  },

  // ─── Stats ────────────────────────────────────────────────
  // Title: "Real impact, measured in real numbers"
  statsHeadline: "Real impact, measured in real numbers",
  stats: [
    { value: "40%", label: "Increase", client: "Solventis", description: "Automated loan assessments increased the number of clients processed through financial reviews." },
    { value: "$500K+", label: "Protected revenue annually", client: "Fractal", description: "Real-time analytics platform saved 10-12 hours per week per user in issue response time." },
    { value: "2,400", label: "Hrs/Year Saved", client: "Alcrest Partners", description: "AI-powered data matching enabled high-confidence outreach, eliminating manual research." },
  ],

  // ─── Who This Is For ────────────────────────────────────
  audience: {
    headline: "Who this is for",
    intro: "We work best with growing companies that need better visibility but don't have the team to build it properly.",
    cards: [
      {
        title: "Growing team, growing complexity",
        description: "Your reporting needs are outgrowing spreadsheets and manual exports, but a full enterprise setup doesn't make sense yet.",
        icon: "Users",
      },
      {
        title: "No strong in-house data or dev team",
        description: "You may have 1–2 technical people internally, but not enough capacity to handle analytics, dashboard design, data modeling, and implementation end to end.",
        icon: "Code",
      },
      {
        title: "Need business visibility now",
        description: "You want a dashboard that helps your team make faster decisions - not a 6-month consulting engagement.",
        icon: "Eye",
      },
    ],
    bottomLine: "Especially relevant for teams in finance, fintech, healthcare, insurance, and ecommerce.",
  },

  // ─── Pain Points ────────────────────────────────────────
  painPoints: {
    headline: "If reporting feels harder than it should, you're not alone",
    blocks: [
      {
        title: "Your data lives everywhere",
        description: "Spreadsheets, exports, payment tools, CRM, operations systems, ad platforms, internal files - but not in one clear view.",
        icon: "FolderOpen",
      },
      {
        title: "Your team spends too much time preparing reports",
        description: "Instead of making decisions, people are chasing numbers, cleaning files, and manually updating dashboards.",
        icon: "Clock",
      },
      {
        title: "You don't fully trust the numbers",
        description: "Different people report different versions of the truth, and leadership lacks confidence in what they're seeing.",
        icon: "AlertTriangle",
      },
      {
        title: "You know what you need - but not how to build it",
        description: "Hiring a full team is expensive. Off-the-shelf tools rarely fit. Internal resources are too stretched.",
        icon: "HelpCircle",
      },
    ],
    transition: "That's where Blinko comes in.",
  },

  // ─── What You Get ───────────────────────────────────────
  deliverables: {
    headline: "What you get",
    intro: "A project with Blinko gives you something your team will actually use every day - not just charts on a screen.",
    tiers: [
      {
        name: "Blink Analytics",
        timeline: "Results in weeks",
        blocks: [
          { title: "Statistical analysis built around your questions", description: "Hypothesis testing, regression, A/B validation - answers you can act on." },
          { title: "Clean, structured reporting", description: "We help structure your metrics so your team can stop debating numbers and start acting on them." },
          { title: "Interactive dashboards", description: "Power BI, Streamlit, or a lightweight web app - built around your KPIs and workflows." },
        ],
      },
      {
        name: "Blink Intelligence",
        timeline: "Live in 4–8 weeks",
        blocks: [
          { title: "Custom dashboards with drill-down capability", description: "Role-based access, automated pipelines, and real-time data - everything your team needs in one place." },
          { title: "Database design & data infrastructure", description: "We set up the data layer properly so everything connects and nothing breaks as you grow." },
          { title: "Predictive modeling & internal tools", description: "Churn analysis, forecasting, and lightweight apps your team can use daily." },
        ],
      },
      {
        name: "Blink AI",
        timeline: "Full deployment in 8–12 weeks",
        blocks: [
          { title: "AI-powered natural language insights", description: "Ask questions in plain English and get answers from your data instantly." },
          { title: "Client health scores & churn prediction", description: "Know which customers are at risk before they leave." },
          { title: "Anomaly detection & smart alerts", description: "Get notified automatically when something unusual happens in your data." },
        ],
      },
    ],
    closingLine: "Once your dashboard layer is working, you're in a much better position to add forecasting, predictive analytics, or automation later.",
  },

  // ─── Process ────────────────────────────────────────────
  process: {
    headline: "A simple 4-step process",
    steps: [
      { number: 1, title: "Blueprint Call", description: "We learn how your business works, what decisions matter, and which metrics your team needs to see." },
      { number: 2, title: "Scope & Dashboard Plan", description: "We map your KPIs, data sources, and dashboard structure into a practical implementation plan." },
      { number: 3, title: "Build & Review", description: "We build the dashboard, review it with your team, and refine it based on actual use." },
      { number: 4, title: "Launch & Improve", description: "You go live with a dashboard your team can use immediately, with optional ongoing support and iteration." },
    ],
    supportLine: "Need ongoing improvements after launch? We also offer a monthly retainer for updates, maintenance, and new reporting needs.",
  },

  // ─── Demo Use Cases ─────────────────────────────────────
  demoCases: [
    {
      title: "Insurance / Finance Operations Dashboard",
      description: "Give leaders and ops teams one clear view of commercial performance, retention, and operational risk.",
      metrics: ["Policy sales", "Claims activity", "Customer retention", "Agent performance", "Risk flags"],
      cta: "View demo",
    },
    {
      title: "Fintech Operations Dashboard",
      description: "Monitor the metrics that matter across growth, approvals, volume, and anomalies - all in one place.",
      metrics: ["Approval rates", "Transaction volume", "Fraud or risk anomalies", "Funnel conversion", "Operational bottlenecks"],
      cta: "View demo",
    },
    {
      title: "Marketplace Seller Dashboard",
      description: "See revenue, profitability, ad performance, and inventory signals without switching across multiple platforms.",
      metrics: ["Revenue", "Margin", "Ad spend", "Refund rate", "Stockout risk", "Channel split"],
      cta: "View demo",
    },
  ],
  demoCasesBottomLine: "Need a different use case? We can tailor the dashboard to your workflow, industry, and KPIs.",

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
      subtitle: "Statistical Analysis, Reporting & Dashboards",
      description:
        "For businesses that need clarity on their data without building infrastructure. Get statistical analysis, business reporting, and interactive dashboards - delivered in weeks.",
      features: [
        "Statistical analysis & hypothesis testing",
        "Business performance reporting",
        "Data cleaning & preparation",
        "Interactive dashboards (Power BI, Streamlit, or web app)",
        "A/B test design & validation",
      ],
      // demoType: "url" as "url" | "video" | "page",
      // demoUrl: "https://www.blinko-analytics.com",
      // demoVideo: null as string | null,
      // demoPage: null as string | null,
      image: null as string | null,  // ← add product screenshot here
      icon: "BarChart3",
      color: "#00C2FF",
    },
    {
      id: "blink-intelligence",
      name: "Blink Intelligence",
      subtitle: "Custom Platforms, Pipelines & Predictive Modeling",
      description:
        "Custom web dashboards, automated pipelines, predictive modeling, and internal tools - all connected and live in 4–8 weeks.",
      features: [
        "Custom web dashboards with drill-down capability",
        "Automated data pipelines & scheduling",
        "Predictive modeling & churn analysis",
        "Role-based access for multiple users",
        "Database design & data infrastructure",
        "Automated alerts for critical data changes",
      ],
      // demoType: "video" as "url" | "video" | "page",
      // demoUrl: null as string | null,
      // demoVideo: "/videos/bi-demo.mp4",
      // demoPage: null as string | null,
      image: `${import.meta.env.BASE_URL}images/image_1.png`,
      icon: "Layout",
      color: "#00FFB2",
    },
    {
      id: "blink-ai",
      name: "Blink AI",
      subtitle: "AI-Powered Insights, Anomaly Detection & Client Health Scores",
      description:
        "Ask your data questions in plain English, catch problems before they escalate, and know which customers need attention - deployed in 8–12 weeks.",
      features: [
        "AI-powered natural language insights",
        "Client health score & churn prediction",
        "Anomaly detection & smart alerts",
        "Dedicated data scientist",
        "SLA & compliance support",
      ],
      // demoType: "page" as "url" | "video" | "page",
      // demoUrl: null as string | null,
      // demoVideo: null as string | null,
      // demoPage: "/demos/predictive",
      image: `${import.meta.env.BASE_URL}images/image_2.png`,
      icon: "BrainCircuit",
      color: "#6404ff",
    },
  ],

  // ─── Why Choose Us ────────────────────────────────────────
  pillars: [
    { icon: "Zap", title: "Fast", description: "Fast-track from data to decision - maximum business value" },
    { icon: "Layers", title: "Flexible", description: "Flexible solutions, boutique-style care" },
    { icon: "RefreshCw", title: "Full-cycle", description: "Full-cycle partnership with end-to-end support" },
    { icon: "Shield", title: "Firm", description: "Firm data foundation - clean, unified, ready" },
  ],

  // ─── Testimonials ─────────────────────────────────────────
  testimonials: [
    {
      quote: "Blinko went beyond expectations - found ways to improve the product even more than planned, and helped bring my vision to life. Exceptional work, delivered on time.",
      author: "Marco D.",
      role: "CEO",
      company: "Canada",
      avatar: null,
      source: null,
    },
    {
      quote: "The statistics for our project were complex - many rejected it, but Blinko took it on. They not only answered our original questions but went above and beyond by preparing a beautiful dashboard.",
      author: "Ricardo O.",
      role: "Founder",
      company: "Chile",
      avatar: null,
      source: null,
    },
    {
      quote: "Blinko delivered top-notch professional work that exceeded expectations, mastering each project with precision and speed. A delight to work with.",
      author: "H. Qureshi",
      role: "CFO",
      company: "United States",
      avatar: null,
      source: null,
    },
    {
      quote: "Blinko delivered exceptional work on a highly complex problem. Deep expertise in data science, machine learning, and business domain knowledge - exceeded all expectations.",
      author: "Nextrer",
      role: "Founder",
      company: "Singapore",
      avatar: null,
      source: null,
    },
    {
      quote: "We searched for the right analytics partner for a while. Blinko delivered with a high level of professionalism, attention to detail, and clear explanations. Very happy with the results.",
      author: "Paulina K.",
      role: "CEO",
      company: "Latvia",
      avatar: null,
      source: null,
    },
    {
      quote: "From our initial contact, Blinko demonstrated a keen understanding of our project. The analysis was thorough, responses always prompt - made us feel like our project was the top priority.",
      author: "Dave S.",
      role: "Founder",
      company: "United States",
      avatar: null,
      source: null,
    },
    {
      quote: "An outstanding example of thorough analysis and strategic insight. The attention to detail and clear, actionable recommendations demonstrate a deep understanding of the subject matter.",
      author: "Chris M.",
      role: "CEO",
      company: "Germany",
      avatar: null,
      source: null,
    },
    {
      quote: "Blinko has the unique ability to simplify complicated tasks into a user-friendly experience. We are looking forward to a long-term successful business relationship.",
      author: "Pete Z.",
      role: "Founder",
      company: "Australia",
      avatar: null,
      source: null,
    },
    {
      quote: "A deep understanding of AI and data domains. Reliable and a trusted partner to get your projects done. Blinko is becoming invaluable as a remote collaborator.",
      author: "Hidden Agenda",
      role: "CFO",
      company: "United Kingdom",
      avatar: null,
      source: null,
    },
    {
      quote: "We looked long and hard for someone to help with our project and failed many times. Blinko nailed the idea the first time and provided exactly what we asked for.",
      author: "Six W.",
      role: "Founder",
      company: "United States",
      avatar: null,
      source: null,
    },
    {
      quote: "Blinko went well above and beyond what we were expecting and delivered something that is now very valuable to our business. Highly recommended.",
      author: "T. Muffett",
      role: "CEO",
      company: "Indonesia",
      avatar: null,
      source: null,
    },
    {
      quote: "Exceeded our expectations with exceptional attention to detail and utmost professionalism. Listened to what we asked for and delivered. Very, very good.",
      author: "Stephen B.",
      role: "Founder",
      company: "United Kingdom",
      avatar: null,
      source: null,
    },
  ],

  // ─── Success Stories ──────────────────────────────────────
  caseStudies: [
    {
      headline: "Loan review throughput improvement",
      description: "Automated loan assessments increased the number of clients processed through financial reviews.",
      outcome: "More applications reviewed without adding analyst headcount.",
      metric: "40%", label: "Increase", client: "Solventis", url: "#",
    },
    {
      headline: "Revenue protection and faster incident handling",
      description: "Real-time analytics platform saved 10-12 hours per week per user in issue response time.",
      outcome: "Protected $500K+ in annual revenue at-risk from delayed issue detection.",
      metric: "$500K+", label: "Protected revenue annually", client: "Fractal", url: "#",
    },
    {
      headline: "Automation of data matching workflows",
      description: "AI-powered data matching enabled high-confidence outreach, eliminating manual research.",
      outcome: "Saved 2,400 hours of manual effort every year.",
      metric: "2,400", label: "Hrs/Year Saved", client: "Alcrest Partners", url: "#",
    },
  ],
  caseStudiesIntro: "Named outcomes from recent analytics and automation projects.",

  // ─── Leadership ───────────────────────────────────────────
  //
  // Add as many people as you like. Each person shows up as a card
  // in the Leadership section on the homepage.
  //
  // Fields:
  //   name       Full name
  //   role       Short role label shown in the coloured badge  (e.g. "Founder", "CTO")
  //   title      Full job title shown under the name
  //   bio        Paragraph bio - 2-4 sentences works best
  //   image      Path inside /public  e.g. "/images/dror.jpg"  - null shows initials avatar
  //   linkedin   Full https:// URL - null hides the button
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
      role: "Co-Founder & CCSO",
      title: "Chief Customer Success Officer & Business Analyst",
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
        name: "Blink Analytics", price: "From $3,000", period: "/ project",
        description: "For businesses that need clarity on their data without building infrastructure.",
        features: ["Statistical analysis & hypothesis testing", "Business performance reporting", "Data cleaning & preparation", "Interactive dashboards (Power BI, Streamlit, or web app)", "A/B test design & validation", "Email support"],
        cta: "Get Started", ctaPath: "/#contact", highlighted: false,
      },
      {
        name: "Blink Intelligence", price: "From $7,000", period: "/ project",
        description: "Your center analytics layer - custom platforms, pipelines, and predictive modeling.",
        features: ["Everything in Blink Analytics", "Custom web dashboards with drill-down capability", "Automated data pipelines & scheduling", "Predictive modeling & churn analysis", "Role-based access for multiple users", "Database design & data infrastructure", "Lightweight internal tools & apps", "Automated alerts for critical data changes"],
        cta: "Most Popular", ctaPath: "/#contact", highlighted: true,
      },
      {
        name: "Blink AI", price: "Custom", period: "",
        description: "AI-powered intelligence layer for organizations that need to stay ahead of their data.",
        features: ["Everything in Blink Intelligence", "AI-powered natural language insights", "Client health score & churn prediction", "Anomaly detection & smart alerts", "Dedicated data scientist", "SLA & compliance support", "Strategic quarterly reviews"],
        cta: "Contact Us", ctaPath: "/#contact", highlighted: false,
      },
    ],
  },

  // ─── Final CTA ───────────────────────────────────────────
  finalCTA: {
    headline: "Get a clearer view of your business in weeks, not months",
    subheadline: "If your team is still piecing together reports manually, Blinko can help you build a live dashboard that brings your numbers into one reliable view.",
    cta: { label: "Book a Blueprint Call", path: "/#contact" },
    reassurance: "No pressure. Just a practical conversation about your reporting needs, current pain points, and what a right-sized dashboard could look like for your business.",
  },

  // ─── Contact ──────────────────────────────────────────────
  contact: {
    headline: "Let's talk about your data",
    subheadline: "Book a Dashboard Blueprint Call - we'll get back to you within 24 hours.",
    offices: [
      { city: "Haifa", address: "Pinkser 71, Haifa, Israel" },
      { city: "Hanoi", address: "168 Ngoc Ha Street, Hanoi, Vietnam" },
    ],
    email: "info@blinko-analytics.com",
    phone: null as string | null,       // set to null to hide
    linkedin: "https://www.linkedin.com/company/blinko-analytics/" as string | null,
  },

  // ─── Footer ───────────────────────────────────────────────
  footer: {
    tagline: "Turning data into decisions since 2016.",
    links: [
      { label: "Privacy Policy", path: "#" },
      { label: "Terms of Service", path: "#" },
    ],
  },
  mobile: {
    showCaseStudies: true,
    showTestimonials: false,
    showContact: true,   // ← toggle any section off on mobile here
  },
};
