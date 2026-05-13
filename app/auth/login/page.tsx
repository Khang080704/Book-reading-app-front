import LoginForm from "@/components/auth/LoginForm";

export const metadata = {
  title: "Đăng nhập",
};

export default function LoginPage() {
  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl font-serif font-bold tracking-tight">
          Chào mừng trở lại
        </h1>
        <p className="mt-2 text-muted-foreground">
          Đăng nhập để tiếp tục hành trình đọc sách
        </p>
      </div>
      <LoginForm />
    </>
  );
}
