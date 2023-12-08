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
  description?: string;
  public: boolean;
  timestamp: number; // this property is for temporary to use it when displaying list, doesn't store on server
};

export type CustomSessionType = {
  data: unknown;
  status: "loading" | "authenticated" | "unauthenticated";
};

export type SessionDataType = {
  user?: null | {
    apiToken: string;
    createdAt: string;
    updatedAt: string;
    id: number;
    username: string;
    imgUrl: string | null;
  };
};

export type YoutubeLinkType = {
  id: number;
  url: string;
  thumbnailUrl: string;
  title: string;
  description?: string;
  createdAt: string;
  duration: string;

  messageId: number;
};

export type MessageType = {
  id: number;
  content: string;
  createdAt: string;
  seen: boolean;
  youtubeLinks?: YoutubeLinkType[] | null;
};
