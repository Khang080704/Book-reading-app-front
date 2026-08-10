"use server";

import { BookService } from "@/services/BookService";

export async function searchBooksAction(q: string, page = 1, limit = 10) {
  return BookService.searchBooks(q, page, limit);
}

export async function getWorkDetailsAction(workKey: string) {
  return BookService.getWorkDetails(workKey);
}

export async function getWorkEditionsAction(workKey: string) {
  return BookService.getWorkEditions(workKey);
}

export async function getEditionDetailsAction(editionKey: string) {
  return BookService.getEditionDetails(editionKey);
}
