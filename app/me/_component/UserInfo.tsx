"use client"


import { motion } from "framer-motion";
import { User, Mail, LogOut, BookOpen } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

export function UserInfo({ email, username }: { email: string, username: string }) {


  // if (isLoading) {
  //   return (
  //     <main className="mx-auto max-w-2xl px-4 sm:px-6 py-12">
  //       <div className="flex flex-col items-center gap-4">
  //         <Skeleton className="size-24 rounded-full" />
  //         <Skeleton className="h-7 w-48" />
  //         <Skeleton className="h-5 w-36" />
  //       </div>
  //       <div className="mt-8 space-y-4">
  //         <Skeleton className="h-16 w-full rounded-xl" />
  //         <Skeleton className="h-16 w-full rounded-xl" />
  //       </div>
  //     </main>
  //   );
  // }

  // if (isError) {
  //   return (
  //     <main className="mx-auto max-w-2xl px-4 py-16 text-center">
  //       <p className="text-destructive text-lg mb-4">Không thể tải thông tin người dùng</p>
  //       <Button variant="outline" onClick={() => router.push("/auth/login")}>
  //         Đăng nhập lại
  //       </Button>
  //     </main>
  //   );
  // }

  return (
    <main className="mx-auto max-w-2xl px-4 sm:px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Profile header */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="flex size-24 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-accent/20 ring-4 ring-background shadow-xl mb-4">
            <span className="text-3xl font-serif font-bold text-primary">
              {username.charAt(0)?.toUpperCase() ?? email?.charAt(0)?.toUpperCase() ?? "?"}
            </span>
          </div>
          <h1 className="text-2xl font-serif font-bold tracking-tight">
            {username ?? "Người dùng"}
          </h1>
          <p className="text-muted-foreground mt-1">{email}</p>
        </div>

        {/* Info card */}
        <Card className="overflow-hidden mb-6">
          <CardContent className="p-0">
            <div className="flex items-center gap-4 px-6 py-4">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                <User className="size-5" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Tên người dùng</p>
                <p className="font-medium">{username ?? "—"}</p>
              </div>
            </div>
            <Separator />
            <div className="flex items-center gap-4 px-6 py-4">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                <Mail className="size-5" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">{email ?? "—"}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="space-y-3">
          <Link
            href="/book/search"
            className="w-full justify-start h-12 rounded-xl"
          >
            <BookOpen className="size-5 mr-3" />
            Khám phá sách
          </Link>
          <Link
            className="w-full justify-start h-12 rounded-xl text-destructive hover:text-destructive hover:bg-destructive/10"
            id="logout-button"
            href={""}
          >
            <LogOut className="size-5 mr-3" />
            Đăng xuất
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
