import { useEffect } from "react";
import { MapPin } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

import { Container } from "@/components/layout";
import { Button, Display100, Body200, Body50 } from "@/components/ui";

export function Hero() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const x = useTransform(springX, [-0.5, 0.5], ["-25px", "25px"]);
  const y = useTransform(springY, [-0.5, 0.5], ["-25px", "25px"]);

  const xInverse = useTransform(springX, [-0.5, 0.5], ["25px", "-25px"]);
  const yInverse = useTransform(springY, [-0.5, 0.5], ["25px", "-25px"]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouseX.set(e.clientX / innerWidth - 0.5);
      mouseY.set(e.clientY / innerHeight - 0.5);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section className="bg-background relative flex min-h-screen items-center justify-center overflow-hidden pt-20">
      {/* Background Glow - Blobs */}
      {/* Top Center-Right Blob */}
      <motion.div
        style={{ x, y }}
        animate={{
          scale: [1, 1.1, 0.9, 1],
          opacity: [0.3, 0.5, 0.3],
          borderRadius: [
            "60% 40% 30% 70% / 60% 30% 70% 40%",
            "30% 60% 70% 40% / 50% 60% 30% 60%",
            "60% 40% 30% 70% / 60% 30% 70% 40%",
          ],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-0 -right-20 h-[300px] w-[300px] bg-blue-500/30 blur-[100px] will-change-transform md:top-20 md:right-60"
      />

      {/* Bottom Left Blob */}
      <motion.div
        style={{
          x: xInverse,
          y: yInverse,
        }}
        animate={{
          scale: [1, 1.2, 0.8, 1],
          opacity: [0.2, 0.4, 0.2],
          borderRadius: [
            "40% 60% 70% 30% / 40% 40% 60% 50%",
            "60% 40% 30% 70% / 70% 50% 50% 60%",
            "40% 60% 70% 30% / 40% 40% 60% 50%",
          ],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute -bottom-20 -left-20 h-[400px] w-[500px] bg-sky-500/20 blur-[80px] will-change-transform md:bottom-20 md:left-20"
      />

      {/* Center Detail Blob */}
      <motion.div
        style={{
          x: useTransform(springX, [-0.5, 0.5], ["-15px", "15px"]),
          y: useTransform(springY, [-0.5, 0.5], ["15px", "-15px"]),
        }}
        animate={{
          scale: [0.9, 1.1, 1],
          opacity: [0.2, 0.4, 0.2],
          borderRadius: [
            "50% 50% 20% 80% / 25% 80% 20% 75%",
            "60% 40% 30% 70% / 70% 30% 70% 40%",
            "50% 50% 20% 80% / 25% 80% 20% 75%",
          ],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute top-1/2 left-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 bg-blue-500/10 blur-[80px] will-change-transform"
      />

      {/* Content */}
      <Container className="relative z-10 flex max-w-6xl flex-col items-center gap-8 text-center">
        {/* Chip */}
        <motion.div
          initial={{ opacity: 0, rotateX: 90 }}
          animate={{ opacity: 1, rotateX: 0 }}
          transition={{
            duration: 1,
            delay: 1.2,
            type: "spring",
            stiffness: 120,
            damping: 20,
          }}
          style={{ transformPerspective: 1000 }}
        >
          <motion.div
            className="text-muted-foreground inline-flex cursor-default items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-medium backdrop-blur-sm"
            whileHover={{
              scale: 1.05,
              backgroundColor: "rgba(255, 255, 255, 0.1)",
            }}
            transition={{ duration: 0.2 }}
          >
            <div className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
            </div>
            <Body50 className="font-medium">Available for new projects</Body50>
          </motion.div>
        </motion.div>

        {/* Headline */}
        <Display100 as="h1" className="text-foreground relative z-20">
          <span className="overflow-hidden">
            <motion.span
              initial={{
                y: "30%",
                rotate: 1,
                opacity: 0,
                filter: "blur(5px)",
              }}
              animate={{ y: 0, rotate: 0, opacity: 1, filter: "blur(0px)" }}
              transition={{
                duration: 0.8,
                delay: 0.3,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="inline-block origin-top-left sm:text-nowrap"
            >
              Future-ready websites <span className="sm:hidden">for</span>
            </motion.span>
          </span>
          <span className="overflow-hidden">
            <motion.span
              initial={{ y: "30%", rotate: 1, opacity: 0 }}
              animate={{ y: 0, rotate: 0, opacity: 1 }}
              transition={{
                duration: 0.8,
                delay: 0.45,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="inline-block origin-top-left bg-gradient-to-br from-white via-white/80 to-white/40 bg-clip-text text-transparent"
            >
              <span className="hidden sm:inline-block">for</span> modern brands.
            </motion.span>
          </span>
        </Display100>

        {/* Supporting Text */}
        <Body200
          as={motion.p}
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-muted-foreground max-w-xl"
        >
          Design. Build. Launch — done right. Unlock the full potential of the
          digital side of your business.
        </Body200>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 0.8,
            delay: 0.7,
            type: "spring",
            stiffness: 100,
            damping: 20,
          }}
          className="mt-6 flex flex-col items-center gap-4 sm:flex-row"
        >
          <Button
            size="lg"
            className="h-12 cursor-pointer rounded-full bg-white px-8 text-base font-medium text-black transition-all duration-300 hover:scale-105 hover:bg-white/90 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
            data-umami-event="Hero - Start Project"
            onClick={() => {
              const contactSection = document.getElementById("contact");
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            Start a project
          </Button>
          {/* <Button
            variant="ghost"
            size="lg"
            className="group text-muted-foreground cursor-pointer gap-2 rounded-full px-4 text-base hover:bg-transparent hover:text-white"
          >
            View testimonials
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button> */}
        </motion.div>

        {/* Location Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-8 flex items-center gap-2 md:mt-20"
        >
          <MapPin className="text-muted-foreground h-4 w-4" />
          <Body50
            as="div"
            className="text-muted-foreground flex flex-wrap gap-x-1 font-medium"
          >
            {"Based in Birmingham, UK. Operating globally."
              .split(" ")
              .map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, x: -10, filter: "blur(4px)" }}
                  animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  transition={{
                    delay: 1.2 + i * 0.04,
                    duration: 0.4,
                    type: "spring",
                    stiffness: 150,
                    damping: 20,
                    mass: 0.5,
                    filter: {
                      type: "tween",
                      ease: "easeOut",
                    },
                  }}
                >
                  {word}
                </motion.span>
              ))}
          </Body50>
        </motion.div>
      </Container>
    </section>
  );
}
