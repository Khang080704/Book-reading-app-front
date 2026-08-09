

import { Button } from "@/components/ui/button";
import { signIn } from "@/auth";
import Link from "next/link";

export default function LoginForm() {
  return (
    <form
      action={async () => {
        "use server";

        await signIn("keycloak", {
          redirectTo: "/",
        });
      }}
    >
      <Button type="submit" className="w-full">
        Đăng nhập
      </Button>
      <p className="text-center text-sm text-muted-foreground">
        Chưa có tài khoản?{" "}
        <Link
          href="/auth/register"
          className="font-medium text-primary hover:underline"
        >
          Đăng ký
        </Link>
      </p>
    </form>
  );
}
