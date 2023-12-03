import { FeedItemType } from "@/app/lib/definitions";
import Link from "next/link";

const FeedItem = ({
  id,
  title,
  description,
  url,
  thumbnailUrl,
}: FeedItemType) => {
  return (
    <article className="flex flex-col">
      <Link
        href={`/feed/${id}`}
        className="relative overflow-hidden group rounded-md"
      >
        <img
          src={thumbnailUrl}
          alt={title}
          className="max-h-[200px] aspect-video  group-hover:scale-105 duration-300 origin-center"
        />
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
