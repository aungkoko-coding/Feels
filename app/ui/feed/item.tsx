import { FeedItemType } from "@/app/lib/definitions";
import Link from "next/link";

const FeedItem = ({
  id,
  title,
  description,
  url,
  thumbnailUrl,
  duration,
}: FeedItemType) => {
  return (
    <article className="flex flex-col">
      <Link
        href={`/feed/play?vid=${id}`}
        className="relative overflow-hidden group rounded-md"
      >
        <img
          src={thumbnailUrl}
          alt={title}
          className="max-h-[250px] w-full aspect-video group-hover:scale-105 duration-300 origin-center"
        />
        <span className="absolute right-0 bottom-0 bg-black/80 text-white px-1 rounded-md text-[12px]">
          {duration}
        </span>
      </Link>
      <div className="py-2">
        <h2 className="font-extrabold line-clamp-2">{title}</h2>
        <p className="w-full font-medium text-sm line-clamp-2 text-black/90">
          {description}
        </p>
      </div>
    </article>
  );
};

export default FeedItem;
