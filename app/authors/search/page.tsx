"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Users } from "lucide-react";
import { useAuthorSearch } from "@/hooks/useAuthorSearch";
import { useDebounce } from "@/hooks/useDebounce";
import AuthorCard from "@/components/author/AuthorCard";
import { AuthorCardSkeletonGrid } from "@/components/ui/PageSkeleton";
import { Input } from "@/components/ui/input";



export default function AuthorsSearchPage() {
  const [q, setQ] = useState("");
  const debouncedQ = useDebounce(q, 800);
  const { data, isLoading, isFetching } = useAuthorSearch(debouncedQ, 0, 20);

  const authors = Array.isArray(data) ? data : (data as any)?.docs ?? [];

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-serif font-bold tracking-tight flex items-center gap-3">
          <Users className="size-8 text-primary" />
          Tìm kiếm tác giả
        </h1>
        <p className="mt-2 text-muted-foreground">
          Khám phá tiểu sử và tác phẩm của các tác giả trên thế giới
        </p>
      </div>

      {/* Search input */}
      <div className="relative mb-8 max-w-2xl">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
        <Input
          id="authors-search-input"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Nhập tên tác giả..."
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
        <AuthorCardSkeletonGrid count={6} />
      ) : debouncedQ ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {authors.length > 0 ? (
            <>
              <p className="text-sm text-muted-foreground mb-4">
                Tìm thấy {authors.length} tác giả cho &ldquo;{debouncedQ}&rdquo;
              </p>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {authors.map((a: any) => (
                  <AuthorCard key={a.id ?? a.olKey} author={a} />
                ))}
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
              <Users className="size-12 mb-4 opacity-40" />
              <p className="text-lg font-medium">Không tìm thấy tác giả nào</p>
              <p className="text-sm mt-1">Thử tìm kiếm với từ khóa khác</p>
            </div>
          )}
        </motion.div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
          <Search className="size-16 mb-4 opacity-20" />
          <p className="text-lg font-medium">Bắt đầu tìm kiếm</p>
          <p className="text-sm mt-1">Nhập tên tác giả để khám phá</p>
        </div>
      )}
    </main>
  );
}
