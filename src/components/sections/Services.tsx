import { useRef } from "react";
import {
  Image as ImageIcon,
  Layout,
  Monitor,
  MousePointer2,
  Palette,
  Rocket,
  Search,
  Server,
  StickyNote,
  Type,
} from "lucide-react";
import { m, useInView } from "motion/react";

import { Container } from "@/components/layout";
import {
  Body200,
  Body50,
  Header100,
  SubHeader100,
  Caption,
} from "@/components/ui";
import { useScreenType } from "@/hooks";

// Types for Bento Items
interface BentoItem {
  title: string;
  description: string;
  header: React.ReactNode;
  className?: string;
  icon?: React.ElementType;
}

// --- Visual Components for Bento Cards ---

const DesignVisual = () => {
  const { isDesktop } = useScreenType();
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-xl border border-white/5 bg-black/40 p-6">
      {/* Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_90%)] bg-[size:24px_24px]" />

      {/* Main Container for Dual Elements */}
      <div className="relative flex w-full items-center justify-center gap-6">
        {/* 1. Main Interface Window (Shifted Left) */}
        <div className="relative z-10 w-full max-w-[320px] transition-all duration-500 lg:max-w-[340px] lg:-translate-x-12 xl:-translate-x-24">
          <m.div
            className="flex h-[160px] w-full flex-col overflow-hidden rounded-lg border border-white/10 bg-white/5 backdrop-blur-md"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{
              once: true,
              margin: "-50px",
              amount: isDesktop ? 0.6 : 0.1,
            }}
            transition={{ duration: 0.5 }}
          >
            {/* Window Header */}
            <div className="flex h-8 items-center border-b border-white/5 bg-white/5 px-3">
              <div className="flex gap-1.5">
                <div className="h-2 w-2 rounded-full bg-red-500/50" />
                <div className="h-2 w-2 rounded-full bg-yellow-500/50" />
                <div className="h-2 w-2 rounded-full bg-green-500/50" />
              </div>
              <div className="ml-4 h-1.5 w-full max-w-[200px] rounded-full bg-white/10" />
            </div>

            <div className="flex flex-1">
              {/* Sidebar */}
              <div className="flex w-10 flex-col items-center gap-3 border-r border-white/5 py-3">
                <Layout className="h-4 w-4 text-white/40" />
                <Palette className="h-4 w-4 text-white/40" />
                <div className="mt-auto h-4 w-4 rounded-full bg-white/10" />
              </div>

              {/* Main Content Area */}
              <div className="relative flex-1 bg-black/20 p-3">
                {/* Mock Hero Section */}
                <div className="flex flex-col gap-2">
                  <m.div
                    className="h-2 w-3/4 rounded-full bg-white/20"
                    initial={{ width: 0 }}
                    whileInView={{ width: "75%" }}
                    viewport={{
                      once: !isDesktop,
                      margin: "-50px",
                      amount: isDesktop ? 0.4 : 0.1,
                    }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                  />
                  <m.div
                    className="h-1.5 w-1/2 rounded-full bg-white/10"
                    initial={{ width: 0 }}
                    whileInView={{ width: "50%" }}
                    viewport={{
                      once: !isDesktop,
                      margin: "-50px",
                      amount: isDesktop ? 0.4 : 0.1,
                    }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                  />

                  <div className="mt-2 grid grid-cols-2 gap-2">
                    <m.div
                      className="h-16 rounded bg-pink-500/10"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{
                        once: !isDesktop,
                        margin: "-50px",
                        amount: isDesktop ? 0.4 : 0.1,
                      }}
                      transition={{ delay: 0.6 }}
                    />
                    <m.div
                      className="h-16 rounded bg-purple-500/10"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{
                        once: !isDesktop,
                        margin: "-50px",
                        amount: isDesktop ? 0.4 : 0.1,
                      }}
                      transition={{ delay: 0.7 }}
                    />
                  </div>

                  {/* Action Button */}
                  <m.div
                    className="mt-2 h-6 w-20 rounded bg-blue-500/20"
                    whileHover={{
                      scale: 1.05,
                      backgroundColor: "rgba(59, 130, 246, 0.3)",
                    }}
                  />
                </div>

                {/* Floating Cursor Interaction */}
                <m.div
                  className="absolute top-1/2 left-1/2 z-20 text-pink-400"
                  initial={{ x: 50, y: 50, opacity: 0 }}
                  whileInView={{ x: 0, y: 0, opacity: 1 }}
                  viewport={{
                    once: !isDesktop,
                    margin: "-50px",
                    amount: isDesktop ? 0.4 : 0.1,
                  }}
                  transition={{ delay: 1, duration: 1, type: "spring" }}
                >
                  <MousePointer2 className="h-5 w-5 fill-pink-400/20" />
                  <m.div
                    className="absolute top-4 left-4 rounded bg-pink-500 px-1.5 py-0.5 text-[8px] font-bold whitespace-nowrap text-white"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{
                      once: !isDesktop,
                      margin: "-50px",
                      amount: isDesktop ? 0.4 : 0.1,
                    }}
                    transition={{ delay: 1.5 }}
                  >
                    Start Designing
                  </m.div>
                </m.div>
              </div>
            </div>
          </m.div>
        </div>

        {/* 2. Ideas Canvas (New, on the Right) */}
        <m.div
          className="absolute top-1/2 right-4 hidden h-[140px] w-[200px] -translate-y-1/2 flex-col rounded-lg border border-white/10 bg-white/5 p-3 backdrop-blur-sm xl:flex"
          initial={{ opacity: 0, x: 20, rotate: 6 }}
          whileInView={{ opacity: 1, x: -20, rotate: 6 }}
          viewport={{
            once: !isDesktop,
            margin: "-50px",
            amount: isDesktop ? 0.4 : 0.1,
          }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="mb-2 flex items-center justify-between border-b border-white/5 pb-2">
            <span className="text-[10px] font-medium text-white/40">
              Moodboard
            </span>
            <div className="flex gap-1">
              <div className="h-1.5 w-1.5 rounded-full bg-pink-500/50" />
              <div className="h-1.5 w-1.5 rounded-full bg-purple-500/50" />
              <div className="h-1.5 w-1.5 rounded-full bg-blue-500/50" />
            </div>
          </div>

          <div className="relative flex-1">
            {/* Sticky Note */}
            <m.div
              className="absolute top-0 -left-2 flex h-12 w-12 flex-col gap-1 rounded bg-yellow-200/90 p-1 shadow-lg"
              initial={{ scale: 0.95, opacity: 0 }}
              whileInView={{ scale: 1, rotate: -6, opacity: 1 }}
              viewport={{
                once: !isDesktop,
                margin: "-50px",
                amount: isDesktop ? 0.4 : 0.1,
              }}
              transition={{ delay: 0.6 }}
            >
              <div className="h-1 w-8 rounded-full bg-black/20" />
              <div className="h-1 w-6 rounded-full bg-black/10" />
              <div className="h-1 w-5 rounded-full bg-black/10" />
              <StickyNote className="absolute right-1 bottom-1 h-3 w-3 text-black/20" />
            </m.div>

            {/* Color Palette */}
            <m.div
              className="absolute top-2 right-0 flex flex-col gap-1 rounded bg-white/10 p-1"
              initial={{ scale: 0.95, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{
                once: !isDesktop,
                margin: "-50px",
                amount: isDesktop ? 0.4 : 0.1,
              }}
              transition={{ delay: 0.7 }}
            >
              <div className="h-4 w-4 rounded-full bg-pink-500" />
              <div className="h-4 w-4 rounded-full bg-purple-500" />
              <div className="h-4 w-4 rounded-full bg-blue-500" />
            </m.div>

            {/* Image Placeholder */}
            <m.div
              className="absolute bottom-0 left-4 flex h-10 w-16 items-center justify-center rounded bg-white/10"
              initial={{ scale: 0.95, opacity: 0 }}
              whileInView={{ scale: 1, rotate: 3, opacity: 1 }}
              viewport={{
                once: !isDesktop,
                margin: "-50px",
                amount: isDesktop ? 0.4 : 0.1,
              }}
              transition={{ delay: 0.8 }}
            >
              <ImageIcon className="h-4 w-4 text-white/20" />
            </m.div>

            {/* Typography */}
            <m.div
              className="absolute right-2 bottom-2"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{
                once: !isDesktop,
                margin: "-50px",
                amount: isDesktop ? 0.4 : 0.1,
              }}
              transition={{ delay: 0.9 }}
            >
              <Type className="h-6 w-6 text-white/20" />
            </m.div>
          </div>
        </m.div>
      </div>

      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -z-10 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/10 blur-[80px]" />
    </div>
  );
};

