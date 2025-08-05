import { Element } from "@/types/pageBuilder";

export default function VideoBlock({ element }: { element: Element }) {
  const videoUrl = element.items[0]?.extra_data?.video_url;
  return videoUrl ? (
    <div className="my-6">
      <video controls className="w-full max-w-3xl mx-auto">
        <source src={videoUrl} type="video/mp4" />
        مرورگر شما از پخش ویدیو پشتیبانی نمی‌کند.
      </video>
    </div>
  ) : null;
}
