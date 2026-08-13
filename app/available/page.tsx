"use client";

import React from "react";
import { motion } from "framer-motion";
import { BookOpen, Library, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getAvailableBooksAction } from "@/actions/book.action";
import BookList from "@/components/book/BookList";
import { BookCardSkeletonGrid } from "@/components/ui/PageSkeleton";
import type { SearchBookDTO } from "@/lib/types";

export default function AvailableBooksPage() {
  const { data, isLoading, isError } = useQuery<SearchBookDTO[]>({
    queryKey: ["available-books"],
    queryFn: () => getAvailableBooksAction(),
  });

  const books = data ?? [];

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-serif font-bold tracking-tight flex items-center gap-3">
          <Library className="size-8 text-primary" />
          Sách sẵn có
        </h1>
        <p className="mt-2 text-muted-foreground">
          Danh sách các sách hiện có trên hệ thống, sẵn sàng để đọc
        </p>
      </motion.div>

      {/* Content */}
      {isLoading ? (
        <BookCardSkeletonGrid count={12} />
      ) : isError ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-20 text-muted-foreground"
        >
          <BookOpen className="size-16 mb-4 opacity-20" />
          <p className="text-lg font-medium">Không thể tải danh sách sách</p>
          <p className="text-sm mt-1">Vui lòng thử lại sau</p>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {books.length > 0 && (
            <p className="text-sm text-muted-foreground mb-4">
              {books.length} sách đang có sẵn
            </p>
          )}
          <BookList books={books} />
        </motion.div>
      )}
    </main>
  );
}
