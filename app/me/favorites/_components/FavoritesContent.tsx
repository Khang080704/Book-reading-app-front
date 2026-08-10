"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Heart, BookOpen, Users } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FavoriteWorkCard from "./FavoriteWorkCard";
import FavoriteAuthorCard from "./FavoriteAuthorCard";
import type { WorkDTO, AuthorDTO } from "@/lib/types";

interface FavoritesContentProps {
  initialWorks: WorkDTO[];
  initialAuthors: AuthorDTO[];
}

export default function FavoritesContent({
  initialWorks,
  initialAuthors,
}: FavoritesContentProps) {
  const [works, setWorks] = useState(initialWorks);
  const [authors, setAuthors] = useState(initialAuthors);

  const handleRemoveWork = (workKey: string) => {
    setWorks((prev) => prev.filter((w) => w.workKey !== workKey));
  };

  const handleRemoveAuthor = (olKey: string) => {
    setAuthors((prev) => prev.filter((a) => a.olKey !== olKey));
  };

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Page header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex size-10 items-center justify-center rounded-xl bg-red-500/10 text-red-500">
              <Heart className="size-5" />
            </div>
            <h1 className="text-3xl font-serif font-bold tracking-tight">
              Yêu thích
            </h1>
          </div>
          <p className="text-muted-foreground ml-[52px]">
            Quản lý danh sách tác phẩm và tác giả yêu thích của bạn
          </p>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="works" className="w-full">
          <TabsList className="mb-6 h-11">
            <TabsTrigger value="works" className="gap-2 px-4" id="tab-favorite-works">
              <BookOpen className="size-4" />
              Tác phẩm
              {works.length > 0 && (
                <span className="ml-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                  {works.length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="authors" className="gap-2 px-4" id="tab-favorite-authors">
              <Users className="size-4" />
              Tác giả
              {authors.length > 0 && (
                <span className="ml-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                  {authors.length}
                </span>
              )}
            </TabsTrigger>
          </TabsList>

          {/* Works Tab */}
          <TabsContent value="works">
            {works.length === 0 ? (
              <EmptyState
                icon={<BookOpen className="size-12 text-muted-foreground/30" />}
                title="Chưa có tác phẩm yêu thích"
                description="Khám phá và thêm tác phẩm vào danh sách yêu thích của bạn"
              />
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 lg:gap-6">
                {works.map((work, i) => (
                  <FavoriteWorkCard
                    key={work.workKey}
                    work={work}
                    index={i}
                    onRemoved={handleRemoveWork}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          {/* Authors Tab */}
          <TabsContent value="authors">
            {authors.length === 0 ? (
              <EmptyState
                icon={<Users className="size-12 text-muted-foreground/30" />}
                title="Chưa có tác giả yêu thích"
                description="Khám phá và thêm tác giả vào danh sách yêu thích của bạn"
              />
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {authors.map((author, i) => (
                  <FavoriteAuthorCard
                    key={author.olKey}
                    author={author}
                    index={i}
                    onRemoved={handleRemoveAuthor}
                  />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </motion.div>
    </main>
  );
}

function EmptyState({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-center py-20 text-center"
    >
      <div className="flex size-20 items-center justify-center rounded-full bg-muted mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground max-w-xs">{description}</p>
    </motion.div>
  );
}
