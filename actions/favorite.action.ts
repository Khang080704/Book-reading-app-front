"use server";

import { FavoriteService } from "@/services/FavoriteService";
import { revalidatePath } from "next/cache";

// ========================
// Fetch actions (server component)
// ========================
export async function getFavoriteWorksAction() {
  return FavoriteService.getFavoriteWorks();
}

export async function getFavoriteAuthorsAction() {
  return FavoriteService.getFavoriteAuthors();
}

// ========================
// Mutate actions (client component)
// ========================
export async function addFavoriteWorkAction(workKey: string) {
  try {
    const result = await FavoriteService.addFavoriteWork(workKey);
    revalidatePath("/me/favorites");
    return { success: true, message: result };
  } catch {
    return { success: false, message: "Không thể thêm vào yêu thích" };
  }
}

export async function removeFavoriteWorkAction(workKey: string) {
  try {
    const result = await FavoriteService.removeFavoriteWork(workKey);
    revalidatePath("/me/favorites");
    return { success: true, message: result };
  } catch {
    return { success: false, message: "Không thể xóa khỏi yêu thích" };
  }
}

export async function addFavoriteAuthorAction(authorKey: string) {
  try {
    const result = await FavoriteService.addFavoriteAuthor(authorKey);
    revalidatePath("/me/favorites");
    return { success: true, message: result };
  } catch {
    return { success: false, message: "Không thể thêm vào yêu thích" };
  }
}

export async function removeFavoriteAuthorAction(authorKey: string) {
  try {
    const result = await FavoriteService.removeFavoriteAuthor(authorKey);
    revalidatePath("/me/favorites");
    return { success: true, message: result };
  } catch {
    return { success: false, message: "Không thể xóa khỏi yêu thích" };
  }
}

// ========================
// Status check actions
// ========================
export async function checkWorkFavoriteStatus(workKey: string) {
  return FavoriteService.isWorkFavorite(workKey);
}

export async function checkAuthorFavoriteStatus(authorKey: string) {
  return FavoriteService.isAuthorFavorite(authorKey);
}
