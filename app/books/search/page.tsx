"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Search, BookOpen } from "lucide-react";
import { useBooksSearch } from "@/hooks/useBooksSearch";
import { useDebounce } from "@/hooks/useDebounce";
import BookList from "@/components/book/BookList";
import { BookCardSkeletonGrid } from "@/components/ui/PageSkeleton";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";



export default function BooksSearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialQ = searchParams.get("q") ?? "";
  const [q, setQ] = useState(initialQ);
  const [page, setPage] = useState(1);
  const debouncedQ = useDebounce(q, 800);
  const limit = 20;

  const { data, isLoading, isFetching } = useBooksSearch(debouncedQ, page, limit);
  const books = data ?? [];

  // Update URL when search changes
  useEffect(() => {
    if (debouncedQ) {
      router.replace(`/books/search?q=${encodeURIComponent(debouncedQ)}`, { scroll: false });
    }
  }, [debouncedQ, router]);

  // Reset page when query changes
  useEffect(() => {
    setPage(1);
  }, [debouncedQ]);

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-serif font-bold tracking-tight flex items-center gap-3">
          <BookOpen className="size-8 text-primary" />
          Tìm kiếm sách
        </h1>
        <p className="mt-2 text-muted-foreground">
          Tìm kiếm theo tiêu đề, tác giả hoặc ISBN
        </p>
      </div>

      {/* Search input */}
      <div className="relative mb-8 max-w-2xl">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
        <Input
          id="books-search-input"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Nhập tiêu đề sách, tên tác giả, ISBN..."
          className="pl-11 h-12 text-base rounded-xl"
          autoFocus
        />
        {isFetching && (
          <div className="absolute right-3.5 top-1/2 -translate-y-1/2">
            <div className="size-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          </div>
        )}
      </div>

      {/* Results */}
      {isLoading && debouncedQ ? (
        <BookCardSkeletonGrid count={8} />
      ) : debouncedQ ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {books.length > 0 && (
            <p className="text-sm text-muted-foreground mb-4">
              Hiển thị {books.length} kết quả cho &ldquo;{debouncedQ}&rdquo;
            </p>
          )}
          <BookList books={books} />

          {/* Pagination */}
          {books.length >= limit && (
            <div className="flex items-center justify-center gap-3 mt-8">
              <Button
                variant="outline"
                size="sm"
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              >
                Trang trước
              </Button>
              <span className="text-sm text-muted-foreground px-3">Trang {page}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((p) => p + 1)}
              >
                Trang sau
              </Button>
            </div>
          )}
        </motion.div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
          <Search className="size-16 mb-4 opacity-20" />
          <p className="text-lg font-medium">Bắt đầu tìm kiếm</p>
          <p className="text-sm mt-1">Nhập từ khóa để tìm sách bạn yêu thích</p>
        </div>
      )}
    </main>
  );
}
