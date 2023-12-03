import { FeedItemType } from "@/app/lib/definitions";
import Link from "next/link";

const FeedListItem = ({
  title,
  description,
  url,
  thumbnailUrl,
}: FeedItemType) => {
  return (
    <article className="flex">
      <Link href="#" className="relative overflow-hidden group rounded-md">
        <img
          src={thumbnailUrl}
          alt={title}
          className="w-[150px] sm:w-[200px] md:w-[250px] lg:w-[150px] xl:w-[200px] max-h-[140px] aspect-video  group-hover:scale-105 duration-300 origin-center"
        />
      </Link>
      <div className="px-2 relative overflow-hidden flex-1">
        <h2 className="font-extrabold w-full line-clamp-2">{title}</h2>
        <p className=" w-full font-medium text-sm line-clamp-2 text-black/90">
          {description}
        </p>
      </div>
    </article>
  );
};

export default FeedListItem;
