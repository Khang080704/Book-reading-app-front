"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, BookOpen, List, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import type { BookDetailDTO, ChapterDTO } from "@/lib/types";

interface ChaptersContentProps {
  workData: BookDetailDTO;
  workKey: string;
  chapters: ChapterDTO[];
  resourceId: string;
}

export default function ChaptersContent({
  workData,
  workKey,
  chapters,
  resourceId,
}: ChaptersContentProps) {
  return (
    <main className="mx-auto max-w-4xl px-4 sm:px-6 py-8">
      {/* Back button */}
      <Link href={`/books/works/${encodeURIComponent(workKey)}`}>
        <Button variant="ghost" size="sm" className="mb-6 -ml-2">
          <ArrowLeft className="size-4 mr-1" />
          Quay lại
        </Button>
      </Link>

      {/* Book summary header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-start gap-5 mb-8"
      >
        {/* Small cover thumbnail */}
        <div className="shrink-0">
          <div className="relative w-20 h-28 overflow-hidden rounded-xl bg-muted shadow-lg ring-1 ring-border/20">
            {workData.coverUrl ? (
              <Image
                src={workData.coverUrl}
                alt={workData.title ?? "Book cover"}
                fill
                sizes="80px"
                className="object-cover"
              />
            ) : (
              <div className="flex size-full items-center justify-center">
                <BookOpen className="size-8 text-muted-foreground/30" />
              </div>
            )}
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <h1 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight leading-tight">
            {workData.title ?? "Tác phẩm"}
          </h1>
          <p className="text-muted-foreground mt-1 flex items-center gap-2">
            <List className="size-4" />
            Mục lục · {chapters.length} chương
          </p>
        </div>
      </motion.div>

      <Separator className="mb-6" />

      {/* Chapters list */}
      <div className="space-y-2">
        {chapters.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 text-muted-foreground"
          >
            <FileText className="size-16 mx-auto mb-4 opacity-30" />
            <p className="text-lg font-medium">Chưa có chương nào</p>
            <p className="text-sm mt-1">
              Nội dung đang được cập nhật, vui lòng quay lại sau
            </p>
          </motion.div>
        ) : (
          chapters.map((chapter, index) => (
            <motion.div
              key={chapter.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.03, duration: 0.3 }}
            >
              <Link
                href={`/books/works/${workKey}/chapters/${chapter.id}`}
                className="group flex items-center gap-4 rounded-xl border border-border/50 bg-card p-4 transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 cursor-pointer"
              >
                {/* Chapter number indicator */}
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary font-semibold text-sm group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  {chapter.order + 1}
                </div>

                {/* Chapter info */}
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate group-hover:text-primary transition-colors">
                    {chapter.title}
                  </p>
                </div>

                {/* Arrow */}
                <svg
                  className="size-5 shrink-0 text-muted-foreground/30 group-hover:text-primary transition-colors"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </Link>
            </motion.div>
          ))
        )}
      </div>
    </main>
  );
}
