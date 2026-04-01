"use client";

import { useState, useEffect } from "react";
import * as LucideIcons from "lucide-react";
import { ArrowUpRight, Plus, ChevronDown, MoveRight } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { projectsData } from "@/data/projects";

export default function Portfolio() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const projects = Object.entries(projectsData).map(([slug, value]) => ({
    slug,
    ...value,
    category: value.category,
  }));

  const usefulProjects = projects.filter((p) => p.category === "useful");
  const amusementProjects = projects.filter((p) => p.category === "amusement");

  const renderAmusementRow = (project: (typeof projects)[0], idx: number) => {
    const isTarot = project.slug === "whisper-of-fate";
    const isAlias = project.slug === "alias-ai";
    const defaultTitleStyles = `font-bold text-4xl sm:text-6xl md:text-8xl transition-all duration-700 bg-gradient-to-r bg-clip-text text-transparent ${project.titleGradient}`;

    return (
      <Link
        key={project.slug}
        href={`/projects/${project.slug}`}
        className="group relative block border-b border-white/5 py-10 md:py-24"
      >
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 items-start md:items-center gap-6 md:gap-12">
          <div className="md:col-span-8 flex items-baseline gap-4 md:gap-8">
            <span className="text-indigo-500 font-mono text-[10px] md:text-sm opacity-40 italic">
              /0{idx + 1}
            </span>
            {isAlias ? (
              <h3 className="leading-none group-hover:scale-[1.02] transition-transform duration-500 origin-left pr-6">
                <span className="text-4xl sm:text-6xl md:text-9xl font-black tracking-tighter text-white uppercase italic">
                  Alias
                </span>
                <span className="text-4xl sm:text-6xl md:text-9xl font-black tracking-tighter text-red-600 uppercase italic ml-2 md:ml-4">
                  AI
                </span>
              </h3>
            ) : isTarot ? (
              <h3 className="text-4xl sm:text-6xl md:text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-white to-amber-400 leading-tight group-hover:scale-[1.02] transition-transform duration-500 origin-left pr-6">
                {project.title}
              </h3>
            ) : (
              <h3
                className={`${defaultTitleStyles} group-hover:scale-[1.02] origin-left pr-6`}
              >
                {project.title}
              </h3>
            )}
          </div>

          <div className="md:col-span-4 md:opacity-0 group-hover:opacity-100 transition-all duration-500 md:translate-y-4 group-hover:translate-y-0">
            <p className="font-ukraine font-medium text-gray-500 md:text-gray-400 text-sm md:text-lg leading-relaxed mb-4 md:mb-6 font-light line-clamp-2 md:line-clamp-none">
              {project.fullDescription}
            </p>
            <div className="flex items-center gap-2 text-white/40 group-hover:text-white transition-colors text-[10px] uppercase tracking-[0.2em]">
              <span>View Project</span>
              <ArrowUpRight className="w-3 h-3" />
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-indigo-600/5 -z-10 scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-bottom hidden md:block" />
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
          <div className="w-12 h-12 md:w-16 md:h-16 bg-white rounded-xl md:rounded-2xl flex items-center justify-center shadow-sm">
            <IconComponent className="w-6 h-6 md:w-8 md:h-8 text-black" />
          </div>
          <div className="p-2 rounded-full bg-black/5 group-hover:bg-black group-hover:text-white transition-colors">
            <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5" />
          </div>
        </div>

        <div>
          <h3
            className={`font-bold text-3xl md:text-4xl mb-3 md:mb-4 bg-gradient-to-r bg-clip-text text-transparent ${project.titleGradient}`}
          >
            {project.title}
          </h3>
          <p className="font-ukraine font-medium text-gray-600 text-sm md:text-base leading-relaxed line-clamp-3 mb-6 md:mb-8 font-medium">
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

  if (!mounted) return <div className="min-h-screen bg-[#050505]" />;

  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-indigo-500 selection:text-white overflow-x-hidden">
      <section className="min-h-[80vh] md:min-h-screen flex flex-col justify-center px-6 md:px-24 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-7xl mx-auto w-full relative z-10"
        >
          <div className="flex items-center gap-3 md:gap-4 mb-8 md:mb-12">
            <div className="w-8 md:w-12 h-[1px] bg-indigo-500" />
            <span className="font-mono text-[10px] md:text-xs tracking-[0.4em] uppercase text-indigo-500">
              Available 2026
            </span>
          </div>

          <div className="relative">
            {/* MOBILE TITLE */}
            <h1 className="md:hidden text-5xl sm:text-5xl font-black leading-[0.8] tracking-tighter mb-8 uppercase italic py-4 break-words">
              <span className="block text-white">Code</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20 block">
                Amusements
              </span>
            </h1>

            {/* DESKTOP TITLE */}
            <h1 className="hidden md:block text-7xl lg:text-8xl xl:text-9xl font-black leading-[0.85] tracking-tighter mb-12 uppercase italic py-4">
              <span className="block text-white">Code</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20 block">
                Amusements
              </span>
            </h1>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 md:gap-12">
            <p className="text-gray-500 text-lg md:text-2xl max-w-xl font-light leading-snug">
              Engineering digital value <br />
              <span className="text-white italic font-normal">
                and interactive joy
              </span>
              .
            </p>
            <ChevronDown className="w-6 h-6 text-gray-500 animate-bounce hidden md:block" />
          </div>
        </motion.div>
        <div className="absolute top-1/4 -right-20 w-64 h-64 bg-indigo-600/10 rounded-full blur-[100px] md:hidden" />
      </section>

      <section className="bg-[#050505] py-20 md:py-40 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 mb-16 md:mb-32 flex flex-col md:flex-row justify-between items-baseline gap-4">
          <h2 className="text-6xl md:text-9xl font-black tracking-tighter uppercase italic opacity-10 leading-none">
            Fun
          </h2>
          <p className="text-indigo-400 font-mono text-[10px] md:text-sm tracking-[0.3em] uppercase">
            / Digital Playground
          </p>
        </div>
        <div className="border-t border-white/5">
          {amusementProjects.map((p, i) => renderAmusementRow(p, i))}
        </div>
      </section>

      <section className="bg-white text-black py-24 md:py-40 rounded-t-[3rem] md:rounded-t-[6rem] relative z-10">
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
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12 md:gap-16">
          <div className="space-y-6 md:space-y-8">
            <h2 className="text-6xl md:text-9xl font-black tracking-tighter uppercase leading-[0.8]">
              Support <br /> the craft.
            </h2>
            <a
              href="https://t.me/yurii_av"
              target="_blank"
              rel="noopener noreferrer"
              className="group font-ukraine flex items-center gap-4 text-xl md:text-4xl font-light hover:text-indigo-600 transition-colors "
            >
              Ваші донати мотивують створювати
              <MoveRight className="group-hover:translate-x-4 transition-transform" />
            </a>
          </div>
          <div className="flex flex-row md:flex-col flex-wrap gap-6 md:gap-8 font-bold uppercase tracking-tighter text-lg md:text-2xl w-full md:w-auto">
            <Link href="#" className="hover:line-through">
              GitHub
            </Link>
            <Link href="#" className="hover:line-through">
              LinkedIn
            </Link>
            <Link href="#" className="hover:line-through">
              Threads
            </Link>
            <div className="font-mono text-[10px] tracking-[0.3em] opacity-30 pt-4 border-t border-black/5 w-full md:text-right">
              © 2026 KYIV / 50.4501° N
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
