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
  thumbnail: string;
  front_page: boolean;
  title: string;
  title_eng: string;
  year: number;
  // optional
  hero_img?: string;
  medidas?: string;
  material?: string;
  material_eng?: string;
  locacion?: string;
  locacion_eng?: string;
  tecnica?: string;
  tecnica_eng?: string;
  // computed
  id: string; // post filename
  // computed optional
  contentSpanish?: string; // post body
  contentEnglish?: string; //body_eng
  front_img_w?: number; // optional because only relevant on home page
  front_img_h?: number;
}

export interface bioPost {
  title: string;
  contentSpanish: string; // post body
  id: string; // post filename
}

export interface bioStatement {
  id: string;
  title: string;
  contentSpanish: string; // post body
  contentEnglish: string; //body_eng
}
