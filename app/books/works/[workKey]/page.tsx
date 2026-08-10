import React from "react";
import { notFound } from "next/navigation";
import { FavoriteService } from "@/services/FavoriteService";
import { BookService } from "@/services/BookService";
import { auth } from "@/auth";
import WorkDetailContent from "./_components/WorkDetailContent";

interface WorkDetailPageProps {
  params: Promise<{ workKey: string }>;
}

export default async function WorkDetailPage({ params }: WorkDetailPageProps) {
  const { workKey } = await params;
  const decodedKey = decodeURIComponent(workKey).replace(/^\/+/, "");

  // Fetch work detail from backend using BookService (includes Keycloak token if available)
  const data = await BookService.getWorkDetails(decodedKey);

  if (!data) {
    notFound();
  }

  // Check favorite status (only if user is logged in)
  let isFavorite = false;
  const session = await auth();
  if (session?.accessToken) {
    try {
      isFavorite = await FavoriteService.isWorkFavorite(decodedKey);
    } catch {
      // Not logged in or error, default to false
    }
  }

  return (
    <WorkDetailContent
      data={data}
      workKey={decodedKey}
      isFavorite={isFavorite}
      isLoggedIn={!!session}
    />
  );
}
