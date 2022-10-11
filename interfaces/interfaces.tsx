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
  front_page: boolean;
  front_thumbnail: string;
  front_img_w?: number; // optional because only relevant on home page
  front_img_h?: number;
  title_eng: string;
  tags: string[];
  hero_img: string;
}