const BuildVisual = () => {
  const { isDesktop } = useScreenType();
  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden rounded-xl border border-white/5 bg-linear-to-br from-black/40 to-blue-950/20 p-5">
      <div className="mb-4 flex items-center gap-2">
        <div className="h-2.5 w-2.5 rounded-full bg-red-500/50" />
        <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/50" />
        <div className="h-2.5 w-2.5 rounded-full bg-green-500/50" />
      </div>
      <div className="mt-4 flex flex-col gap-2.5 font-mono text-[11px] text-nowrap text-white/50">
        <m.div
          initial={{ opacity: 0, x: -10, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          viewport={{
            once: true,
            margin: "-50px",
            amount: isDesktop ? 0.4 : 0.1,
          }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex gap-2"
        >
          <span className="text-purple-400">import</span>
          <span className="text-yellow-200">{`{ Hero }`}</span>
          <span className="text-purple-400">from</span>
          <span className="text-emerald-300">'@/components'</span>
        </m.div>
        <m.div
          initial={{ opacity: 0, x: -10, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          viewport={{
            once: true,
            margin: "-50px",
            amount: isDesktop ? 0.4 : 0.1,
          }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex gap-2"
        >
          <span className="text-purple-400">export</span>
          <span className="text-purple-400">default</span>
          <span className="text-blue-400">function</span>
          <span className="text-yellow-200">Page()</span>
          <span className="text-white">{"{"}</span>
        </m.div>
        <m.div
          initial={{ opacity: 0, x: -10, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          viewport={{
            once: true,
            margin: "-50px",
            amount: isDesktop ? 0.4 : 0.1,
          }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="pl-4"
        >
          <span className="text-purple-400">return</span>
          <span className="text-blue-400"> &lt;</span>
          <span className="text-yellow-200">Hero</span>
          <span className="text-blue-400"> /&gt;</span>
        </m.div>
        <m.div
          initial={{ opacity: 0, x: -10, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          viewport={{
            once: true,
            margin: "-50px",
            amount: isDesktop ? 0.4 : 0.1,
          }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <span className="text-white">{"}"}</span>
        </m.div>

        {/* Status Bar */}
        <m.div
          className="mt-5.5 flex items-center gap-2 rounded bg-white/5 p-2"
          initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{
            once: true,
            margin: "-50px",
            amount: isDesktop ? 0.4 : 0.1,
          }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
          <span className="text-emerald-500">Compiled successfully</span>
        </m.div>
      </div>
      <div className="absolute -right-10 -bottom-10 h-32 w-32 rounded-full bg-blue-500/10 blur-2xl" />
    </div>
  );
};

const HostingVisual = () => {
  const { isDesktop } = useScreenType();
  return (
    <div className="relative flex h-full w-full flex-col justify-end overflow-hidden rounded-xl border border-white/5 bg-black/40 p-6 pb-0">
      <div className="absolute top-4 left-6">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
          <Caption className="font-semibold tracking-wider text-emerald-400 uppercase">
            System Status
          </Caption>
        </div>
        <SubHeader100 className="mt-1 font-bold text-white">
          All Systems Go
        </SubHeader100>
      </div>

      {/* Server Bars */}
      <div className="flex h-36 items-end gap-1.5">
        {[40, 65, 50, 80, 55, 90, 75, 95, 60, 85, 70, 45].map((height, i) => (
          <m.div
            key={height}
            className="w-full rounded-t-sm bg-emerald-500/20"
            initial={{ height: "10%" }}
            whileInView={{ height: `${height}%` }}
            viewport={{
              once: true,
              margin: "-50px",
              amount: isDesktop ? 0.4 : 0.1,
            }}
            transition={{ duration: 1, delay: i * 0.05, ease: "easeOut" }}
            whileHover={{
              height: `${Math.min(height + 20, 100)}%`,
              backgroundColor: "rgba(16, 185, 129, 0.6)",
            }}
          />
        ))}
      </div>

      {/* Overlay Gradient */}
      <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent" />
    </div>
  );
};

const SEOVisual = () => {
  const { isDesktop } = useScreenType();
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-xl border border-white/5 bg-linear-to-b from-black/40 to-orange-950/20">
      {/* Search Interface */}
      <div className="relative w-full max-w-[200px] space-y-3">
        {/* Search Bar */}
        <m.div
          className="flex h-8 w-full items-center rounded-full border border-white/10 bg-white/5 px-3"
          initial={{ width: "0%", opacity: 0 }}
          whileInView={{ width: "100%", opacity: 1 }}
          viewport={{
            once: true,
            margin: "-50px",
            amount: isDesktop ? 0.4 : 0.1,
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Search className="mr-2 h-3 w-3 text-orange-400" />
          <m.div
            className="h-1.5 w-24 rounded-full bg-white/10"
            initial={{ width: 0 }}
            whileInView={{ width: "60%" }}
            viewport={{
              once: true,
              margin: "-50px",
              amount: isDesktop ? 0.4 : 0.1,
            }}
            transition={{ delay: 0.5, duration: 0.5 }}
          />
        </m.div>

        {/* Results */}
        {[1, 2, 3].map((rank) => (
          <m.div
            key={rank}
            className="flex items-center gap-3 rounded-lg border border-white/5 bg-white/5 p-2"
            initial={{ opacity: 0, x: -20, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{
              once: true,
              margin: "-50px",
              amount: isDesktop ? 0.4 : 0.1,
            }}
            transition={{ delay: 0.8 + rank * 0.2, duration: 0.5 }}
          >
            <div className="flex h-6 w-6 items-center justify-center rounded bg-orange-500/20 text-[10px] font-bold text-orange-400">
              {rank}
            </div>
            <div className="flex-1 space-y-1.5">
              <div className="h-1.5 w-3/4 rounded-full bg-white/10" />
              <div className="h-1 w-1/2 rounded-full bg-white/5" />
            </div>
          </m.div>
        ))}
      </div>

      {/* Floating Graph Line Background */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-20"
        preserveAspectRatio="none"
      >
        <m.path
          d="M0 200 Q 100 100, 200 150 T 400 50"
          fill="none"
          stroke="#fb923c"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{
            once: true,
            margin: "-50px",
            amount: isDesktop ? 0.4 : 0.1,
          }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
      </svg>
    </div>
  );
};

// --- Main Components ---

const BentoCard = ({ item, index }: { item: BentoItem; index: number }) => {
  const { isDesktop } = useScreenType();
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-50px",
    amount: isDesktop ? 0.4 : 0.1,
  });

  return (
    <m.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{
        duration: 0.8,
        delay: index * 0.1,
        ease: [0.2, 0.8, 0.2, 1], // Premium ease
      }}
      className={`group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-colors duration-500 hover:border-white/20 hover:bg-white/10 ${
        item.className || ""
      }`}
    >
      {/* Background Gradient Hover Effect */}
      <div className="absolute inset-0 -z-10 bg-linear-to-br from-white/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      {/* Content */}
      <div className="relative z-10 flex flex-col gap-2">
        <div className="flex items-center gap-2">
          {item.icon && (
            <m.div
              initial={{ opacity: 0, scale: 0.5, filter: "blur(10px)" }}
              animate={
                isInView
                  ? { opacity: 1, scale: 1, filter: "blur(0px)" }
                  : { opacity: 0, scale: 0.5, filter: "blur(10px)" }
              }
              transition={{
                duration: 0.6,
                delay: index * 0.1 + 0.2,
                type: "spring",
                bounce: 0.3,
              }}
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-white transition-colors group-hover:bg-white/20"
            >
              <item.icon className="h-4 w-4" />
            </m.div>
          )}
          <SubHeader100
            as={m.h3}
            initial={{ opacity: 0, x: -10, filter: "blur(8px)" }}
            animate={
              isInView
                ? { opacity: 1, x: 0, filter: "blur(0px)" }
                : { opacity: 0, x: -10, filter: "blur(8px)" }
            }
            transition={{
              duration: 0.6,
              delay: index * 0.1 + 0.25,
              ease: [0.2, 0.8, 0.2, 1],
            }}
            className="text-white"
          >
            {item.title}
          </SubHeader100>
        </div>
        <Body50
          as={m.p}
          initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
          animate={
            isInView
              ? { opacity: 1, y: 0, filter: "blur(0px)" }
              : { opacity: 0, y: 10, filter: "blur(8px)" }
          }
          transition={{
            duration: 0.6,
            delay: index * 0.1 + 0.3,
            ease: [0.2, 0.8, 0.2, 1],
          }}
          className="text-white/60"
        >
          {item.description}
        </Body50>
      </div>

      {/* Header Visual */}
      <div className="relative mt-4 h-56 w-full overflow-hidden rounded-xl">
        {item.header}
      </div>
    </m.div>
  );
};

export const Services = () => {
  const { isDesktop } = useScreenType();

  const items: BentoItem[] = [
    {
      title: "Design",
      description:
        "Thoughtful design systems and modern interfaces built for real users.",
      header: <DesignVisual />,
      className: "md:col-span-2",
      icon: Monitor,
    },
    {
      title: "Development",
      description:
        "High-performance websites powered by React and headless CMS architecture.",
      header: <BuildVisual />,
      className: "md:col-span-2 lg:col-span-1",
      icon: Rocket,
    },
    {
      title: "Hosting",
      description:
        "Deployment, infrastructure, and monitoring — handled end-to-end.",
      header: <HostingVisual />,
      className: "md:col-span-2 lg:col-span-1",
      icon: Server,
    },
    {
      title: "SEO Optimisation",
      description:
        "Technical SEO built into the foundation — not added after launch. You stay in full control of your content.",
      header: <SEOVisual />,
      className: "md:col-span-2",
      icon: Search,
    },
  ];

  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <Container>
        <div className="mb-16 flex flex-col items-center text-center md:mb-24">
          <Header100
            as={m.h2}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{
              once: true,
              margin: "-50px",
              amount: isDesktop ? 0.4 : 0.1,
            }}
            transition={{ duration: 0.5 }}
            className="mb-4 text-white"
          >
            Everything your website needs.
            <br />
            In one place
          </Header100>
          <Body200
            as={m.p}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{
              once: true,
              margin: "-50px",
              amount: isDesktop ? 0.4 : 0.1,
            }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="max-w-2xl text-white/60"
          >
            No juggling multiple agencies or freelancers. Product is designed,
            built, and maintained in one clear, collaborative workflow.
          </Body200>
        </div>

        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-4 lg:grid-cols-3">
          {items.map((item, i) => (
            <BentoCard key={item.title} item={item} index={i} />
          ))}
        </div>
      </Container>
    </section>
  );
};
