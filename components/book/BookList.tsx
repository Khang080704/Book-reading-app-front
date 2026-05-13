"use client";

import React from "react";
import BookCard from "@/components/book/BookCard";
import type { SearchBookDTO } from "@/lib/types";
import { BookX } from "lucide-react";

export default function BookList({ books }: { books: SearchBookDTO[] }) {
  if (!books || books.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
        <BookX className="size-12 mb-4 opacity-40" />
        <p className="text-lg font-medium">Không tìm thấy sách nào</p>
        <p className="text-sm mt-1">Thử tìm kiếm với từ khóa khác</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 lg:gap-6">
      {books.map((b) => (
        <BookCard key={b.bookKey} book={b} />
      ))}
    </div>
  );
}
