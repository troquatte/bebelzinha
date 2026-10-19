import { CanalShort, CanalShortGroup } from '../interface/canal.models';

const YOUTUBE_THUMBNAIL = 'https://i.ytimg.com/vi';
const DEFAULT_SHORT_CATEGORY = 'Outros';

export function canalVideoUrl(id: string): string {
  return `https://www.youtube.com/watch?v=${id}`;
}

export function canalShortUrl(id: string): string {
  return `https://www.youtube.com/shorts/${id}`;
}

export function canalThumbnail(id: string, thumbnail?: string): string {
  return thumbnail ?? `${YOUTUBE_THUMBNAIL}/${id}/hqdefault.jpg`;
}

export function groupShortsByCategory(shorts: CanalShort[]): CanalShortGroup[] {
  const groups = new Map<string, CanalShort[]>();

  for (const short of shorts) {
    const category = short.category?.trim() || DEFAULT_SHORT_CATEGORY;
    const list = groups.get(category) ?? [];
    list.push(short);
    groups.set(category, list);
  }

  return [...groups].map(([category, list]) => ({ category, shorts: list }));
}
