"use client";

import { projectsData } from "@/data/projects";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Plus, MoveRight, ExternalLink } from "lucide-react";
import * as motion from "framer-motion/client";
import { use, useState, useEffect } from "react";

export default function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = use(params);
  const project = projectsData[
    resolvedParams.slug as keyof typeof projectsData
  ] as any;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!project) notFound();
  if (!mounted) return <div className="min-h-screen bg-[#050505]" />;

  const isTarot = resolvedParams.slug === "whisper-of-fate";
  const isAlias = resolvedParams.slug === "alias-ai";

  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-indigo-500 overflow-x-hidden">
      <nav className="fixed top-0 left-0 w-full z-50 p-6 md:p-10 mix-blend-difference">
        <Link
          href="/"
          className="group flex items-center gap-2 text-white/50 hover:text-white transition-colors font-mono text-[10px] md:text-xs uppercase tracking-[0.3em]"
        >
          <ArrowLeft
            size={14}
            className="group-hover:-translate-x-2 transition-transform"
          />
          Back
        </Link>
      </nav>

      <section className="pt-32 md:pt-48 pb-20 px-6 md:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end mb-16 md:mb-24">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="md:col-span-10"
            >
              <div className="flex items-center gap-4 mb-6 md:mb-8 text-indigo-500">
                <span className="font-mono text-[10px] md:text-xs tracking-[0.4em] uppercase">
                  {project.category}
                </span>
                <div className="w-8 h-[1px] bg-indigo-500/30" />
                <span className="font-mono text-[10px] md:text-xs tracking-[0.4em] uppercase">
                  {project.year}
                </span>
              </div>

              <div className="relative">
                {isAlias ? (
                  <h1 className="text-[clamp(3rem,12vw,10rem)] leading-[0.8] tracking-tighter font-black uppercase italic pr-4 w-fit">
                    <span className="text-white">Alias</span>
                    <span className="text-red-600 ml-2 md:ml-4">AI</span>
                  </h1>
                ) : isTarot ? (
                  <h1 className="text-[clamp(2.5rem,9vw,8rem)] font-extrabold leading-tight tracking-tighter uppercase italic pr-6 w-fit bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-white to-amber-400">
                    {project.title}
                  </h1>
                ) : (
                  <h1
                    className={`text-[clamp(3rem,10vw,9rem)] font-black leading-[0.85] tracking-tighter uppercase italic mb-4 pr-6 w-fit bg-gradient-to-r bg-clip-text text-transparent ${project.titleGradient}`}
                  >
                    {project.title}
                  </h1>
                )}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="md:col-span-2 flex md:justify-end"
            >
              <div className="px-4 py-2 border border-white/10 rounded-full font-mono text-[9px] uppercase tracking-widest text-white/40 whitespace-nowrap">
                {project.status}
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="aspect-video w-full bg-[#111] rounded-[2rem] md:rounded-[4rem] border border-white/5 mb-24 md:mb-40 overflow-hidden relative group"
          >
            {project.videoUrl ? (
              <video
                autoPlay
                loop
                muted
                playsInline
                controls={false}
                disablePictureInPicture 
                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-1000"
              >
                <source src={project.videoUrl} type="video/mp4" />
              </video>
            ) : (
              <>
                <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/5 via-transparent to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center opacity-20">
                  <Plus className="w-20 h-20 stroke-[0.5]" />
                </div>
              </>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            {project.demoUrl ? (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute font-ukraine font-bold bottom-6 right-6 md:bottom-12 md:right-12 bg-white text-black px-6 py-3 md:px-10 md:py-5 rounded-full font-bold text-xs md:text-sm flex items-center gap-3 hover:scale-105 transition-all active:scale-95 shadow-2xl z-20 group/demo"
              >
                Try it
                <ExternalLink
                  size={16}
                  className="group-hover/demo:rotate-12 transition-transform"
                />
              </a>
            ) : (
              <div className="absolute bottom-6 right-6 md:bottom-12 md:right-12 bg-white/10 backdrop-blur-md text-white/40 px-6 py-3 md:px-10 md:py-5 rounded-full font-bold text-xs md:text-sm border border-white/5 cursor-not-allowed">
                Demo Coming Soon
              </div>
            )}
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-24 mb-40">
            <div className="md:col-span-7">
              <h2 className="text-white/20 font-mono text-[10px] tracking-[0.4em] uppercase mb-10">
                / Overview
              </h2>
              <p className="font-ukraine font-medium text-2xl md:text-4xl font-light leading-snug text-gray-400">
                {project.fullDescription}
              </p>
            </div>

            <div className="md:col-span-5 space-y-16">
              <div>
                <h2 className="text-white/20 font-mono text-[10px] tracking-[0.4em] uppercase mb-8">
                  / Features
                </h2>
                <ul className="font-ukraine font-medium space-y-4">
                  {project.features.map((f: string, i: number) => (
                    <li
                      key={i}
                      className="flex items-center gap-4 text-lg border-b border-white/5 pb-4"
                    >
                      <span className="text-indigo-500 font-mono text-xs">
                        0{i + 1}
                      </span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="text-white/20 font-mono text-[10px] tracking-[0.4em] uppercase mb-8">
                  / Stack
                </h2>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((s: string) => (
                    <span
                      key={s}
                      className="px-3 py-1 bg-white/5 rounded-full border border-white/10 text-[10px] font-bold uppercase text-gray-400"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white text-black py-32 rounded-t-[3rem] md:rounded-t-[6rem]">
        <div className="max-w-7xl mx-auto px-6 md:px-24">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
            <div className="space-y-8">
              <h2 className="text-6xl md:text-[8vw] font-black tracking-tighter uppercase leading-[0.8] italic">
                Let's make <br /> it happen.
              </h2>
              <a
                href="https://t.me/yurii_av"
                target="_blank"
                rel="noopener noreferrer"
                className="group font-ukraine font-medium flex items-center gap-4 text-xl md:text-3xl font-light"
              >
                Ваші донати мотивують створювати
                <MoveRight className="group-hover:translate-x-4 transition-transform" />
              </a>
            </div>
            <div className="font-mono text-[10px] tracking-[0.3em] opacity-30 uppercase">
              © 2026 KYIV
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
