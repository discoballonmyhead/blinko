import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";

const HomePage = lazy(() => import("./pages/HomePage").then(m => ({ default: m.HomePage })));
const ProductsPage = lazy(() => import("./pages/ProductsPage").then(m => ({ default: m.ProductsPage })));
const PricingPage = lazy(() => import("./pages/PricingPage").then(m => ({ default: m.PricingPage })));
const DemoPage = lazy(() => import("./pages/demos/DemoPage").then(m => ({ default: m.DemoPage })));
const PredictiveDemoPage = lazy(() => import("./pages/demos/PredictiveDemoPage").then(m => ({ default: m.PredictiveDemoPage })));

const DEMO_ROUTES = ["/demo/", "/demos/"];

function PageShell() {
  return <div style={{ minHeight: "100vh", background: "#030814" }} />;
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    if (!DEMO_ROUTES.some(r => pathname.startsWith(r))) window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function MainLayout() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="pricing" element={<PricingPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter basename="/blinko/">
      <ScrollToTop />
      <Suspense fallback={<PageShell />}>
        <Routes>
          <Route path="/demo/:productId" element={<DemoPage />} />
          <Route path="/demos/predictive" element={<PredictiveDemoPage />} />
          <Route path="/*" element={<MainLayout />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}