import { Hand } from "lucide-react";
import {
  motion,
  useAnimation,
  useScroll,
  useSpring,
  useMotionValueEvent,
} from "motion/react";
import { useState, useEffect } from "react";

import LightLogo from "@/assets/Light Logo.svg";
import { Container } from "@/components/layout";
import { Body100 } from "@/components/ui";
import { cn } from "@/lib/utils";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const handControls = useAnimation();
  const { scrollY, scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 20);
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      void handControls.start({
        rotate: [12, 35, -8, 12],
        transition: {
          duration: 0.8,
          ease: [0.16, 1, 0.3, 1],
        },
      });
    }, 1500); // Wait for header entrance (0.8s) + delay

    return () => clearTimeout(timer);
  }, [handControls]);

  return (
    <motion.header
      className={cn(
        "fixed top-0 right-0 left-0 z-50 transition-all duration-500",
        isScrolled
          ? "bg-background/60 border-b border-white/5 py-4 backdrop-blur-md"
          : "bg-transparent py-6",
      )}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <Container className="flex items-center justify-between">
        <a
          href="/"
          className="group focus-visible:ring-offset-background flex cursor-pointer items-center gap-2 rounded-sm focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          <img src={LightLogo} alt="bzvstudio logo" className="h-8 w-auto" />
        </a>

        <nav className="flex items-center gap-8">
          <motion.button
            className="group focus-visible:ring-offset-background relative inline-flex h-9 overflow-hidden rounded-full p-[1px] focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:outline-none"
            whileHover="hover"
            data-umami-event="Header - Say Hi"
            onMouseEnter={() => {
              void handControls.start({
                rotate: [12, 35, -8, 12],
                transition: {
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                },
              });
            }}
            onClick={() => {
              const contactSection = document.getElementById("contact");
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            <span className="absolute inset-[-1000%] animate-[spin_2.5s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#ec4899_0%,#3b82f6_33%,#6366f1_66%,#ec4899_100%)]" />
            <Body100
              as="div"
              className="inline-flex h-full w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-black px-6 font-medium text-white backdrop-blur-3xl transition-all group-hover:bg-black/80"
            >
              <span>Say Hi</span>
              <motion.div
                animate={handControls}
                className="origin-[50%_90%] rotate-[12deg]"
              >
                <Hand className="h-4 w-4" />
              </motion.div>
            </Body100>
          </motion.button>
        </nav>
      </Container>
      <motion.div
        className="absolute right-0 bottom-0 left-0 h-[2px] origin-left bg-white"
        style={{ scaleX }}
      />
    </motion.header>
  );
}
