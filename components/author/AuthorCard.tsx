"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import type { AuthorDTO } from "@/lib/types";

function normalizeKey(key?: string) {
  if (!key) return "";
  return key.replace(/^\/+/, "").replace(/^authors\//, "");
}

export default function AuthorCard({ author }: { author: AuthorDTO }) {
  const key = normalizeKey(author.olKey ?? author.id);
  const avatar = author.avatar ?? null;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -2 }}
      className="group rounded-xl border border-border/50 bg-card p-4 transition-shadow hover:shadow-xl hover:shadow-primary/5"
    >
      <Link href={`/authors/${encodeURIComponent(key)}`} className="flex items-center gap-4">
        {/* Avatar */}
        <div className="relative size-16 shrink-0 overflow-hidden rounded-full bg-muted ring-2 ring-border/50 group-hover:ring-primary/30 transition-all">
          {avatar ? (
            <Image
              src={avatar}
              alt={author.name}
              fill
              sizes="64px"
              className="object-cover"
            />
          ) : (
            <div className="flex size-full items-center justify-center text-2xl font-serif font-bold text-muted-foreground/60">
              {author.name?.charAt(0)?.toUpperCase() ?? "?"}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-base truncate group-hover:text-primary transition-colors">
            {author.name}
          </h3>
          {author.birthDay && (
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground mt-1">
              <Calendar className="size-3.5" />
              <span>{author.birthDay}</span>
            </div>
          )}
          {author.readCount > 0 && (
            <p className="text-xs text-muted-foreground mt-1">
              {author.readCount.toLocaleString()} lượt đọc
            </p>
          )}
        </div>

        {/* Arrow indicator */}
        <div className="shrink-0 text-muted-foreground/30 group-hover:text-primary transition-colors">
          <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </div>
      </Link>
    </motion.article>
  );
}
