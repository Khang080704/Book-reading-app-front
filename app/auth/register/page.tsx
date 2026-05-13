import RegisterForm from "@/components/auth/RegisterForm";

export const metadata = {
  title: "Đăng ký",
};

export default function RegisterPage() {
  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl font-serif font-bold tracking-tight">
          Tạo tài khoản mới
        </h1>
        <p className="mt-2 text-muted-foreground">
          Bắt đầu hành trình khám phá tri thức cùng BookVerse
        </p>
      </div>
      <RegisterForm />
    </>
  );
}
