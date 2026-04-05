"use client";

import { useState, useEffect } from "react";
import * as LucideIcons from "lucide-react";
import { ArrowUpRight, MoveRight, Plus } from "lucide-react";
import { motion, useMotionValue, useSpring, type Variants } from "framer-motion";
import Link from "next/link";
import { projectsData } from "@/data/projects";

const MARQUEE_ITEMS = [
  "Next.js", "TypeScript", "Tailwind", "Framer Motion",
  "OpenAI", "Vercel", "React", "Node.js", "Stripe", "Figma",
];

function Marquee() {
  const [duration, setDuration] = useState(20);

  useEffect(() => {
    const handleResize = () => {
      setDuration(window.innerWidth < 768 ? 4 : 20);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  return (
    <div className="relative overflow-hidden bg-white py-4 select-none mx-[-1.5rem] md:mx-[-6rem] w-[calc(100%+3rem)] md:w-[calc(100%+12rem)]">
      <motion.div
        key={duration}
        className="flex gap-12 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          duration: duration,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {items.map((item, i) => (
          <span key={i} className="flex items-center gap-12">
            <span className="font-mono text-[11px] tracking-[0.3em] uppercase text-black font-bold md:text-[16px]">
              {item}
            </span>
            <span className="text-black/20 text-xs">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

function CursorGlow() {
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const springX = useSpring(x, { stiffness: 80, damping: 20 });
  const springY = useSpring(y, { stiffness: 80, damping: 20 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  return (
    <motion.div
      className="pointer-events-none fixed z-0 w-[600px] h-[600px] rounded-full"
      style={{
        x: springX,
        y: springY,
        translateX: "-50%",
        translateY: "-50%",
        background:
          "radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%)",
      }}
    />
  );
}

const staggerContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};
const staggerItem: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function Portfolio() {
  const [mounted, setMounted] = useState(false);
  const [projectCount, setProjectCount] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  const projects = Object.entries(projectsData).map(([slug, value]) => ({
    slug,
    ...value,
    category: value.category,
  }));

  useEffect(() => {
    if (!mounted) return;
    let frame: number;
    const target = projects.length;
    let current = 0;
    const step = () => {
      current += 1;
      setProjectCount(current);
      if (current < target) frame = requestAnimationFrame(step);
    };
    const timeout = setTimeout(() => {
      frame = requestAnimationFrame(step);
    }, 800);
    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(frame);
    };
  }, [mounted, projects.length]);

  const usefulProjects = projects.filter((p) => p.category === "useful");
  const amusementProjects = projects.filter((p) => p.category === "amusement");
  const ecommerceProjects = projects.filter((p) => p.category === "e-commerce");

  const renderAmusementRow = (project: (typeof projects)[0], idx: number) => {
    const isTarot = project.slug === "whisper-of-fate";
    const isAlias = project.slug === "alias-ai";
    const isThreads = project.slug === "top-threads";

    return (
      <Link
        key={project.slug}
        href={`/projects/${project.slug}`}
        className="group relative bg-[#050505] hover:bg-white/[0.02] transition-all duration-700 overflow-hidden block"
      >
        <div className="max-w-7xl mx-auto px-6 py-12 md:py-24 grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-7 flex items-baseline gap-6 md:gap-10">
            <span className="text-indigo-500 font-mono text-[10px] md:text-sm opacity-40 italic">
              {String(idx + 1).padStart(2, "0")}
            </span>
            <div className="space-y-4">
              {isAlias ? (
                <h3 className="leading-none group-hover:translate-x-4 transition-transform duration-700">
                  <span className="text-5xl md:text-8xl font-black tracking-tight text-white uppercase italic">
                    Alias
                  </span>
                  <span className="text-5xl md:text-8xl font-black tracking-tight text-red-600 uppercase italic ml-2 md:ml-4">
                    AI
                  </span>
                </h3>
              ) : isTarot ? (
                <h3 className="text-5xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-white to-amber-400 leading-tight uppercase italic group-hover:translate-x-4 transition-transform duration-700">
                  {project.title}
                </h3>
              ) : isThreads ? (
                <h3 className="leading-none group-hover:translate-x-4 transition-transform duration-700 uppercase">
                  <span className="text-5xl md:text-8xl font-black tracking-tight text-white italic">
                    Top
                  </span>
                  <br />
                  <span className="text-5xl md:text-8xl font-black tracking-tight text-sky-400 italic">
                    Threads
                  </span>
                </h3>
              ) : (
                <h3
                  className={`text-5xl md:text-8xl font-black tracking-tight uppercase italic bg-gradient-to-r bg-clip-text text-transparent ${project.titleGradient} group-hover:translate-x-4 transition-transform duration-700`}
                >
                  {project.title}
                </h3>
              )}
              <div className="flex flex-wrap gap-3 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">
                {project.stack.map((s) => (
                  <span
                    key={s}
                    className="text-[9px] font-bold border border-indigo-500/20 text-indigo-400 px-3 py-1 rounded-full uppercase"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="md:col-span-5 space-y-8">
            <p className="text-gray-500 text-sm md:text-lg font-light leading-relaxed group-hover:text-gray-300 transition-colors font-ukraine">
              {project.fullDescription}
            </p>
            <div className="relative h-px w-full bg-white/5 overflow-hidden">
              <motion.div
                initial={{ x: "-100%" }}
                whileInView={{ x: "0%" }}
                transition={{ duration: 1 }}
                className="absolute inset-0 bg-indigo-500/50"
              />
            </div>
            <div className="flex items-center gap-4 text-white font-bold text-[10px] uppercase tracking-widest">
              <span>View Project</span>
              <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300">
                <ArrowUpRight size={14} />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/10 blur-[150px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
      </Link>
    );
  };

  const renderUsefulCard = (project: (typeof projects)[0]) => {
    const IconComponent =
      (LucideIcons as any)[
        project.slug === "ai-fixer" ? "Brain" : "ShieldCheck"
      ] || LucideIcons.Code2;

    return (
      <Link
        key={project.slug}
        href={`/projects/${project.slug}`}
        className="group relative bg-[#f5f5f7] rounded-[2rem] md:rounded-[3rem] p-8 md:p-10 min-h-[380px] md:h-[500px] flex flex-col justify-between overflow-hidden border border-black/5 hover:shadow-2xl transition-all duration-700"
      >
        <div className="flex justify-between items-start">
          <div className="w-12 h-12 md:w-16 md:h-16 bg-white rounded-xl md:rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-500">
            <IconComponent className="w-6 h-6 md:w-8 md:h-8 text-black" />
          </div>
          <div className="p-2 rounded-full bg-black/5 group-hover:bg-black group-hover:text-white transition-colors duration-300">
            <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5 group-hover:rotate-45 transition-transform duration-300" />
          </div>
        </div>
        <div>
          <h3
            className={`font-bold text-3xl md:text-4xl mb-3 md:mb-4 bg-gradient-to-r bg-clip-text text-transparent ${project.titleGradient}`}
          >
            {project.title}
          </h3>
          <p className="font-ukraine text-gray-600 text-sm md:text-base leading-relaxed line-clamp-3 mb-6 md:mb-8">
            {project.fullDescription}
          </p>
          <div className="flex flex-wrap gap-2">
            {project.stack.map((s) => (
              <span
                key={s}
                className="text-[8px] md:text-[9px] font-bold uppercase tracking-tighter px-2 md:px-3 py-1 bg-white rounded-full border border-black/5 text-gray-500"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </Link>
    );
  };

  const renderEcommerceRow = (project: (typeof projects)[0], idx: number) => (
    <Link
      key={project.slug}
      href={`/projects/${project.slug}`}
      className="group relative bg-[#050505] hover:bg-emerald-500/[0.02] transition-all duration-700 overflow-hidden block"
    >
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-24 grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        <div className="md:col-span-7 flex items-baseline gap-6 md:gap-10">
          <span className="text-emerald-500 font-mono text-[10px] md:text-sm opacity-40">
            {String(idx + 1).padStart(2, "0")}
          </span>
          <div className="space-y-4">
            <h3 className="text-5xl md:text-8xl font-black tracking-tight uppercase italic group-hover:translate-x-4 transition-transform duration-700">
              {project.title.split("").map((char, i) => (
                <span
                  key={i}
                  className={
                    i >= project.title.length - 5
                      ? "text-emerald-500"
                      : "text-white"
                  }
                >
                  {char}
                </span>
              ))}
            </h3>
            <div className="flex flex-wrap gap-3 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">
              {project.stack.map((s) => (
                <span
                  key={s}
                  className="text-[9px] font-bold border border-emerald-500/20 text-emerald-500 px-3 py-1 rounded-full uppercase"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="md:col-span-5 space-y-8">
          <p className="text-gray-500 text-sm md:text-lg font-light leading-relaxed group-hover:text-gray-300 transition-colors font-ukraine">
            {project.fullDescription}
          </p>
          <div className="relative h-px w-full bg-white/5 overflow-hidden">
            <motion.div
              initial={{ x: "-100%" }}
              whileInView={{ x: "0%" }}
              transition={{ duration: 1 }}
              className="absolute inset-0 bg-emerald-500/50"
            />
          </div>
          <div className="flex items-center gap-4 text-white font-bold text-[10px] uppercase tracking-widest">
            <span>View Case Study</span>
            <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300">
              <ArrowUpRight size={14} />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/10 blur-[150px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
    </Link>
  );

  if (!mounted) return <div className="min-h-screen bg-[#050505]" />;

  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-indigo-500 selection:text-white overflow-x-hidden">
      <CursorGlow />

      <section className="min-h-screen flex flex-col justify-between px-6 md:px-24 pt-24 md:pt-40 pb-0 relative">

        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-7xl mx-auto w-full flex items-center justify-between"
        >
          <div className="flex items-center gap-3 md:gap-4">
            <div className="w-8 md:w-12 h-px bg-indigo-500" />
            <span className="font-mono text-[10px] md:text-xs tracking-[0.4em] uppercase text-indigo-500">
              Available 2026
            </span>
          </div>
          <div className="text-right hidden md:block">
            <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/20 mb-1">
              Projects
            </div>
            <div className="font-black text-4xl text-white/10 tabular-nums">
              {String(projectCount).padStart(2, "0")}
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="max-w-7xl mx-auto w-full relative z-10 flex-1 flex flex-col justify-center py-16 md:py-0"
        >
          <h1 className="text-[clamp(2rem,11vw,7rem)] font-black leading-[0.82] tracking-tighter uppercase italic overflow-hidden md:text-[clamp(2rem,12vw,9rem)]">
            <motion.span variants={staggerItem} className="block text-white">
              Code
            </motion.span>
            <motion.span
              variants={staggerItem}
              className="block text-transparent bg-clip-text bg-gradient-to-b from-white to-white/15"
            >
              Amusements
            </motion.span>
          </h1>

          <motion.div
            variants={staggerItem}
            className="mt-12 md:mt-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-8"
          >
            <p className="text-gray-500 text-lg md:text-2xl max-w-lg font-light leading-snug">
              Engineering digital value {" "}
              <br />
              <span className="text-white italic">and interactive joy</span>.
            </p>

            <div className="flex gap-8 md:gap-12">
              {[
                { label: "Apps", value: `${projects.length}+` },
                { label: "Stack", value: "Full" },
                { label: "Year", value: "2026" },
              ].map(({ label, value }) => (
                <div key={label} className="text-right">
                  <div className="font-black text-xl md:text-3xl text-white/80">
                    {value}
                  </div>
                  <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-white/25 mt-1">
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <Marquee />
        </motion.div>
      </section>

      <section className="bg-[#050505] pt-24 md:pt-40 pb-0 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 mb-16 md:mb-24 flex flex-col md:flex-row justify-between items-baseline gap-4">
          <div className="flex items-baseline gap-6">
            <h2 className="text-6xl md:text-9xl font-black tracking-tighter uppercase italic opacity-10 leading-none">
              Fun
            </h2>
            <span className="font-mono text-[10px] text-white/15 tracking-widest">
              [{amusementProjects.length}]
            </span>
          </div>
          <p className="text-indigo-400 font-mono text-[10px] md:text-sm tracking-[0.3em] uppercase">
            / Digital Playground
          </p>
        </div>
        <div className="flex flex-col gap-px bg-white/5 border-t border-white/5">
          {amusementProjects.map((p, i) => renderAmusementRow(p, i))}
        </div>
      </section>

      <section className="bg-[#050505] pt-24 md:pt-40 pb-0 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 mb-16 md:mb-24 flex flex-col md:flex-row justify-between items-baseline gap-4">
          <div className="flex items-baseline gap-6">
            <h2 className="text-4xl md:text-8xl font-black tracking-tighter uppercase italic opacity-10 leading-none">
              e-commerce
            </h2>
            <span className="font-mono text-[10px] text-white/15 tracking-widest">
              [{ecommerceProjects.length}]
            </span>
          </div>
          <p className="text-emerald-500 font-mono text-[10px] md:text-sm tracking-[0.3em] uppercase">
            / Digital Commerce &amp; Physical Goods
          </p>
        </div>
        <div className="flex flex-col gap-px bg-white/5 border-t border-white/5">
          {ecommerceProjects.map((p, i) => renderEcommerceRow(p, i))}
        </div>
      </section>

      <section className="bg-white text-black py-24 md:py-40 rounded-t-[3rem] md:rounded-t-[6rem] relative z-10 shadow-[0_-80px_120px_rgba(0,0,0,0.6)] mt-24 md:mt-40">
        <div className="max-w-7xl mx-auto px-6 mb-16 md:mb-24">
          <div className="flex items-center justify-between border-b border-black/10 pb-8 md:pb-12">
            <div>
              <h2 className="text-5xl md:text-8xl font-bold tracking-tighter uppercase mb-2 md:mb-4">
                Utility
              </h2>
              <p className="text-gray-400 font-mono text-[10px] md:text-xs tracking-widest uppercase italic">
                Production Ready Tools
              </p>
            </div>
            <Plus className="w-8 h-8 md:w-12 md:h-12 text-black/10" />
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {usefulProjects.map((p) => renderUsefulCard(p))}
        </div>
      </section>

      <footer className="bg-white text-black py-20 md:py-32 px-6 md:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="border-b border-black/10 pb-16 md:pb-24 mb-12 md:mb-16">
            <h2 className="text-6xl md:text-[10rem] font-black tracking-tighter uppercase italic leading-[0.82] mb-8 md:mb-12">
              Support<br />
              <span className="text-black/10">the craft.</span>
            </h2>
            <a
              href="https://yurii-avramets.diaka.ua/amusements"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-4 text-lg md:text-3xl font-light text-gray-400 hover:text-black transition-colors duration-300 font-ukraine"
            >
              Ваші донати мотивують створювати
              <span className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center group-hover:bg-black group-hover:text-white group-hover:border-black transition-all duration-300">
                <MoveRight size={16} />
              </span>
            </a>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
            <div className="flex flex-row flex-wrap gap-6 md:gap-10 font-black uppercase tracking-tighter text-lg md:text-2xl">
              {["GitHub", "LinkedIn", "Threads"].map((link) => (
                <Link
                  key={link}
                  href="#"
                  className="group relative overflow-hidden block h-[1.2em]"
                >
                  <span className="block group-hover:-translate-y-full transition-transform duration-300">
                    {link}
                  </span>
                  <span className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 text-indigo-500">
                    {link}
                  </span>
                </Link>
              ))}
            </div>
            <div className="font-mono text-[10px] tracking-[0.3em] opacity-30">
              © 2026 KYIV / 50.4501° N
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}