import { useEffect, Suspense, lazy } from "react";
import Lenis from "lenis";

import { Footer } from "@/components/sections/Footer";
import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { Toaster } from "@/components/ui/sonner";

const Contact = lazy(() =>
  import("@/components/sections/Contact").then((module) => ({
    default: module.Contact,
  })),
);
const Process = lazy(() =>
  import("@/components/sections/Process").then((module) => ({
    default: module.Process,
  })),
);
const Services = lazy(() =>
  import("@/components/sections/Services").then((module) => ({
    default: module.Services,
  })),
);

export function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="bg-background text-foreground min-h-screen antialiased selection:bg-white/20">
      <Header />
      <main>
        <Hero />
        <Suspense fallback={<div className="bg-background min-h-screen" />}>
          <Services />
          <Process />
          <Contact />
        </Suspense>
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}

export default App;
