import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "motion/react";
import {
  Check,
  Code,
  FileCode,
  Layout,
  MousePointer2,
  PenTool,
  Rocket,
  ShieldCheck,
  Sparkles,
  Terminal,
} from "lucide-react";

import { Container } from "@/components/layout";
import {
  Body100,
  Body200,
  Header100,
  Display200,
  Header200,
} from "@/components/ui";

// --- Custom Visuals for Each Step ---

const DiscoveryVisual = ({ isActive }: { isActive: boolean }) => {
  // Nodes representing data points/insights found during discovery
  const nodes = [
    { x: 20, y: 30, delay: 0.2, size: 3 },
    { x: 85, y: 25, delay: 0.5, size: 4 },
    { x: 75, y: 75, delay: 0.8, size: 3 },
    { x: 25, y: 80, delay: 1.1, size: 5 },
  ];

  return (
    <div className="group relative h-full w-full overflow-hidden rounded-xl border border-white/10 bg-[#0A0A0A] p-4 backdrop-blur-sm">
      <div className="absolute inset-0 bg-linear-to-br from-violet-500/10 via-transparent to-transparent opacity-50" />

      {/* Background Grid - subtle data texture with mask */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle at center, rgba(139, 92, 246, 0.3) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          maskImage:
            "radial-gradient(circle at center, black 40%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(circle at center, black 40%, transparent 100%)",
        }}
      />

      {/* Ambient Glow */}
      <motion.div
        animate={isActive ? { opacity: 0.5 } : { opacity: 0.2 }}
        transition={{ duration: 2 }}
        className="bg-radial-at-c absolute inset-0 from-violet-500/10 to-transparent"
      />

      {/* Central Insight Core */}
      <div className="absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
        {/* Outer Orbit Ring */}
        <motion.div
          animate={
            isActive ? { rotate: 360, opacity: 1 } : { rotate: 0, opacity: 0.5 }
          }
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-violet-500/20"
        />

        {/* Pulsing Aura */}
        <motion.div
          animate={
            isActive
              ? { scale: [1, 1.5, 1], opacity: 0.5 }
              : { scale: 0.8, opacity: 0.2 }
          }
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 rounded-full bg-violet-500/20 blur-xl"
        />

        {/* Core Sphere */}
        <motion.div
          initial={{ scale: 0 }}
          animate={isActive ? { scale: 1 } : { scale: 0 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="relative flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-white/5 shadow-2xl backdrop-blur-md"
        >
          <div className="h-6 w-6 rounded-full bg-gradient-to-tr from-violet-400 to-indigo-400 shadow-[0_0_20px_rgba(139,92,246,0.8)]" />
        </motion.div>
      </div>

      {/* Connecting Lines */}
      <svg className="pointer-events-none absolute inset-0 h-full w-full">
        <defs>
          <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(139, 92, 246, 0)" />
            <stop offset="50%" stopColor="rgba(139, 92, 246, 0.4)" />
            <stop offset="100%" stopColor="rgba(139, 92, 246, 0)" />
          </linearGradient>
        </defs>
        {nodes.map((node, i) => (
          <motion.line
            key={`line-${i}`}
            x1={`${node.x}%`}
            y1={`${node.y}%`}
            x2="50%"
            y2="50%"
            stroke="url(#line-gradient)"
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={
              isActive
                ? { pathLength: 1, opacity: 1 }
                : { pathLength: 0, opacity: 0 }
            }
            transition={{ duration: 1.5, delay: node.delay, ease: "easeInOut" }}
          />
        ))}
      </svg>

      {/* Floating Insight Nodes */}
      {nodes.map((node, i) => (
        <motion.div
          key={`node-${i}`}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${node.x}%`, top: `${node.y}%` }}
          initial={{ scale: 0, opacity: 0 }}
          animate={
            isActive ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }
          }
          transition={{ duration: 0.5, delay: node.delay - 0.2 }}
        >
          {/* Node Glow */}
          <div className="absolute inset-0 animate-pulse rounded-full bg-violet-400/30 blur-md" />

          <div
            className="relative rounded-full border border-violet-200 bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]"
            style={{ width: node.size * 2, height: node.size * 2 }}
          />

          {/* Abstract Data Label */}
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={
              isActive
                ? { opacity: 1, width: 30 + node.size * 4 }
                : { opacity: 0, width: 0 }
            }
            transition={{ duration: 0.5, delay: node.delay + 0.3 }}
            className="absolute top-full left-1/2 mt-2 h-0.5 rounded-full bg-gradient-to-r from-violet-500/50 to-transparent"
          />
        </motion.div>
      ))}

      {/* Scanning Beam */}
      <motion.div
        animate={isActive ? { rotate: 360 } : { rotate: 0 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        className="pointer-events-none absolute top-1/2 left-1/2 h-[150%] w-[150%] -translate-x-1/2 -translate-y-1/2 bg-[conic-gradient(from_0deg,transparent_0deg,rgba(139,92,246,0.1)_20deg,transparent_40deg)]"
      />
    </div>
  );
};

const DesignVisual = ({ isActive }: { isActive: boolean }) => (
  <div className="relative h-full w-full overflow-hidden rounded-xl border border-white/10 bg-[#0A0A0A] p-4 backdrop-blur-sm">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(236,72,153,0.15),transparent_60%)]" />

    {/* Abstract UI Composition */}
    <div className="relative flex h-full flex-col justify-center gap-4 px-2">
      {/* 1. Typography & Colors (Top Row) */}
      <div className="flex items-center justify-between">
        <motion.div
          animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex items-center gap-2 rounded-full border border-white/5 bg-white/5 px-3 py-1.5"
        >
          <div className="h-2 w-2 rounded-full bg-pink-500" />
          <div className="h-1.5 w-12 rounded-full bg-white/10" />
        </motion.div>

        <div className="flex -space-x-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={
                isActive
                  ? { opacity: 1, x: 0, scale: 1 }
                  : { opacity: 0, x: 10, scale: 0.8 }
              }
              transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
              className="h-6 w-6 rounded-full border border-black/50 bg-white/10 backdrop-blur-md"
              style={{
                backgroundColor:
                  i === 0
                    ? "rgba(236, 72, 153, 0.2)"
                    : i === 1
                      ? "rgba(168, 85, 247, 0.2)"
                      : "rgba(59, 130, 246, 0.2)",
                borderColor:
                  i === 0
                    ? "rgba(236, 72, 153, 0.5)"
                    : i === 1
                      ? "rgba(168, 85, 247, 0.5)"
                      : "rgba(59, 130, 246, 0.5)",
              }}
            />
          ))}
        </div>
      </div>

      {/* 2. Main Interface Card (Middle) */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 10 }}
        animate={
          isActive
            ? { scale: 1, opacity: 1, y: 0 }
            : { scale: 0.95, opacity: 0, y: 10 }
        }
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative overflow-hidden rounded-lg border border-white/10 bg-white/5 p-3 shadow-xl"
      >
        {/* Glass sheen */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-50" />

        <div className="flex gap-3">
          {/* Sidebar Mock */}
          <div className="hidden w-1/4 space-y-2 sm:block">
            <div className="h-1.5 w-8 rounded-full bg-white/10" />
            <div className="h-1.5 w-full rounded-full bg-white/5" />
            <div className="h-1.5 w-2/3 rounded-full bg-white/5" />
          </div>

          {/* Content Mock */}
          <div className="flex-1 space-y-2">
            <motion.div
              initial={{ width: "0%" }}
              animate={isActive ? { width: "100%" } : { width: "0%" }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="h-12 rounded-md bg-gradient-to-r from-pink-500/20 to-purple-500/20"
            />
            <div className="flex gap-2">
              <div className="h-8 w-1/2 rounded-md bg-white/5" />
              <div className="h-8 w-1/2 rounded-md bg-white/5" />
            </div>
          </div>
        </div>

        {/* Decor Elements */}
        <Layout className="absolute right-2 bottom-2 h-4 w-4 text-white/10" />
      </motion.div>

      {/* 3. Floating Tooltip/Cursor (Interaction) */}
      <motion.div
        initial={{ opacity: 0, y: 10, x: 10 }}
        animate={
          isActive ? { opacity: 1, y: 0, x: 0 } : { opacity: 0, y: 10, x: 10 }
        }
        transition={{ duration: 0.5, delay: 0.8, type: "spring" }}
        className="absolute right-4 bottom-8 flex items-center gap-2 rounded-full border border-pink-500/30 bg-pink-500/10 px-3 py-1.5 backdrop-blur-md"
      >
        <span className="text-[10px] font-medium text-pink-300">
          Pixel Perfect
        </span>
        <MousePointer2 className="h-3 w-3 fill-pink-500 text-pink-500" />
      </motion.div>
    </div>
  </div>
);

const BuildVisual = ({ isActive }: { isActive: boolean }) => (
  <div className="relative flex h-full w-full flex-col overflow-hidden rounded-xl border border-white/10 bg-[#0d1117] font-mono text-xs backdrop-blur-sm">
    {/* Window Header */}
    <div className="flex items-center justify-between border-b border-white/5 bg-white/5 px-4 py-2">
      <div className="flex gap-1.5">
        <div className="h-2.5 w-2.5 rounded-full bg-red-500/50" />
        <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/50" />
        <div className="h-2.5 w-2.5 rounded-full bg-green-500/50" />
      </div>
      <div className="flex items-center gap-2 rounded bg-white/5 px-2 py-0.5 text-[10px] text-white/60">
        <FileCode className="h-3 w-3" />
        <span>page.tsx</span>
      </div>
    </div>

    <div className="absolute inset-0 top-9 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:24px_24px]" />

    {/* Content */}
    <div className="relative flex-1 p-4 text-nowrap">
      <div className="space-y-1.5 text-blue-400/90">
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
          transition={{ delay: 0.2 }}
        >
          <span className="text-purple-400">export</span>{" "}
          <span className="text-purple-400">default</span>{" "}
          <span className="text-blue-400">function</span>{" "}
          <span className="text-yellow-200">Page</span>() {"{"}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isActive ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.3 }}
          className="pl-4"
        >
          <span className="text-purple-400">return</span> (
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 5 }}
          transition={{ delay: 0.5 }}
          className="pl-8"
        >
          {"<"}
          <span className="text-yellow-200">Suspense</span>
          {" fallback={<"}
          <span className="text-yellow-200">Loading</span>
          {" />}>"}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 5 }}
          transition={{ delay: 0.6 }}
          className="pl-12"
        >
          {"<"}
          <span className="text-blue-400">Landing</span>
          <span className="text-sky-300"> data</span>=
          <span className="text-orange-300">{"{data}"}</span>
          {" />"}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isActive ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.7 }}
          className="pl-8"
        >
          {"</"}
          <span className="text-yellow-200">Suspense</span>
          {">"}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isActive ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.8 }}
          className="pl-4"
        >
          )
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isActive ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.9 }}
        >
          {"}"}
        </motion.div>
      </div>
    </div>

    {/* Terminal / Status Bar */}
    <motion.div
      initial={{ y: "100%" }}
      animate={isActive ? { y: 0 } : { y: "100%" }}
      transition={{ delay: 1.2, type: "spring", stiffness: 100, damping: 20 }}
      className="border-t border-white/10 bg-black/40 p-2 backdrop-blur-md"
    >
      <div className="flex items-center justify-between text-[10px]">
        <div className="flex items-center gap-2 text-white/40">
          <Terminal className="h-3 w-3" />
          <span>Terminal</span>
        </div>
        <div className="flex items-center gap-1.5 text-blue-400">
          <motion.div
            initial={{ scale: 0 }}
            animate={isActive ? { scale: 1 } : { scale: 0 }}
            transition={{ delay: 1.4, type: "spring" }}
          >
            <Check className="h-3 w-3" />
          </motion.div>
          <motion.span
            initial={{ opacity: 0 }}
            animate={isActive ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 1.5 }}
          >
            Compiled in 142ms
          </motion.span>
        </div>
      </div>
    </motion.div>
  </div>
);

const LaunchVisual = ({ isActive }: { isActive: boolean }) => (
  <div className="relative h-full w-full overflow-hidden rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
    <div className="absolute inset-0 bg-linear-to-br from-emerald-500/10 via-transparent to-transparent opacity-50" />
    {/* Rocket Launch */}
    <div className="flex h-full flex-col items-center justify-center gap-4">
      <motion.div
        animate={isActive ? { y: -20, scale: 1.1 } : { y: 0, scale: 1 }}
        transition={{ duration: 2, ease: "easeInOut" }}
        className="relative"
      >
        <Rocket className="h-12 w-12 text-emerald-500" />
        <motion.div
          animate={
            isActive ? { height: 40, opacity: 1 } : { height: 0, opacity: 0 }
          }
          className="absolute top-full left-1/2 mt-1 w-1 -translate-x-1/2 rounded-full bg-linear-to-b from-emerald-500 to-transparent"
        />
      </motion.div>
      <div className="w-full space-y-2">
        <div className="flex justify-between text-xs text-white/50">
          <span>Deploying...</span>
          <span>100%</span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
          <motion.div
            initial={{ width: "0%" }}
            animate={isActive ? { width: "100%" } : { width: "0%" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="h-full bg-emerald-500"
          />
        </div>
      </div>
      <motion.div
        initial={{ scale: 0 }}
        animate={isActive ? { scale: 1 } : { scale: 0 }}
        transition={{ delay: 1.5, type: "spring" }}
        className="rounded-full border border-emerald-500/30 bg-emerald-500/20 px-3 py-1 text-xs font-medium text-emerald-400"
      >
        Live
      </motion.div>
    </div>
  </div>
);

const MaintenanceVisual = ({ isActive }: { isActive: boolean }) => (
  <div className="relative h-full w-full overflow-hidden rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
    <div className="absolute inset-0 bg-linear-to-br from-indigo-500/10 via-transparent to-transparent opacity-50" />

    {/* Content Container */}
    <div className="relative flex h-full flex-col">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
          <span className="text-xs font-medium text-white/70">
            System Normal
          </span>
        </div>
        <div className="flex items-center gap-1.5 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-2 py-0.5">
          <ShieldCheck className="h-3 w-3 text-indigo-400" />
          <span className="text-[10px] font-medium text-indigo-300">
            Protected
          </span>
        </div>
      </div>

      {/* Security Layer (Middle) */}
      <div className="relative flex flex-1 flex-col items-center justify-center">
        {/* Radar / Shield Animation */}
        <motion.div
          animate={
            isActive
              ? { scale: [1, 1.2, 1], opacity: 0.5 }
              : { scale: 0.8, opacity: 0.2 }
          }
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 rounded-full bg-indigo-500/5 blur-3xl"
        />
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={
            isActive ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }
          }
          transition={{ delay: 0.3, type: "spring" }}
          className="relative z-10 flex flex-col items-center gap-3"
        >
          <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-indigo-500/20 bg-indigo-500/10 shadow-[0_0_15px_rgba(99,102,241,0.3)] backdrop-blur-md">
            <ShieldCheck className="h-8 w-8 text-indigo-400" />
            {/* Scanning Ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full border-t border-indigo-400/50"
            />
          </div>
          <div className="flex flex-col items-center">
            <div className="text-xs font-medium text-indigo-200">
              Firewall Active
            </div>
            <div className="text-[10px] text-indigo-400/60">
              0 Threats Detected
            </div>
          </div>
        </motion.div>
      </div>

      {/* Graph (Bottom) - Taller */}
      <div className="relative mt-4 h-32 w-full overflow-hidden rounded-lg border border-white/5 bg-black/20">
        {/* Grid Lines */}
        <div className="absolute inset-0 flex flex-col justify-between p-3 opacity-20">
          <div className="w-full border-t border-dashed border-indigo-500/30" />
          <div className="w-full border-t border-dashed border-indigo-500/30" />
          <div className="w-full border-t border-dashed border-indigo-500/30" />
        </div>

        {/* Bars */}
        <div className="absolute inset-0 flex items-end gap-1 px-2 pb-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              animate={
                isActive
                  ? {
                      height: [
                        20 + ((i * 7) % 60) + "%",
                        40 + (((i + 2) * 9) % 50) + "%",
                        20 + ((i * 7) % 60) + "%",
                      ],
                    }
                  : { height: "20%" }
              }
              transition={{
                duration: 3 + (i % 3),
                repeat: Infinity,
                repeatType: "reverse",
                delay: i * 0.05,
                ease: "easeInOut",
              }}
              className="flex-1 rounded-t-sm bg-indigo-500/40 transition-colors hover:bg-indigo-400/60"
            />
          ))}
        </div>
      </div>
    </div>
  </div>
);

const processSteps = [
  {
    title: "Discovery",
    description:
      "Understanding your goals, audience, and what your website aims to achieve — before any design or development begins.",
    icon: Sparkles,
    visual: DiscoveryVisual,
    color: "#8b5cf6", // violet-500
    glow: "bg-violet-500",
  },
  {
    title: "Design",
    description:
      "We work closely together through short feedback loops, turning your ideas into clear structure, beautiful visuals, and intuitive user experiences.",
    icon: PenTool,
    visual: DesignVisual,
    color: "#ec4899", // pink-500
    glow: "bg-pink-500",
  },
  {
    title: "Build",
    description:
      "This is where you can step back while everything comes together behind the scenes. We handle the build, performance, and technical details — keeping you updated without overwhelming you.",
    icon: Code,
    visual: BuildVisual,
    color: "#3b82f6", // blue-500
    glow: "bg-blue-500",
  },
  {
    title: "Launch",
    description:
      "Once you've reviewed and are happy with the final result, we update DNS records and deploy the website to production.",
    icon: Rocket,
    visual: LaunchVisual,
    color: "#10b981", // emerald-500
    glow: "bg-emerald-500",
  },
  {
    title: "Monitoring & Maintenance",
    description:
      "The journey doesn’t end at launch as we continue to monitor, maintain*, and support your website to keep everything running smoothly.",
    icon: ShieldCheck,
    visual: MaintenanceVisual,
    color: "#6366f1", // indigo-500
    glow: "bg-indigo-500",
    disclaimer:
      "*Maintenance is provided under an ongoing maintenance agreement.",
  },
];

export function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"], // Track the entire section as it moves through viewport
  });

  const mobileContainerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: mobileProgress } = useScroll({
    target: mobileContainerRef,
    offset: ["start center", "end center"],
  });

  return (
    <section ref={containerRef} className="relative bg-black">
      <Container className="py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center"
        >
          <Header100 className="mb-6 text-white">
            {/* How we’ll bring your project to life */}
            What happens next?
          </Header100>
          <Body200 className="mx-auto max-w-2xl text-white/60">
            Clear communication is key to any successful partnership. We follow
            a transparent, structured process — so you always know what’s
            happening and what comes next. Every project moves through five
            clear stages, from discovery to launch and beyond.
          </Body200>
        </motion.div>

        {/* --- Desktop Timeline (Central Straight Line) --- */}
        <div className="relative hidden lg:block">
          {/* Central Line Container */}
          <div className="pointer-events-none absolute top-[40vh] bottom-[80vh] left-1/2 z-0 w-full -translate-x-1/2">
            <svg className="h-full w-full" preserveAspectRatio="none">
              <defs>
                <linearGradient
                  id="beam-gradient-moving"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor="#8b5cf6" />
                  <stop offset="25%" stopColor="#ec4899" />
                  <stop offset="50%" stopColor="#3b82f6" />
                  <stop offset="75%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#6366f1" />
                </linearGradient>

                <mask id="dash-mask">
                  <motion.line
                    x1="50%"
                    y1="0"
                    x2="50%"
                    y2="100%"
                    stroke="white"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeDasharray="80 400"
                    style={{
                      strokeDashoffset: useTransform(
                        scrollYProgress,
                        [0, 1],
                        [0, -3000], // Travels down as you scroll
                      ),
                    }}
                  />
                </mask>
              </defs>

              {/* Base Line */}
              <line
                x1="50%"
                y1="0"
                x2="50%"
                y2="100%"
                stroke="white"
                strokeOpacity="0.1"
                strokeWidth="1"
              />

              {/* Moving Lights - Using Mask for Robust Gradient Rendering */}
              <rect
                x="50%"
                y="0"
                width="3"
                height="100%"
                fill="url(#beam-gradient-moving)"
                mask="url(#dash-mask)"
                style={{ transform: "translateX(-1.5px)" }}
              />
            </svg>
          </div>

          {/* Process Steps */}
          <div className="flex flex-col">
            {processSteps.map((step, index) => (
              <ProcessStep
                key={index}
                step={step}
                index={index}
                isEven={index % 2 !== 0}
              />
            ))}
          </div>
        </div>

        {/* --- Mobile Timeline (Straight Line) --- */}
        <div ref={mobileContainerRef} className="relative lg:hidden">
          <div className="absolute top-8 bottom-20 left-6 w-px -translate-x-1/2 bg-white/10">
            {/* Full Height Gradient (Revealed via Clip Path) */}
            <motion.div
              style={{
                clipPath: useTransform(
                  mobileProgress,
                  [0, 1],
                  ["inset(0 0 100% 0)", "inset(0 0 0% 0)"],
                ),
              }}
              className="absolute inset-0 w-full bg-[linear-gradient(to_bottom,#8b5cf6_0%,#8b5cf6_10%,#ec4899_30%,#3b82f6_50%,#10b981_70%,#6366f1_90%,#6366f1_100%)]"
            />

            {/* Glowing Tip (Follows Progress) */}
            <motion.div
              style={{
                top: useTransform(mobileProgress, [0, 1], ["0%", "100%"]),
                opacity: useTransform(
                  mobileProgress,
                  [0, 0.05, 0.95, 1],
                  [0, 1, 1, 0],
                ), // Fade in/out at edges
              }}
              className="absolute left-1/2 z-20 -translate-x-1/2 -translate-y-1/2"
            >
              <div className="h-8 w-1 bg-white blur-md" />
              <div className="absolute top-1/2 left-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_10px_white]" />
            </motion.div>
          </div>
          <div className="space-y-16 pt-8 pb-20 md:pb-20">
            {processSteps.map((step, index) => (
              <ProcessStepMobile key={index} step={step} index={index} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

const ProcessStepMobile = ({
  step,
  index,
}: {
  step: (typeof processSteps)[0];
  index: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-20% 0px -20% 0px", once: true });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.6 },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      className="relative pl-18"
    >
      {/* Mobile Node (Centered Vertically on Step) */}
      <div className="absolute top-1/2 left-6 z-10 -translate-x-1/2 -translate-y-1/2">
        <motion.div
          animate={
            isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }
          }
          transition={{ duration: 0.3, delay: 0.1 }}
          className={`h-4 w-4 rounded-full ${step.glow} shadow-[0_0_15px_currentColor] ring-4 ring-black`}
          style={{ color: step.color }}
        />
        <motion.div
          animate={
            isInView
              ? { scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }
              : { opacity: 0 }
          }
          transition={{ duration: 2, repeat: Infinity }}
          className={`absolute inset-0 h-4 w-4 rounded-full ${step.glow}`}
        />
      </div>

      <div className="space-y-6">
        <div className="flex flex-col gap-4">
          {/* Icon and Number Row */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-4"
          >
            <div
              className={`flex h-14 w-14 items-center justify-center rounded-xl border border-white/10 bg-white/5 ${step.color.replace("text-", "text-")}`}
              style={{ color: step.color }}
            >
              <step.icon className="h-7 w-7" />
            </div>
            <span className="font-display text-5xl font-bold text-white/10">
              0{index + 1}
            </span>
          </motion.div>

          {/* Header */}
          <motion.div variants={itemVariants}>
            <Header200 className="text-2xl! font-bold text-white">
              {step.title}
            </Header200>
          </motion.div>
        </div>

        {/* Description */}
        <motion.div variants={itemVariants}>
          <Body100 className="leading-relaxed text-white/60">
            {step.description}
          </Body100>
          {step.disclaimer && (
            <p className="mt-2 text-xs text-white/40 italic">
              {step.disclaimer}
            </p>
          )}
        </motion.div>

        {/* Visual Card */}
        <motion.div
          variants={itemVariants}
          className="relative h-68 w-full overflow-hidden rounded-2xl border border-white/10 bg-black/40 shadow-2xl"
        >
          <step.visual isActive={isInView} />

          {/* Glass Overlay */}
          <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/10 ring-inset" />
        </motion.div>
      </div>
    </motion.div>
  );
};

const ProcessStep = ({
  step,
  index,
  isEven,
}: {
  step: (typeof processSteps)[0];
  index: number;
  isEven: boolean;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { margin: "-20% 0px -20% 0px" });

  return (
    <div ref={containerRef} className="relative h-[180vh] w-full">
      {" "}
      {/* Height controls the scroll distance/pause */}
      <div className="sticky top-[10vh] flex h-[80vh] items-center justify-center">
        <div
          className={`relative flex w-full items-center justify-between gap-20 ${isEven ? "flex-row-reverse" : ""}`}
        >
          {/* Central Node Indicator (Ambiguous/Blurred) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ margin: "-45% 0px -45% 0px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative flex items-center justify-center"
            >
              {/* Outer Ambiguous Glow */}
              <div
                className={`absolute h-12 w-12 rounded-full ${step.glow} opacity-40 blur-xl`}
              />
              {/* Middle Soft Glow */}
              <div
                className={`absolute h-6 w-6 rounded-full ${step.glow} opacity-80 blur-md`}
              />
              {/* Inner Core (Softer) */}
              <div className="h-2 w-2 rounded-full bg-white/90 shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
            </motion.div>
          </div>

          {/* Content Side */}
          <div className={`flex-1 ${isEven ? "text-right" : "text-left"}`}>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ margin: "-20% 0px -20% 0px" }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.15,
                    delayChildren: 0.2,
                  },
                },
              }}
              className="flex flex-col gap-6"
            >
              <div
                className={`flex items-center gap-4 ${isEven ? "flex-row-reverse" : ""}`}
              >
                <motion.div
                  variants={{
                    hidden: {
                      opacity: 0,
                      scale: 0.5,
                      rotate: -20,
                      filter: "blur(10px)",
                    },
                    visible: {
                      opacity: 1,
                      scale: 1,
                      rotate: 0,
                      filter: "blur(0px)",
                      transition: {
                        type: "spring",
                        stiffness: 200,
                        damping: 15,
                        mass: 0.8,
                        filter: {
                          type: "tween",
                          ease: "easeOut",
                        },
                      },
                    },
                  }}
                  className={`flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md ${step.color.replace("text-", "text-")}`}
                  style={{ color: step.color }}
                >
                  <step.icon className="h-8 w-8" />
                </motion.div>
                <motion.div
                  variants={{
                    hidden: {
                      opacity: 0,
                      x: isEven ? -20 : 20,
                      filter: "blur(8px)",
                    },
                    visible: {
                      opacity: 1,
                      x: 0,
                      filter: "blur(0px)",
                      transition: {
                        duration: 0.8,
                        ease: [0.2, 0.8, 0.2, 1],
                      },
                    },
                  }}
                >
                  <Display200 className="text-6xl font-bold text-white/10">
                    0{index + 1}
                  </Display200>
                </motion.div>
              </div>

              <div>
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
                    visible: {
                      opacity: 1,
                      y: 0,
                      filter: "blur(0px)",
                      transition: {
                        duration: 0.8,
                        ease: [0.2, 0.8, 0.2, 1],
                      },
                    },
                  }}
                >
                  <Header100 className="mb-4 text-white">
                    {step.title}
                  </Header100>
                </motion.div>
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
                    visible: {
                      opacity: 1,
                      y: 0,
                      filter: "blur(0px)",
                      transition: {
                        duration: 0.8,
                        ease: [0.2, 0.8, 0.2, 1],
                      },
                    },
                  }}
                >
                  <Body200 className="text-white/60">
                    {step.description}
                  </Body200>
                  {step.disclaimer && (
                    <p className="mt-2 text-xs text-white/40 italic">
                      {step.disclaimer}
                    </p>
                  )}
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Center Spacer for Path */}
          <div className="w-24 shrink-0" />

          {/* Visual Side */}
          <div
            className={`flex flex-1 ${isEven ? "justify-start" : "justify-end"}`}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              viewport={{ margin: "-20% 0px -20% 0px" }}
              transition={{ duration: 1.0, ease: [0.2, 0.8, 0.2, 1] }}
              className="relative aspect-square w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-black/50 shadow-2xl backdrop-blur-xl"
            >
              <step.visual isActive={isInView} />

              {/* Glow Effect from Path Connection */}
              <div
                className={`absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full blur-md ${step.glow} ${isEven ? "-right-2" : "-left-2"}`}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};
