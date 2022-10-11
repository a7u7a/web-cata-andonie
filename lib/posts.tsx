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
    id,
    title: matterResult.data.title,
    date: matterResult.data.date,
    thumbnail: matterResult.data.thumbnail,
    contentSpanish,
    tags: matterResult.data.tags,
    hero_img: matterResult.data.hero_img,
    title_eng: matterResult.data.title_eng,
    contentEnglish: contentEnglishOut,
    category: matterResult.data.category,
    front_page: matterResult.data.front_page,
    front_thumbnail: matterResult.data.front_thumbnail,
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

    // img probe
    const img = fs.createReadStream(
      path.join(process.cwd(), "public" + matterResult.data.front_thumbnail)
    );
    const dimensions = await probe(img);

    return {
      id,
      title: matterResult.data.title,
      date: matterResult.data.date,
      thumbnail: matterResult.data.thumbnail,
      contentSpanish,
      tags: matterResult.data.tags,
      hero_img: matterResult.data.hero_img,
      title_eng: matterResult.data.title_eng,
      contentEnglish: contentEnglishOut,
      category: matterResult.data.category,
      front_page: matterResult.data.front_page,
      front_thumbnail: matterResult.data.front_thumbnail,
      front_img_w: dimensions.width,
      front_img_h: dimensions.height,
    };
  };
  const processFileNames = async () => {
    return await Promise.all(fileNames.map(allPostsData));
  };

  return processFileNames();
};

// export const getAllBioPosts = (): Promise<bioPost[]> => {
//   const fileNames = fs.readdirSync(bioDirectory);

//   const allPostsData = async (fileName: string) => {
//     const id = fileName.replace(/\.md$/, "");
//     const fullPath = path.join(bioDirectory, fileName);
//     const fileContents = fs.readFileSync(fullPath, "utf8");
//     const matterResult = matter(fileContents);
//     const contentSpanish = matterResult.content;
//     return {
//       id,
//       title: matterResult.data.title,
//       date: matterResult.data.date,
//       contentSpanish,
//     };
//   };
//   const processFileNames = async () => {
//     return await Promise.all(fileNames.map(allPostsData));
//   };

//   return processFileNames();
// };

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
      title: matterResult.data.title,
      date: matterResult.data.date,
      contentSpanish,
    };
  });
  return allPostsData;
};
