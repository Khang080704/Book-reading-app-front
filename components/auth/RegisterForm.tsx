'use client'

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Lock, User, Loader2, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { useRegister } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "next-auth/react";

export default function RegisterForm() {

  async function register(e: React.FormEvent) {

    await signIn(
      "keycloak",
      { redirectTo: "/" },
      { prompt: "create" }
    );
  }

  return (
    <Button
      onClick={register}
      className="w-full h-11 text-base font-medium"
    >
      Tạo tài khoản
      <ArrowRight className="size-4 ml-2" />
    </Button>
  )
}
