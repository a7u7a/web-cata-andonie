/**
 * -1 = backwards
 * 1 = forwards
 */
export interface VideoNavProps {
  toggle: boolean;
  direction: number;
}

export interface workPost {
  date: string;
  title: string;
  contentSpanish: string; // post body
  id: string; // post filename
  category: string;
  thumbnail: string;
  contentEnglish: string;
  title_eng: string;
  tags: string[];
  hero_img: string;
}
