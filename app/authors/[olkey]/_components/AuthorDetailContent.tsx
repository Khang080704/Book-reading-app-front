"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, BookOpen, ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import AuthorWorksList from "@/components/author/AuthorWorksList";
import FavoriteAuthorButton from "@/components/author/FavoriteAuthorButton";
import type { AuthorDetailDTO, WorkDTO, Page } from "@/lib/types";
import { getAuthorWorksAction } from "@/actions/author.action";

interface AuthorDetailContentProps {
  detail: AuthorDetailDTO;
  initialWorksPage: Page<WorkDTO>;
  authorKey: string;
  isFavorite: boolean;
  isLoggedIn: boolean;
}

export default function AuthorDetailContent({
  detail,
  initialWorksPage,
  authorKey,
  isFavorite,
  isLoggedIn,
}: AuthorDetailContentProps) {
  const [worksPage, setWorksPage] = useState(initialWorksPage);
  const [isLoading, setIsLoading] = useState(false);
  const worksRef = useRef<HTMLDivElement>(null);

  const handlePageChange = async (newPage: number) => {
    setIsLoading(true);
    try {
      const pageIndex = newPage - 1; // backend uses 0-indexed page
      const res = await getAuthorWorksAction(authorKey, pageIndex, 20);
      setWorksPage(res);
      if (worksRef.current) {
        const y = worksRef.current.getBoundingClientRect().top + window.scrollY - 100;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const currentPage = worksPage.page.number + 1;
  const totalPages = worksPage.page.totalPages;

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
      {/* Back button */}
      <Link href="/authors/search">
        <Button variant="ghost" size="sm" className="mb-6 -ml-2">
          <ArrowLeft className="size-4 mr-1" />
          Quay lại
        </Button>
      </Link>

      {/* Author Hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="rounded-2xl bg-gradient-to-r from-primary/5 via-primary/10 to-accent/5 p-6 sm:p-8 mb-8"
      >
        <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
          {/* Avatar */}
          <div className="relative size-28 sm:size-36 shrink-0 overflow-hidden rounded-2xl bg-muted ring-4 ring-background shadow-xl">
            {detail?.avatar ? (
              <Image
                src={detail.avatar}
                alt={detail.fullName ?? "Author"}
                fill
                sizes="144px"
                className="object-cover"
              />
            ) : (
              <div className="flex size-full items-center justify-center text-4xl font-serif font-bold text-muted-foreground/50">
                {detail?.fullName?.charAt(0)?.toUpperCase() ?? "?"}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex-1 text-center sm:text-left">
            <h1 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight">
              {detail?.fullName ?? "Tác giả"}
            </h1>
            {detail?.birthDate && (
              <div className="flex items-center justify-center sm:justify-start gap-2 text-muted-foreground mt-2">
                <Calendar className="size-4" />
                <span>Sinh ngày: {detail.birthDate}</span>
              </div>
            )}

            {/* Favorite button */}
            {isLoggedIn && (
              <div className="mt-4">
                <FavoriteAuthorButton
                  authorKey={authorKey}
                  initialIsFavorite={isFavorite}
                />
              </div>
            )}
          </div>
        </div>

        {/* Bio */}
        {detail?.bio && (
          <div className="mt-6">
            <Separator className="mb-4" />
            <p className="text-muted-foreground leading-relaxed whitespace-pre-line max-w-3xl">
              {detail.bio}
            </p>
          </div>
        )}
      </motion.div>

      {/* Works section */}
      <section ref={worksRef}>
        <h2 className="text-2xl font-serif font-bold tracking-tight mb-6 flex items-center gap-3">
          <BookOpen className="size-6 text-primary" />
          Tác phẩm
          {worksPage.page.totalElements > 0 && (
            <span className="text-sm font-normal text-muted-foreground">
              ({worksPage.page.totalElements})
            </span>
          )}
        </h2>
        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="size-8 animate-spin text-primary" />
          </div>
        ) : (
          <AuthorWorksList works={worksPage.content} />
        )}

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-3 mt-8">
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage <= 1 || isLoading}
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
            >
              Trang trước
            </Button>
            <span className="text-sm text-muted-foreground px-3">
              Trang {currentPage} / {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage >= totalPages || isLoading}
              onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
            >
              Trang sau
            </Button>
          </div>
        )}
      </section>
    </main>
  );
}
