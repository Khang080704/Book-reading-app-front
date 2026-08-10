"use client";

import React, { useState, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { removeFavoriteAuthorAction } from "@/actions/favorite.action";
import type { AuthorDTO } from "@/lib/types";

function normalizeKey(key?: string) {
  if (!key) return "";
  return key.replace(/^\/+/, "").replace(/^authors\//, "");
}

interface FavoriteAuthorCardProps {
  author: AuthorDTO;
  index: number;
  onRemoved: (olKey: string) => void;
}

export default function FavoriteAuthorCard({
  author,
  index,
  onRemoved,
}: FavoriteAuthorCardProps) {
  const key = normalizeKey(author.olKey ?? author.id);
  const avatar = author.avatar ?? null;
  const [isPending, startTransition] = useTransition();
  const [isRemoving, setIsRemoving] = useState(false);

  const handleRemove = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsRemoving(true);

    startTransition(async () => {
      const result = await removeFavoriteAuthorAction(author.olKey);
      if (result.success) {
        onRemoved(author.olKey);
        toast.success("Đã xóa tác giả khỏi danh sách yêu thích");
      } else {
        setIsRemoving(false);
        toast.error(result.message);
      }
    });
  };

  if (isRemoving) return null;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      whileHover={{ y: -2 }}
      className="group relative rounded-xl border border-border/50 bg-card p-4 transition-shadow hover:shadow-xl hover:shadow-primary/5"
    >
      {/* Remove button */}
      <Button
        variant="ghost"
        size="icon-sm"
        className="absolute top-3 right-3 z-10 size-8 rounded-full bg-background/80 backdrop-blur-sm text-red-500 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500 hover:text-white"
        onClick={handleRemove}
        disabled={isPending}
        id={`remove-author-${key}`}
      >
        <Heart className="size-4 fill-current" />
      </Button>

      <Link href={`/authors/${encodeURIComponent(key)}`} className="flex items-center gap-4">
        {/* Avatar */}
        <div className="relative size-16 shrink-0 overflow-hidden rounded-full bg-muted ring-2 ring-border/50 group-hover:ring-primary/30 transition-all">
          {avatar ? (
            <Image
              src={avatar}
              alt={author.name}
              fill
              sizes="64px"
              className="object-cover"
            />
          ) : (
            <div className="flex size-full items-center justify-center text-2xl font-serif font-bold text-muted-foreground/60">
              {author.name?.charAt(0)?.toUpperCase() ?? "?"}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-base truncate group-hover:text-primary transition-colors">
            {author.name}
          </h3>
          {author.birthDay && (
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground mt-1">
              <Calendar className="size-3.5" />
              <span>{author.birthDay}</span>
            </div>
          )}
          {author.readCount > 0 && (
            <p className="text-xs text-muted-foreground mt-1">
              {author.readCount.toLocaleString()} lượt đọc
            </p>
          )}
        </div>

        {/* Arrow indicator */}
        <div className="shrink-0 text-muted-foreground/30 group-hover:text-primary transition-colors">
          <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </div>
      </Link>
    </motion.article>
  );
}
