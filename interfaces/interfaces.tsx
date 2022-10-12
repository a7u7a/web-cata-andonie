/**
 * -1 = backwards
 * 1 = forwards
 */
export interface VideoNavProps {
  toggle: boolean;
  direction: number;
}

export interface workPost {
  id: string; // post filename
  date: string;
  title: string;
  title_eng: string;
  contentSpanish: string; // post body
  contentEnglish: string;
  category: string;
  thumbnail: string;
  front_page: boolean;
  front_thumbnail: string;
  front_img_w?: number; // optional because only relevant on home page
  front_img_h?: number;
  tags: string[];
  hero_img: string;
}

export interface bioPost {
  date: string;
  contentSpanish: string; // post body
  id: string; // post filename
}