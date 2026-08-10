"use client";

import React, { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Search,
  User,
  LogOut,
  Sun,
  Moon,
  Menu,
  Palette,
  Heart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useTheme } from "@/components/ThemeProvider";
import { useSession, signOut } from "next-auth/react";
import { getLogoutUrl } from "@/actions/auth.action";

const navLinks = [
  { href: "/", label: "Trang chủ" },
  { href: "/books/search", label: "Tìm sách" },
  { href: "/authors/search", label: "Tác giả" },
];

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Default false for SSR
  const { data: session, status } = useSession();

  // Lazy load isLoggedIn after hydration to avoid mismatch
  useEffect(() => {
    setIsLoggedIn(!!session);
  }, [session]);

  const handleSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const q = searchQuery.trim();
      if (q) {
        router.push(`/books/search?q=${encodeURIComponent(q)}`);
        setSearchQuery("");
      }
    },
    [searchQuery, router]
  );

  const handleLogout = async () => {
    try {
      const logoutUrl = await getLogoutUrl();
      await signOut({ redirect: false });
      window.location.href = logoutUrl;
    } catch {
      await signOut({ redirectTo: "/" });
    }
  };

  const cycleTheme = () => {
    const order: Array<"light" | "dark" | "sepia"> = ["light", "dark", "sepia"];
    const currentIndex = order.indexOf(theme);
    setTheme(order[(currentIndex + 1) % order.length]);
  };

  const themeIcon =
    theme === "dark" ? <Moon className="size-4" /> : theme === "sepia" ? <Palette className="size-4" /> : <Sun className="size-4" />;
  const themeLabel =
    theme === "dark" ? "Dark" : theme === "sepia" ? "Sepia" : "Light";

  // Hide navbar on auth pages
  if (!pathname.startsWith("/authors") && pathname?.startsWith("/auth")) return null;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <BookOpen className="size-5" />
          </div>
          <span className="hidden font-serif text-xl font-bold tracking-tight sm:inline-block">
            BookVerse
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1 ml-4">
          {navLinks.map((link) => {
            const isActive = link.href === "/" ? pathname === "/" : pathname?.startsWith(link.href.replace(/\/search$/, "")) ?? false;
            return (
              <Link key={link.href} href={link.href}>
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  size="sm"
                  className="relative"
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full bg-primary"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                    />
                  )}
                </Button>
              </Link>
            );
          })}
        </nav>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="hidden sm:flex flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="navbar-search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm sách, tác giả..."
              className="pl-9 h-9 bg-secondary/50"
            />
          </div>
        </form>

        {/* Right side actions */}
        <div className="flex items-center gap-1 ml-auto">
          {/* Theme toggle */}
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={cycleTheme}
            title={`Theme: ${themeLabel}`}
            id="theme-toggle"
          >
            {themeIcon}
          </Button>

          {/* User menu (desktop) */}
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon-sm" id="user-menu-trigger">
                  <User className="size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={() => router.push("/me")}>
                  <User className="size-4 mr-2" />
                  Hồ sơ
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/me/favorites")}>
                  <Heart className="size-4 mr-2" />
                  Yêu thích
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="size-4 mr-2" />
                  Đăng xuất
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/auth/login">
              <Button variant="default" size="sm" id="login-button">
                Đăng nhập
              </Button>
            </Link>
          )}

          {/* Mobile hamburger */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon-sm" className="md:hidden" id="mobile-menu-trigger">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <BookOpen className="size-5 text-primary" />
                  BookVerse
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-2 px-4 mt-4">
                {/* Mobile search */}
                <form onSubmit={(e) => { handleSearch(e); setMobileOpen(false); }}>
                  <div className="relative">
                    <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Tìm kiếm..."
                      className="pl-9 h-9"
                    />
                  </div>
                </form>

                <div className="mt-2 flex flex-col gap-1">
                  {navLinks.map((link) => {
                    const isActive = link.href === "/" ? pathname === "/" : pathname?.startsWith(link.href.replace(/\/search$/, "")) ?? false;
                    return (
                      <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)}>
                        <Button variant={isActive ? "secondary" : "ghost"} className="w-full justify-start">
                          {link.label}
                        </Button>
                      </Link>
                    );
                  })}
                </div>

                <div className="mt-4 pt-4 border-t flex flex-col gap-1">
                  <Button variant="ghost" className="w-full justify-start" onClick={cycleTheme}>
                    {themeIcon}
                    <span className="ml-2">Theme: {themeLabel}</span>
                  </Button>
                  {isLoggedIn ? (
                    <>
                      <Link href="/me" onClick={() => setMobileOpen(false)}>
                        <Button variant="ghost" className="w-full justify-start">
                          <User className="size-4 mr-2" />
                          Hồ sơ
                        </Button>
                      </Link>
                      <Link href="/me/favorites" onClick={() => setMobileOpen(false)}>
                        <Button variant="ghost" className="w-full justify-start">
                          <Heart className="size-4 mr-2" />
                          Yêu thích
                        </Button>
                      </Link>
                      <Button variant="ghost" className="w-full justify-start text-destructive" onClick={handleLogout}>
                        <LogOut className="size-4 mr-2" />
                        Đăng xuất
                      </Button>
                    </>
                  ) : (
                    <Link href="/auth/login" onClick={() => setMobileOpen(false)}>
                      <Button variant="default" className="w-full">Đăng nhập</Button>
                    </Link>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
