export interface CanalVideo {
  id: string;
  title: string;
  thumbnail?: string;
}

export interface CanalShort {
  id: string;
  title: string;
  category: string;
  thumbnail?: string;
}

export interface CanalContent {
  channelUrl: string;
  videos: CanalVideo[];
  shorts: CanalShort[];
}

export interface CanalShortGroup {
  category: string;
  shorts: CanalShort[];
}
