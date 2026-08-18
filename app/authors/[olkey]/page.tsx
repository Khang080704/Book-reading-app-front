import React from "react";
import { notFound } from "next/navigation";
import { FavoriteService } from "@/services/FavoriteService";
import { AuthorService } from "@/services/AuthorService";
import { auth } from "@/auth";
import AuthorDetailContent from "./_components/AuthorDetailContent";

interface AuthorDetailPageProps {
  params: Promise<{ olkey: string }>;
}

export default async function AuthorDetailPage({ params }: AuthorDetailPageProps) {
  const { olkey } = await params;
  const key = decodeURIComponent(olkey).replace(/^\/+/, "");

  // Fetch author detail and works in parallel using AuthorService (includes Keycloak token if available)
  // const [detail, worksPage] = await Promise.all([
  //   AuthorService.getAuthorDetail(key),
  //   AuthorService.getAuthorWorks(key, 0, 20),
  // ]);

  const detail = await AuthorService.getAuthorDetail(key);
  const worksPage = await AuthorService.getAuthorWorks(key, 0, 20);

  if (!detail) {
    notFound();
  }

  // Check favorite status (only if user is logged in)
  let isFavorite = false;
  const session = await auth();
  if (session?.accessToken) {
    try {
      isFavorite = await FavoriteService.isAuthorFavorite(key);
    } catch {
      // Not logged in or error, default to false
    }
  }

  return (
    <AuthorDetailContent
      detail={detail}
      initialWorksPage={worksPage}
      authorKey={key}
      isFavorite={isFavorite}
      isLoggedIn={!!session}
    />
  );
}
