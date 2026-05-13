"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";

/**
 * Route mapping for human-readable breadcrumb labels.
 * Supports both static segments and dynamic patterns.
 */
const SEGMENT_LABELS: Record<string, string> = {
  books: "Sách",
  authors: "Tác giả",
  search: "Tìm kiếm",
  works: "Tác phẩm",
  editions: "Ấn bản",
  me: "Hồ sơ",
  auth: "Xác thực",
  login: "Đăng nhập",
  register: "Đăng ký",
};

interface Crumb {
  label: string;
  href: string;
  isLast: boolean;
}

function buildCrumbs(pathname: string): Crumb[] {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 0) return [];

  const crumbs: Crumb[] = [];
  let currentPath = "";

  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i];
    currentPath += `/${segment}`;

    // Determine label
    let label: string;
    if (SEGMENT_LABELS[segment]) {
      label = SEGMENT_LABELS[segment];
    } else if (segment.startsWith("OL") || segment.startsWith("%")) {
      // Dynamic key like OL34221A - show abbreviated
      const decoded = decodeURIComponent(segment);
      label = decoded.length > 16 ? decoded.slice(0, 16) + "…" : decoded;
    } else {
      label = decodeURIComponent(segment);
    }

    crumbs.push({
      label,
      href: currentPath,
      isLast: i === segments.length - 1,
    });
  }

  return crumbs;
}

export default function Breadcrumbs() {
  const pathname = usePathname();

  // Don't show on home page or auth pages
  if (!pathname || pathname === "/" || pathname.startsWith("/auth")) return null;

  const crumbs = buildCrumbs(pathname);
  if (crumbs.length === 0) return null;

  return (
    <nav
      aria-label="Breadcrumb"
      className="mx-auto max-w-7xl px-4 sm:px-6 pt-4 pb-2"
    >
      <ol className="flex items-center gap-1.5 text-sm text-muted-foreground flex-wrap">
        {/* Home */}
        <li>
          <Link
            href="/"
            className="flex items-center gap-1 hover:text-foreground transition-colors rounded-md px-1.5 py-0.5 hover:bg-muted"
          >
            <Home className="size-3.5" />
            <span className="hidden sm:inline">Trang chủ</span>
          </Link>
        </li>

        {crumbs.map((crumb) => (
          <React.Fragment key={crumb.href}>
            <li aria-hidden="true">
              <ChevronRight className="size-3.5 text-muted-foreground/50" />
            </li>
            <li>
              {crumb.isLast ? (
                <span className="font-medium text-foreground px-1.5 py-0.5">
                  {crumb.label}
                </span>
              ) : (
                <Link
                  href={crumb.href}
                  className="hover:text-foreground transition-colors rounded-md px-1.5 py-0.5 hover:bg-muted"
                >
                  {crumb.label}
                </Link>
              )}
            </li>
          </React.Fragment>
        ))}
      </ol>
    </nav>
  );
}
