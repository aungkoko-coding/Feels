import { feed } from "../../lib/data";
import FeedItem from "../../ui/feed/item";

const FeedPage = () => {
  return (
    <section>
      <h1 className="title-font text-5xl font-extrabold sm:text-6xl orange_gradient py-2 text-center">
        What others feel?
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 my-10">
        {feed.map((item) => (
          <FeedItem key={item.id} {...item} />
        ))}
      </div>
    </section>
  );
};

export default FeedPage;
