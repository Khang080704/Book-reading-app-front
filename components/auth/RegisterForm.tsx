"use client";

import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { motion } from "framer-motion";
import { UserPlus, ArrowRight, Loader2, CheckCircle2, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const REGISTER_BENEFITS = [
  "Lưu danh sách sách yêu thích",
  "Theo dõi tiến trình đọc sách",
  "Nhận gợi ý sách cá nhân hóa",
  "Kết nối cộng đồng yêu sách",
];

export default function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false);

  async function handleRegister() {
    try {
      setIsLoading(true);
      // Keycloak hỗ trợ tham số `prompt=create` để mở thẳng trang đăng ký
      await signIn("keycloak", { redirectTo: "/" }, { prompt: "create" });
    } catch {
      toast.error("Đã xảy ra lỗi. Vui lòng thử lại.");
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
      {/* Benefits list */}
      <div className="rounded-xl border border-border/60 bg-muted/40 p-4 flex flex-col gap-3">
        <p className="text-sm font-semibold text-foreground">
          Tham gia BookVerse để:
        </p>
        <ul className="flex flex-col gap-2">
          {REGISTER_BENEFITS.map((benefit) => (
            <motion.li
              key={benefit}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="flex items-center gap-2 text-sm text-muted-foreground"
            >
              <CheckCircle2 className="size-4 shrink-0 text-primary" />
              {benefit}
            </motion.li>
          ))}
        </ul>
      </div>

      {/* Info note */}
      <p className="text-xs text-muted-foreground leading-relaxed text-center px-2">
        Tài khoản được quản lý bảo mật qua{" "}
        <span className="font-semibold text-foreground">Keycloak SSO</span>.
        Bạn sẽ được chuyển đến trang đăng ký an toàn.
      </p>

      {/* Register Button */}
      <Button
        onClick={handleRegister}
        disabled={isLoading}
        className="w-full h-11 text-base font-medium gap-2"
        id="register-keycloak-btn"
      >
        {isLoading ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Đang chuyển hướng...
          </>
        ) : (
          <>
            <UserPlus className="size-4" />
            Tạo tài khoản miễn phí
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

      {/* Login Link */}
      <div className="text-center">
        <Link
          href="/auth/login"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ChevronLeft className="size-3.5" />
          Quay lại đăng nhập
        </Link>
      </div>
    </motion.div>
  );
}
