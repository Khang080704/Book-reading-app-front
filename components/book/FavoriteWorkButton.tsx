"use client";

import React, { useState, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  addFavoriteWorkAction,
  removeFavoriteWorkAction,
} from "@/actions/favorite.action";

interface FavoriteWorkButtonProps {
  workKey: string;
  initialIsFavorite: boolean;
}

export default function FavoriteWorkButton({
  workKey,
  initialIsFavorite,
}: FavoriteWorkButtonProps) {
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite);
  const [isPending, startTransition] = useTransition();

  const handleToggle = () => {
    const prev = isFavorite;
    // Optimistic update
    setIsFavorite(!prev);

    startTransition(async () => {
      const result = prev
        ? await removeFavoriteWorkAction(workKey)
        : await addFavoriteWorkAction(workKey);

      if (!result.success) {
        // Revert on failure
        setIsFavorite(prev);
        toast.error(result.message);
      } else {
        toast.success(
          prev
            ? "Đã xóa khỏi danh sách yêu thích"
            : "Đã thêm vào danh sách yêu thích"
        );
      }
    });
  };

  return (
    <Button
      variant={isFavorite ? "default" : "outline"}
      size="lg"
      className={`rounded-xl gap-2 transition-all ${
        isFavorite
          ? "bg-red-500/90 hover:bg-red-600 text-white border-red-500"
          : "hover:border-red-300 hover:text-red-500"
      }`}
      onClick={handleToggle}
      disabled={isPending}
      id="favorite-work-toggle"
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={isFavorite ? "filled" : "outline"}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          transition={{ duration: 0.2, type: "spring", stiffness: 300 }}
        >
          <Heart
            className={`size-5 ${isFavorite ? "fill-current" : ""}`}
          />
        </motion.span>
      </AnimatePresence>
      {isFavorite ? "Đã yêu thích" : "Yêu thích"}
    </Button>
  );
}
