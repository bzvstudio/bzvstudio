import { useEffect, Suspense, lazy, useRef } from "react";
import Lenis from "lenis";
import { LazyMotion, domAnimation, useInView } from "motion/react";

import { Footer } from "@/components/sections/Footer";
import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { Process } from "@/components/sections/Process";
import { Services } from "@/components/sections/Services";
import { Toaster } from "@/components/ui/sonner";

const ContactLazy = lazy(() =>
  import("@/components/sections/Contact").then((module) => ({
    default: module.Contact,
  })),
);

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "50% 0px 50% 0px" }); // Load when within 50% viewport height

  return (
    <div id="contact" ref={ref} className="min-h-screen w-full">
      {isInView ? (
        <Suspense fallback={<div className="bg-background min-h-screen" />}>
          <ContactLazy />
        </Suspense>
      ) : null}
    </div>
  );
};

function App() {
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
    <LazyMotion features={domAnimation}>
      <div className="bg-background text-foreground min-h-screen antialiased selection:bg-white/20">
        <Header />
        <main>
          <Hero />
          <Services />
          <Process />
          <Contact />
        </main>
        <Footer />
        <Toaster />
      </div>
    </LazyMotion>
  );
}

export default App;
