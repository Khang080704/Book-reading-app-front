"use client";

import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { motion } from "framer-motion";
import { ShieldCheck, ArrowRight, Loader2, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogin() {
    try {
      setIsLoading(true);
      await signIn("keycloak", { redirectTo: "/" });
    } catch {
      toast.error("Đã xảy ra lỗi khi đăng nhập. Vui lòng thử lại.");
      setIsLoading(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="flex flex-col gap-6"
    >
      {/* SSO Info Card */}
      <div className="rounded-xl border border-border/60 bg-muted/40 p-4 flex items-start gap-3">
        <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
          <ShieldCheck className="size-4 text-primary" />
        </div>
        <div>
          <p className="text-sm font-medium leading-snug">Đăng nhập qua Keycloak SSO</p>
          <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
            Bạn sẽ được chuyển đến trang đăng nhập bảo mật của Keycloak.
            Sau khi xác thực thành công, bạn sẽ được tự động quay lại BookVerse.
          </p>
        </div>
      </div>

      {/* Features */}
      <div className="grid grid-cols-3 gap-3 text-center">
        {[
          { icon: "🔒", label: "Bảo mật cao" },
          { icon: "⚡", label: "Nhanh chóng" },
          { icon: "🔑", label: "1 lần đăng nhập" },
        ].map((f) => (
          <div
            key={f.label}
            className="rounded-lg border border-border/50 bg-card/50 px-2 py-3"
          >
            <div className="text-xl mb-1">{f.icon}</div>
            <p className="text-xs text-muted-foreground font-medium">{f.label}</p>
          </div>
        ))}
      </div>

      {/* Login Button */}
      <Button
        onClick={handleLogin}
        disabled={isLoading}
        className="w-full h-11 text-base font-medium gap-2"
        id="login-keycloak-btn"
      >
        {isLoading ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Đang chuyển hướng...
          </>
        ) : (
          <>
            <BookOpen className="size-4" />
            Đăng nhập với Keycloak
            <ArrowRight className="size-4 ml-auto" />
          </>
        )}
      </Button>

      {/* Divider */}
      <div className="relative flex items-center gap-3">
        <div className="flex-1 h-px bg-border" />
        <span className="text-xs text-muted-foreground">hoặc</span>
        <div className="flex-1 h-px bg-border" />
      </div>

      {/* Register Link */}
      <p className="text-center text-sm text-muted-foreground">
        Chưa có tài khoản?{" "}
        <Link
          href="/auth/register"
          className="font-semibold text-primary hover:underline underline-offset-4 transition-colors"
        >
          Tạo tài khoản miễn phí
        </Link>
      </p>
    </motion.div>
  );
}
