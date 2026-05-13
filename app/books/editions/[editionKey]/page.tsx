"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, BookOpen, Hash, FileText, Calendar, Building2 } from "lucide-react";
import { useEditionDetail } from "@/hooks/useEditionDetail";
import { DetailPageSkeleton } from "@/components/ui/PageSkeleton";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function EditionDetailPage() {
  const params = useParams() as { editionKey?: string };
  const rawKey = params?.editionKey ?? "";
  const editionKey = decodeURIComponent(rawKey).replace(/^\/+/, "");
  const { data, isLoading, isError } = useEditionDetail(editionKey);

  if (isLoading) return <DetailPageSkeleton />;
  if (isError) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-16 text-center">
        <p className="text-destructive text-lg">Không tìm thấy ấn bản</p>
        <Link href="/books/search">
          <Button variant="outline" className="mt-4">
            <ArrowLeft className="size-4 mr-2" />
            Quay lại tìm kiếm
          </Button>
        </Link>
      </main>
    );
  }

  const infoItems = [
    {
      icon: Hash,
      label: "ISBN",
      value: data?.isbn,
    },
    {
      icon: FileText,
      label: "Số trang",
      value: data?.numberOfPages ? `${data.numberOfPages} trang` : null,
    },
    {
      icon: Calendar,
      label: "Ngày xuất bản",
      value: data?.publishDate,
    },
    {
      icon: Building2,
      label: "Nhà xuất bản",
      value: data?.publisherName,
    },
  ];

  return (
    <main className="mx-auto max-w-3xl px-4 sm:px-6 py-8">
      {/* Back */}
      <Link href="/books/search">
        <Button variant="ghost" size="sm" className="mb-6 -ml-2">
          <ArrowLeft className="size-4 mr-1" />
          Quay lại
        </Button>
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <BookOpen className="size-7" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight">
              Chi tiết ấn bản
            </h1>
            <p className="text-sm text-muted-foreground mt-1">{editionKey}</p>
          </div>
        </div>

        {/* Info Card */}
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            {infoItems.map((item, i) => (
              <React.Fragment key={item.label}>
                {i > 0 && <Separator />}
                <div className="flex items-center gap-4 px-6 py-4">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                    <item.icon className="size-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-muted-foreground">{item.label}</p>
                    <p className="font-medium truncate">{item.value ?? "—"}</p>
                  </div>
                </div>
              </React.Fragment>
            ))}
          </CardContent>
        </Card>
      </motion.div>
    </main>
  );
}
