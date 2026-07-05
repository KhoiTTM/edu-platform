type Props = {
  videoId: string;
  title: string;
};

export function YouTubeEmbed({ videoId, title }: Props) {
  const src = `https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1`;

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-black shadow-card-lg">
      <div className="relative aspect-video w-full">
        <iframe
          title={title}
          src={src}
          className="absolute inset-0 h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
    </div>
  );
}
