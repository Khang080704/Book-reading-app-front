// ========================
// Auth DTOs
// ========================
export interface PageInfo {
  size: number;
  number: number;
  totalElements: number;
  totalPages: number;
}

export interface Page<T> {
  content: T[];
  page: PageInfo;
}

export interface RegisterRequest {
  username: string;
  password: string;
  email: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface TokenResponse {
  accessToken: string;
  refreshToken: string;
}

export interface UserDto {
  email: string;
  userName: string;
}

// ========================
// Author DTOs
// ========================
export interface AuthorDTO {
  id: string;
  name: string;
  birthDay: string | null;
  readCount: number;
  olKey: string;
  avatar: string | null;
}

export interface AuthorDetailDTO {
  birthDate: string | null;
  fullName: string;
  bio: string | null;
  createdAt: string;
  lastModifiedAt: string;
  avatar: string | null;
}

export interface WorkDTO {
  workKey: string;
  title: string;
  description: string | null;
  coverUrl: string | null;
}

// ========================
// Book DTOs
// ========================
export interface SearchBookDTO {
  bookKey: string;
  title: string;
  authorNames: string[];
  firstPublishYear: number | null;
  isbn: string | null;
  editionCount: number;
  coverUrl: string | null;
}

export interface BookDetailDTO {
  workKey: string;
  title: string;
  description: string | null;
  coverUrl: string | null;
  authorKeys: string[];
}

export interface EditionsListDTO {
  workKey: string;
  editions: EditionDTO[];
}

export interface EditionDTO {
  editionKey: string;
  isbn: string | null;
  numberOfPages: number | null;
  publishDate: string | null;
  publisherName: string | null;
}

export type ReadingResourceDTO = {
  available: true;
  readingMode: "CHAPTER" | "CONTINOUS"
  provider: string;
  resourceId: string
} | {
  available: false;
}

// ========================
// Chapter DTOs
// ========================
export interface ChapterDTO {
  id: string;
  title: string;
}

// ========================
// Error DTOs
// ========================
export interface ExceptionResponse {
  message: string;
  status: string;
}

export interface ApiErrorResponse {
  error: string;
  statusCode?: number;
}
