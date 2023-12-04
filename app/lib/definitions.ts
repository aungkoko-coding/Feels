export type FeedItemType = {
  id: number;
  title: string;
  description?: string;
  thumbnailUrl: string;
  duration: string;
  url: string;
};

export type YoutubeFormDataType = {
  youtubeLink: string;
  title: string;
  description?: string;
  public: boolean;
  timestamp: number; // this property is for temporary to use it when displaying list, doesn't store on server
};
