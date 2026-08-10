import React from "react";
import { getFavoriteWorksAction, getFavoriteAuthorsAction } from "@/actions/favorite.action";
import FavoritesContent from "./_components/FavoritesContent";

export const metadata = {
  title: "Yêu thích",
  description: "Danh sách tác phẩm và tác giả yêu thích của bạn",
};

export default async function FavoritesPage() {
  const [works, authors] = await Promise.all([
    getFavoriteWorksAction(),
    getFavoriteAuthorsAction(),
  ]);

  return (
    <FavoritesContent
      initialWorks={works}
      initialAuthors={authors}
    />
  );
}
