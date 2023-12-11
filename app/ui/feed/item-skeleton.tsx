const FeedItemSkeleton = () => {
  return (
    <div className="flex flex-col animate-pulse">
      <div className="relative max-h-[250px] w-full aspect-video overflow-hidden group rounded-md bg-gray-500"></div>
      <div className="py-2">
        <h2 className="w-[80%] h-6 bg-gray-500 rounded-md"></h2>
        <p className="w-full h-5 mt-1 bg-gray-500 rounded-md"></p>
      </div>
    </div>
  );
};

export default FeedItemSkeleton;
