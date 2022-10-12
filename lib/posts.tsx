import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { workPost, bioPost } from "../interfaces/interfaces";
import probe from "probe-image-size";

const worksDirectory = path.join(process.cwd(), "content/works");
const bioDirectory = path.join(process.cwd(), "content/bio");

export const getAllPostIds = () => {
  const fileNames = fs.readdirSync(worksDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ""),
      },
    };
  });
};

export const getWorkPost = (id: string): workPost => {
  const fullPath = path.join(worksDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const matterResult = matter(fileContents);
  const contentSpanish = matterResult.content;
  const _ = matter(matterResult.data.body_eng);
  const contentEnglishOut = _.content.split("\n").join("\r\n");

  return {
    date: matterResult.data.date,
    thumbnail: matterResult.data.thumbnail,
    front_page: matterResult.data.front_page,
    title: matterResult.data.title,
    title_eng: matterResult.data.title_eng,
    year: matterResult.data.year,
    // optional
    hero_img: matterResult.data.hero_img
      ? matterResult.data.hero_img
      : undefined,
    medidas: matterResult.data.medidas ? matterResult.data.medidas : undefined,
    front_thumbnail: matterResult.data.front_thumbnail
      ? matterResult.data.front_thumbnail
      : undefined,
    material: matterResult.data.material
      ? matterResult.data.material
      : undefined,
    material_eng: matterResult.data.material_eng
      ? matterResult.data.material_eng
      : undefined,
    locacion: matterResult.data.locacion
      ? matterResult.data.locacion
      : undefined,
    locacion_eng: matterResult.data.locacion_eng
      ? matterResult.data.locacion_eng
      : undefined,
    tecnica: matterResult.data.tecnica ? matterResult.data.tecnica : undefined,
    tecnica_eng: matterResult.data.tecnica_eng
      ? matterResult.data.tecnica_eng
      : undefined,
    // computed
    id,
    contentSpanish,
    contentEnglish: contentEnglishOut,
  };
};

export const getAllWorkPosts = (): Promise<workPost[]> => {
  const fileNames = fs.readdirSync(worksDirectory);
  const allPostsData = async (fileName: string) => {
    const id = fileName.replace(/\.md$/, "");
    const fullPath = path.join(worksDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const matterResult = matter(fileContents);
    const contentSpanish = matterResult.content;
    const _ = matter(matterResult.data.body_eng);
    const contentEnglishOut = _.content.split("\n").join("\r\n");

    var dimensions;
    if (matterResult.data.front_thumbnail) {
      // img probe
      const img = fs.createReadStream(
        path.join(process.cwd(), "public" + matterResult.data.front_thumbnail)
      );
      dimensions = await probe(img);
    }

    return {
      date: matterResult.data.date,
      thumbnail: matterResult.data.thumbnail,
      front_page: matterResult.data.front_page,
      title: matterResult.data.title,
      title_eng: matterResult.data.title_eng,
      year: matterResult.data.year,
      // optional
      hero_img: matterResult.data.hero_img,
      medidas: matterResult.data.medidas,
      front_thumbnail: matterResult.data.front_thumbnail
        ? matterResult.data.front_thumbnail
        : undefined,
      // computed
      id,
      // computed optional
      front_img_w: dimensions ? dimensions.width : undefined,
      front_img_h: dimensions ? dimensions.height : undefined,
    };
  };
  const processFileNames = async () => {
    return await Promise.all(fileNames.map(allPostsData));
  };

  return processFileNames();
};

export const getAllBioPosts = () => {
  const fileNames = fs.readdirSync(bioDirectory);
  const allPostsData: bioPost[] = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, "");
    const fullPath = path.join(bioDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const matterResult = matter(fileContents);
    const contentSpanish = matterResult.content;
    return {
      id,
      date: matterResult.data.date,
      contentSpanish,
    };
  });
  return allPostsData;
};
