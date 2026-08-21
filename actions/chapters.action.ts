import { ChapterService } from "@/services/ChapterService";

export async function getChapterContentAction(chapterId: string) {
    return ChapterService.getChapterContent(chapterId)
}