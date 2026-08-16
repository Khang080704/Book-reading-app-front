"use server";

import { AuthorService } from "@/services/AuthorService";

export async function searchAuthorsAction(
  q: string,
  page = 0,
  limit = 20,
  sortBy = "name",
  direction = "desc"
) {
  return AuthorService.searchAuthors(q, page, limit, sortBy, direction);
}

export async function getAuthorDetailAction(olkey: string) {
  return AuthorService.getAuthorDetail(olkey);
}

export async function getAuthorWorksAction(authorKey: string, page = 0, limit = 20) {
  return AuthorService.getAuthorWorks(authorKey, page, limit);
}
