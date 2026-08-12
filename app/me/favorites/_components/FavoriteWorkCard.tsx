"use client";

import React, { useState, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { removeFavoriteWorkAction } from "@/actions/favorite.action";
import type { WorkDTO } from "@/lib/types";

function normalizeKey(key?: string) {
  if (!key) return "";
  return key.replace(/^\/+/, "").replace(/^works\//, "");
}

interface FavoriteWorkCardProps {
  work: WorkDTO;
  index: number;
  onRemoved: (workKey: string) => void;
}

export default function FavoriteWorkCard({
  work,
  index,
  onRemoved,
}: FavoriteWorkCardProps) {
  const workKey = normalizeKey(work.workKey);
  const [isPending, startTransition] = useTransition();
  const [isRemoving, setIsRemoving] = useState(false);

  const handleRemove = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsRemoving(true);

    startTransition(async () => {
      const result = await removeFavoriteWorkAction(work.workKey);
      if (result.success) {
        onRemoved(work.workKey);
        toast.success("Đã xóa khỏi danh sách yêu thích");
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
      whileHover={{ y: -4 }}
      className="group relative overflow-hidden rounded-xl border border-border/50 bg-card transition-shadow hover:shadow-xl hover:shadow-primary/5"
    >
      {/* Remove button */}
      <Button
        variant="ghost"
        size="icon-sm"
        className="absolute top-2 right-2 z-10 size-8 rounded-full bg-background/80 backdrop-blur-sm text-red-500 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500 hover:text-white"
        onClick={handleRemove}
        disabled={isPending}
        id={`remove-work-${workKey}`}
      >
        <Heart className="size-4 fill-current" />
      </Button>

      <Link href={`/books/works/${encodeURIComponent(workKey)}`} className="block">
        <div className="relative aspect-[2/3] w-full overflow-hidden bg-muted">
          {work.coverUrl && work.coverUrl.includes('https') ? (
            <Image
              src={work.coverUrl}
              alt={work.title}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex size-full items-center justify-center text-muted-foreground">
              <BookOpen className="size-10 opacity-30" />
            </div>
          )}
          {/* Gradient overlay */}
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
        </div>
        <div className="p-3 space-y-1.5">
          <h3 className="font-semibold text-sm leading-snug line-clamp-2 group-hover:text-primary transition-colors">
            {work.title}
          </h3>
          {work.description && (
            <p className="text-xs text-muted-foreground line-clamp-2">
              {work.description}
            </p>
          )}
        </div>
      </Link>
    </motion.article>
  );
}
