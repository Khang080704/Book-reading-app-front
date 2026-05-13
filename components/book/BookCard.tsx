"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import { Calendar, Layers } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { SearchBookDTO } from "@/lib/types";

function normalizeKey(key?: string) {
  if (!key) return "";
  return key.replace(/^\/+/, "").replace(/^works\//, "").replace(/^editions\//, "");
}

export default function BookCard({ book }: { book: SearchBookDTO }) {
  const workKey = normalizeKey(book.bookKey);
  const cover = book.coverUrl ?? null;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -4 }}
      className="group overflow-hidden rounded-xl border border-border/50 bg-card transition-shadow hover:shadow-xl hover:shadow-primary/5"
    >
      <Link href={`/books/works/${encodeURIComponent(workKey)}`} className="block">
        {/* Cover */}
        <div className="relative aspect-[2/3] w-full overflow-hidden bg-muted">
          {cover ? (
            <Image
              src={cover}
              alt={book.title}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex size-full items-center justify-center text-muted-foreground">
              <svg className="size-12 opacity-30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          )}
          {/* Gradient overlay */}
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
        </div>

        {/* Info */}
        <div className="p-3 sm:p-4 space-y-2">
          <h3 className="font-semibold text-sm sm:text-base leading-snug line-clamp-2 group-hover:text-primary transition-colors">
            {book.title}
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground line-clamp-1">
            {(book.authorNames || []).join(", ") || "Không rõ tác giả"}
          </p>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {book.firstPublishYear && (
              <Badge variant="secondary" className="gap-1 text-xs">
                <Calendar className="size-3" />
                {book.firstPublishYear}
              </Badge>
            )}
            {book.editionCount > 0 && (
              <Badge variant="outline" className="gap-1 text-xs">
                <Layers className="size-3" />
                {book.editionCount} ấn bản
              </Badge>
            )}
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
