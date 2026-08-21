import { getChapterContentAction } from "@/actions/chapters.action";
import ChapterContent from "./_components/ChapterContent";

interface ChaptersPageProps {
  params: Promise<{ workKey: string; chapterId: string }>;
}

export default async function ChapterPage({ params }: ChaptersPageProps) {
  const { workKey, chapterId } = await params;
  const data = await getChapterContentAction(chapterId);

  return (
    <ChapterContent
      workKey={decodeURIComponent(workKey)}
      id={chapterId}
      content={data.content}
      title={data.title}
      order={data.order}
    />
  );
}