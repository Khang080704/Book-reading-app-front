"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, BookOpen, Layers, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import FavoriteWorkButton from "@/components/book/FavoriteWorkButton";
import type { BookDetailDTO } from "@/lib/types";

function normalizeAuthorKey(key: string) {
  return key.replace(/^\/+/, "").replace(/^authors\//, "");
}

interface WorkDetailContentProps {
  data: BookDetailDTO;
  workKey: string;
  isFavorite: boolean;
  isLoggedIn: boolean;
}

export default function WorkDetailContent({
  data,
  workKey,
  isFavorite,
  isLoggedIn,
}: WorkDetailContentProps) {
  return (
    <main className="mx-auto max-w-5xl px-4 sm:px-6 py-8">
      {/* Back button */}
      <Link href="/books/search">
        <Button variant="ghost" size="sm" className="mb-6 -ml-2">
          <ArrowLeft className="size-4 mr-1" />
          Quay lại
        </Button>
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col md:flex-row gap-8"
      >
        {/* Cover */}
        <div className="shrink-0 mx-auto md:mx-0">
          <div className="relative w-52 h-80 overflow-hidden rounded-2xl bg-muted shadow-2xl ring-1 ring-border/20">
            {data?.coverUrl ? (
              <Image
                src={data.coverUrl}
                alt={data.title ?? "Book cover"}
                fill
                sizes="208px"
                className="object-cover"
                priority
              />
            ) : (
              <div className="flex size-full items-center justify-center">
                <BookOpen className="size-16 text-muted-foreground/30" />
              </div>
            )}
          </div>
        </div>

        {/* Details */}
        <div className="flex-1 min-w-0">
          <h1 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight leading-tight">
            {data?.title ?? "Tác phẩm"}
          </h1>

          {/* Author links */}
          {data?.authorKeys && data.authorKeys.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 mt-3">
              <User className="size-4 text-muted-foreground" />
              {data.authorKeys.map((authorKey) => {
                const key = normalizeAuthorKey(authorKey);
                return (
                  <Link key={authorKey} href={`/authors/${encodeURIComponent(key)}`}>
                    <Badge variant="secondary" className="cursor-pointer hover:bg-primary/10 transition-colors">
                      {key}
                    </Badge>
                  </Link>
                );
              })}
            </div>
          )}

          {data?.description && (
            <>
              <Separator className="my-6" />
              <div>
                <h2 className="text-lg font-semibold mb-3">Mô tả</h2>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                  {data.description}
                </p>
              </div>
            </>
          )}

          <Separator className="my-6" />

          {/* Actions */}
          <div className="flex flex-wrap gap-3">
            {isLoggedIn && (
              <FavoriteWorkButton
                workKey={workKey}
                initialIsFavorite={isFavorite}
              />
            )}
            <Link href={`/books/works/${encodeURIComponent(workKey)}/editions`}>
              <Button size="lg" className="rounded-xl">
                <Layers className="size-4 mr-2" />
                Xem các ấn bản
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
