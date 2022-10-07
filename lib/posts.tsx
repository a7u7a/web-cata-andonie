import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { workPost } from "../interfaces/interfaces";
// import probe from "probe-image-size";

const worksDirectory = path.join(process.cwd(), "content/works");
const postsDir = "";

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
  };
};

// export const getPosts = (): Promise<workPost[]> => {
//     const fileNames = fs.readdirSync(postsDir)
//     const allPostsData = async (fileName: string) => {
//         const id = fileName.replace(/\.md$/, '')
//         const fullPath = path.join(postsDir, fileName)
//         const fileContents = fs.readFileSync(fullPath, 'utf8')
//         const matterResult = matter(fileContents)
//         const body = matterResult.content
//         const img = fs.createReadStream(path.join(process.cwd(), "public" + matterResult.data.image))
//         const dimensions = await probe(img)
//         return {
//             id,
//             body,
//             title: matterResult.data.title,
//             date: matterResult.data.date,
//             image: matterResult.data.image,
//             alt: matterResult.data.alt,
//             category: matterResult.data.category,
//             imgWidth: dimensions.width,
//             imgHeight: dimensions.height
//         }
//     }
//     const processFileNames = async () => {
//         return await Promise.all(fileNames.map(allPostsData))
//     }

//     return processFileNames()
// }
