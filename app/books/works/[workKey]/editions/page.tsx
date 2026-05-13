"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Layers, BookOpen, Hash, FileText, Calendar, Building2 } from "lucide-react";
import { useEditions } from "@/hooks/useEditions";
import { EditionSkeletonList } from "@/components/ui/PageSkeleton";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { EditionDTO } from "@/lib/types";

function normalizeKey(key?: string) {
  if (!key) return "";
  return key.replace(/^\/+/, "").replace(/^editions\//, "");
}

export default function WorkEditionsPage() {
  const params = useParams() as { workKey?: string };
  const rawKey = params?.workKey ?? "";
  const workKey = decodeURIComponent(rawKey).replace(/^\/+/, "");
  const { data, isLoading, isError } = useEditions(workKey);

  if (isLoading) return (
    <main className="mx-auto max-w-4xl px-4 sm:px-6 py-8">
      <div className="mb-6"><div className="h-8 w-48 rounded bg-muted animate-pulse" /></div>
      <EditionSkeletonList count={5} />
    </main>
  );
  if (isError) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-16 text-center">
        <p className="text-destructive text-lg">Không tải được danh sách ấn bản</p>
        <Link href={`/books/works/${encodeURIComponent(workKey)}`}>
          <Button variant="outline" className="mt-4">
            <ArrowLeft className="size-4 mr-2" />
            Quay lại
          </Button>
        </Link>
      </main>
    );
  }

  const editions: EditionDTO[] = data?.editions ?? [];

  return (
    <main className="mx-auto max-w-4xl px-4 sm:px-6 py-8">
      {/* Back */}
      <Link href={`/books/works/${encodeURIComponent(workKey)}`}>
        <Button variant="ghost" size="sm" className="mb-6 -ml-2">
          <ArrowLeft className="size-4 mr-1" />
          Quay lại
        </Button>
      </Link>

      <h1 className="text-3xl font-serif font-bold tracking-tight mb-2 flex items-center gap-3">
        <Layers className="size-7 text-primary" />
        Các ấn bản
      </h1>
      <p className="text-muted-foreground mb-8">
        {editions.length} ấn bản được tìm thấy
      </p>

      <div className="space-y-3">
        {editions.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <BookOpen className="size-12 mx-auto mb-4 opacity-40" />
            <p className="text-lg">Không có ấn bản nào</p>
          </div>
        ) : (
          editions.map((e, i) => {
            const editionKey = normalizeKey(e.editionKey);
            return (
              <motion.div
                key={editionKey}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05, duration: 0.3 }}
              >
                <Link
                  href={`/books/editions/${encodeURIComponent(editionKey)}`}
                  className="group flex items-center gap-4 rounded-xl border border-border/50 bg-card p-4 transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
                >
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <BookOpen className="size-5" />
                  </div>
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="font-semibold truncate">
                      {e.publishDate ?? editionKey}
                    </div>
                    <div className="flex flex-wrap gap-2 text-xs">
                      {e.publisherName && (
                        <span className="flex items-center gap-1 text-muted-foreground">
                          <Building2 className="size-3" />
                          {e.publisherName}
                        </span>
                      )}
                      {e.isbn && (
                        <span className="flex items-center gap-1 text-muted-foreground">
                          <Hash className="size-3" />
                          {e.isbn}
                        </span>
                      )}
                      {e.numberOfPages && (
                        <span className="flex items-center gap-1 text-muted-foreground">
                          <FileText className="size-3" />
                          {e.numberOfPages} trang
                        </span>
                      )}
                    </div>
                  </div>
                  <svg className="size-5 shrink-0 text-muted-foreground/30 group-hover:text-primary transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </Link>
              </motion.div>
            );
          })
        )}
      </div>
    </main>
  );
}
