"use client";

import React, { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Search, BookOpen, Users, TrendingUp, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
  }),
};

const features = [
  {
    icon: BookOpen,
    title: "Thư viện khổng lồ",
    description: "Truy cập hàng triệu đầu sách từ Open Library, miễn phí hoàn toàn.",
  },
  {
    icon: Search,
    title: "Tìm kiếm thông minh",
    description: "Tìm sách theo tiêu đề, tác giả, ISBN với tốc độ cực nhanh.",
  },
  {
    icon: Users,
    title: "Khám phá tác giả",
    description: "Tìm hiểu tiểu sử và toàn bộ tác phẩm của hàng triệu tác giả.",
  },
  {
    icon: TrendingUp,
    title: "Theo dõi tiến độ",
    description: "Quản lý danh sách đọc và theo dõi hành trình tri thức của bạn.",
  },
];

export default function Home() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const q = searchQuery.trim();
      if (q) {
        router.push(`/books/search?q=${encodeURIComponent(q)}`);
      }
    },
    [searchQuery, router]
  );

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 size-80 rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute top-20 -left-20 size-60 rounded-full bg-accent/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 pt-16 pb-20 sm:pt-24 sm:pb-28">
          <div className="text-center max-w-3xl mx-auto">
            <motion.div
              custom={0}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
            >
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-6">
                <BookOpen className="size-4" />
                Nền tảng đọc sách trực tuyến
              </span>
            </motion.div>

            <motion.h1
              custom={1}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight leading-tight"
            >
              Khám phá thế giới <br />
              <span className="text-primary">qua từng trang sách</span>
            </motion.h1>

            <motion.p
              custom={2}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
            >
              Truy cập hàng triệu cuốn sách từ khắp nơi trên thế giới. Tìm kiếm, khám phá
              và xây dựng thư viện cá nhân hoàn toàn miễn phí.
            </motion.p>

            {/* Search CTA */}
            <motion.form
              custom={3}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              onSubmit={handleSearch}
              className="mt-10 flex gap-2 max-w-lg mx-auto"
            >
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
                <Input
                  id="hero-search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm kiếm sách, tác giả..."
                  className="pl-11 h-12 text-base rounded-xl bg-card border-border/50 shadow-sm"
                />
              </div>
              <Button type="submit" size="lg" className="h-12 px-6 rounded-xl" id="hero-search-submit">
                Tìm kiếm
              </Button>
            </motion.form>

            {/* Quick links */}
            <motion.div
              custom={4}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="mt-6 flex flex-wrap items-center justify-center gap-3 text-sm"
            >
              <span className="text-muted-foreground">Phổ biến:</span>
              {["Harry Potter", "Tolkien", "Science Fiction"].map((term) => (
                <button
                  key={term}
                  onClick={() => router.push(`/books/search?q=${encodeURIComponent(term)}`)}
                  className="rounded-full border border-border/60 px-3 py-1 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
                >
                  {term}
                </button>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-serif font-bold tracking-tight">
              Tại sao chọn BookVerse?
            </h2>
            <p className="mt-3 text-muted-foreground text-lg max-w-xl mx-auto">
              Mọi thứ bạn cần để bắt đầu hành trình đọc sách
            </p>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="group rounded-2xl border border-border/50 bg-card p-6 transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
              >
                <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <feature.icon className="size-6" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary/5 via-primary/10 to-accent/5">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-serif font-bold tracking-tight mb-4">
              Sẵn sàng bắt đầu?
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
              Tham gia cộng đồng hàng triệu người đọc trên BookVerse ngay hôm nay.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button
                size="lg"
                className="h-12 px-8 rounded-xl"
                onClick={() => router.push("/books/search")}
                id="cta-explore"
              >
                Khám phá sách
                <ArrowRight className="size-4 ml-2" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="h-12 px-8 rounded-xl"
                onClick={() => router.push("/authors/search")}
                id="cta-authors"
              >
                Tìm tác giả
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <BookOpen className="size-4" />
            <span>BookVerse © {new Date().getFullYear()}</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Dữ liệu sách từ{" "}
            <a
              href="https://openlibrary.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Open Library
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
