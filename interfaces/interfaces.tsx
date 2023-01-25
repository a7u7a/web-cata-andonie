/**
 * -1 = backwards
 * 1 = forwards
 */

export interface VideoNavProps {
  toggle: boolean;
  direction: number;
}

export interface pathsAndDimsProps {
  w: number;
  h: number;
  path: string;
  lowResPath: string;
}

export interface workPost {
  date: string;
  thumbnail: string;
  front_page: boolean;
  title: string;
  title_eng: string;
  year: number;
  // optional
  vimeo_front_url: string;
  hero_img?: string;
  medidas?: string;
  medidas_eng?: string;
  material?: string;
  material_eng?: string;
  locacion?: string;
  locacion_eng?: string;
  tecnica?: string;
  tecnica_eng?: string;
  title_color: string; // white/black according to background color
  // computed
  id: string; // postP filename
  // computed optional
  contentSpanish?: string; // post body
  contentEnglish?: string; //body_eng
  front_img_w?: number; // optional because only relevant on home page
  front_img_h?: number;
  pathsAndDims?: pathsAndDimsProps[];
  vimeo_video_gallery: string[];
}

export interface bioPost {
  title: string;
  title_eng: string;
  contentSpanish: string; // post body
  contentEnglish: string;
  id: string; // post filename
  order:number
}

export interface bioStatementPost {
  id: string;
  title: string;
  contentSpanish: string; // post body
  contentEnglish: string; //body_eng
}

export interface exhibitionsPost {
  id: string;
  title: string;
  title_eng: string;
  contentSpanish: string; // post body
  contentEnglish: string; //body_eng
  show: boolean;
}

export interface aboutPost {
  id: string;
  title: string;
  title_eng: string;
  contentSpanish: string; // post body
  contentEnglish: string; //body_eng
}
