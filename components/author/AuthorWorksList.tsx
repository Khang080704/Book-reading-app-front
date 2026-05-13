"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { WorkDTO } from "@/lib/types";
import { Badge } from "@/components/ui/badge";

function normalizeKey(key?: string) {
  if (!key) return "";
  return key.replace(/^\/+/, "").replace(/^works\//, "");
}

export default function AuthorWorksList({ works }: { works: WorkDTO[] }) {
  if (!works || works.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p>Chưa có tác phẩm nào</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 lg:gap-6">
      {works.map((w, i) => {
        const workKey = normalizeKey(w.workKey);
        return (
          <motion.article
            key={workKey}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05, duration: 0.3 }}
            whileHover={{ y: -4 }}
            className="group overflow-hidden rounded-xl border border-border/50 bg-card transition-shadow hover:shadow-xl hover:shadow-primary/5"
          >
            <Link href={`/books/works/${encodeURIComponent(workKey)}`} className="block">
              <div className="relative aspect-[2/3] w-full overflow-hidden bg-muted">
                {w.coverUrl ? (
                  <Image
                    src={w.coverUrl}
                    alt={w.title}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex size-full items-center justify-center text-muted-foreground">
                    <svg className="size-10 opacity-30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                )}
              </div>
              <div className="p-3 space-y-1.5">
                <h3 className="font-semibold text-sm leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                  {w.title}
                </h3>
                {w.description && (
                  <p className="text-xs text-muted-foreground line-clamp-2">{w.description}</p>
                )}
              </div>
            </Link>
          </motion.article>
        );
      })}
    </div>
  );
}
