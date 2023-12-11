const FeedListItemSkeleton = () => {
  return (
    <div className="flex animate-pulse">
      <div className="relative bg-gray-500  w-[150px] sm:w-[200px] md:w-[250px] lg:w-[150px] xl:w-[200px] max-h-[140px] aspect-video overflow-hidden group rounded-md"></div>
      <div className="px-2 relative overflow-hidden flex-1">
        <h2 className="bg-gray-500 w-[80%] h-6"></h2>
        <p className="w-full mt-1 h-5 bg-gray-500"></p>
        <p className="w-full mt-1 h-5 bg-gray-500"></p>
      </div>
    </div>
  );
};

export default FeedListItemSkeleton;
