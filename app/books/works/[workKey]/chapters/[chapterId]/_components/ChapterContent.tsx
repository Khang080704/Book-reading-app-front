"use client";

import { ChapterDTO } from "@/lib/types";
import { motion, useScroll, useSpring } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  ChevronUp,
  Minus,
  Plus,
  Type,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChapterContentProps extends ChapterDTO {
  workKey: string;
}

const FONT_SIZE_KEY = "rb_chapter_font_size";
const FONT_FAMILY_KEY = "rb_chapter_font_family";

type FontFamily = "sans" | "serif";

const FONT_FAMILIES: Record<FontFamily, { label: string; className: string }> = {
  sans: { label: "Sans", className: "font-sans" },
  serif: { label: "Serif", className: "font-serif" },
};

function estimateReadingTime(text: string): number {
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

export default function ChapterContent({
  workKey,
  ...chapter
}: ChapterContentProps) {
  /* ───── Scroll progress ───── */
  const contentRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  /* ───── Reading preferences ───── */
  const [fontSize, setFontSize] = useState(18);
  const [fontFamily, setFontFamily] = useState<FontFamily>("serif");
  const [showSettings, setShowSettings] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Load saved preferences
  useEffect(() => {
    try {
      const savedSize = localStorage.getItem(FONT_SIZE_KEY);
      if (savedSize) setFontSize(Number(savedSize));
      const savedFont = localStorage.getItem(FONT_FAMILY_KEY);
      if (savedFont && (savedFont === "sans" || savedFont === "serif")) {
        setFontFamily(savedFont);
      }
    } catch {
      // ignore
    }
  }, []);

  // Persist preferences
  useEffect(() => {
    try {
      localStorage.setItem(FONT_SIZE_KEY, String(fontSize));
      localStorage.setItem(FONT_FAMILY_KEY, fontFamily);
    } catch {
      // ignore
    }
  }, [fontSize, fontFamily]);

  // Show/hide scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const changeFontSize = useCallback(
    (delta: number) => {
      setFontSize((prev) => Math.min(28, Math.max(14, prev + delta)));
    },
    []
  );

  const toggleFont = useCallback(() => {
    setFontFamily((prev) => (prev === "sans" ? "serif" : "sans"));
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const readingTime = useMemo(
    () => estimateReadingTime(chapter.content),
    [chapter.content]
  );

  const contentLines = useMemo(() => {
    return chapter.content.split("\n");
  }, [chapter.content]);

  return (
    <>
      {/* ═══════ Progress bar (fixed top) ═══════ */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] z-50 origin-left"
        style={{
          scaleX,
          background:
            "linear-gradient(90deg, var(--primary), var(--accent))",
        }}
      />

      <main
        ref={contentRef}
        className="relative min-h-screen pb-24"
      >
        {/* ═══════ Floating header ═══════ */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="sticky top-0 z-40 backdrop-blur-xl bg-background/80 border-b border-border/50"
        >
          <div className="mx-auto max-w-3xl px-4 sm:px-6 flex items-center justify-between h-14">
            {/* Back */}
            <Link href={`/books/works/${encodeURIComponent(workKey)}`}>
              <Button
                variant="ghost"
                size="sm"
                className="gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="size-4" />
                <span className="hidden sm:inline">Quay lại</span>
              </Button>
            </Link>

            {/* Center title — truncated */}
            <div className="flex-1 mx-4 text-center min-w-0">
              <p className="text-sm font-medium truncate text-muted-foreground">
                {chapter.title}
              </p>
            </div>

            {/* Settings toggle */}
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setShowSettings((prev) => !prev)}
            >
              <Type className="size-4" />
            </Button>
          </div>

          {/* ═══════ Settings panel ═══════ */}
          <motion.div
            initial={false}
            animate={{
              height: showSettings ? "auto" : 0,
              opacity: showSettings ? 1 : 0,
            }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden border-t border-border/30"
          >
            <div className="mx-auto max-w-3xl px-4 sm:px-6 py-3 flex items-center justify-center gap-6">
              {/* Font size controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => changeFontSize(-1)}
                  className="size-8 rounded-lg bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors text-foreground"
                  aria-label="Giảm cỡ chữ"
                >
                  <Minus className="size-3.5" />
                </button>
                <span className="text-sm font-medium w-8 text-center tabular-nums text-foreground">
                  {fontSize}
                </span>
                <button
                  onClick={() => changeFontSize(1)}
                  className="size-8 rounded-lg bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors text-foreground"
                  aria-label="Tăng cỡ chữ"
                >
                  <Plus className="size-3.5" />
                </button>
              </div>

              {/* Divider */}
              <div className="w-px h-6 bg-border" />

              {/* Font family toggle */}
              <div className="flex items-center gap-1.5">
                {(Object.keys(FONT_FAMILIES) as FontFamily[]).map((key) => (
                  <button
                    key={key}
                    onClick={() => setFontFamily(key)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                      fontFamily === key
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "bg-secondary text-muted-foreground hover:text-foreground"
                    } ${FONT_FAMILIES[key].className}`}
                  >
                    {FONT_FAMILIES[key].label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.header>

        {/* ═══════ Chapter content ═══════ */}
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          {/* Chapter heading area */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="pt-12 pb-8 text-center"
          >
            {/* Chapter number badge */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                duration: 0.5,
                delay: 0.3,
                type: "spring",
                stiffness: 200,
              }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6"
            >
              <BookOpen className="size-3.5" />
              Chương {chapter.order + 1}
            </motion.div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight leading-tight text-foreground">
              {chapter.title}
            </h1>

            {/* Reading meta */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center justify-center gap-3 mt-4 text-sm text-muted-foreground"
            >
              <span>~{readingTime} phút đọc</span>
            </motion.div>

            {/* Decorative divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="mx-auto mt-8 h-px w-24 bg-gradient-to-r from-transparent via-border to-transparent"
            />
          </motion.div>

          {/* Text content */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className={`pb-16 ${FONT_FAMILIES[fontFamily].className}`}
            style={{
              fontSize: `${fontSize}px`,
              lineHeight: 1.9,
            }}
          >
            <div className="text-foreground/90 leading-relaxed">
              {contentLines.map((line, index) => {
                if (line.trim() === "") {
                  return <br key={index} />;
                }
                return (
                  <p
                    key={index}
                    className="mb-4 last:mb-0"
                    style={{ textIndent: "2em" }}
                  >
                    {line}
                  </p>
                );
              })}
            </div>
          </motion.article>

          {/* ═══════ End-of-chapter marker ═══════ */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col items-center gap-4 pb-16"
          >
            <div className="flex items-center gap-3 text-muted-foreground/40">
              <div className="w-12 h-px bg-border" />
              <span className="text-xs font-medium tracking-widest uppercase">
                Hết chương
              </span>
              <div className="w-12 h-px bg-border" />
            </div>

            <Link href={`/books/works/${encodeURIComponent(workKey)}`}>
              <Button
                variant="outline"
                size="sm"
                className="gap-2 mt-4"
              >
                <ArrowLeft className="size-3.5" />
                Quay lại mục lục
              </Button>
            </Link>
          </motion.div>
        </div>
      </main>

      {/* ═══════ Scroll-to-top FAB ═══════ */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: showScrollTop ? 1 : 0,
          scale: showScrollTop ? 1 : 0.8,
          pointerEvents: showScrollTop ? "auto" : "none",
        }}
        transition={{ duration: 0.2 }}
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 z-50 size-10 rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/25 flex items-center justify-center hover:scale-110 transition-transform"
        aria-label="Lên đầu trang"
      >
        <ChevronUp className="size-5" />
      </motion.button>
    </>
  );
}