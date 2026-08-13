import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BookService } from "@/services/BookService";
import ChaptersContent from "./_components/ChaptersContent";

interface ChaptersPageProps {
  params: Promise<{ workKey: string; resourceId: string }>;
}

export default async function ChaptersPage({ params }: ChaptersPageProps) {
  const { workKey, resourceId } = await params;
  const decodedWorkKey = decodeURIComponent(workKey).replace(/^\/+/, "");
  const decodedResourceId = decodeURIComponent(resourceId);

  // Fetch work details and chapters in parallel
  const [workData, chapters] = await Promise.all([
    BookService.getWorkDetails(decodedWorkKey),
    BookService.getChapters(decodedResourceId),
  ]);

  if (!workData) {
    notFound();
  }

  return (
    <ChaptersContent
      workData={workData}
      workKey={decodedWorkKey}
      chapters={chapters}
      resourceId={decodedResourceId}
    />
  );
}
