import fs from "fs";
import path from "path";
import matter from "gray-matter";
import {
  workPost,
  bioPost,
  bioStatementPost,
  exhibitionsPost,
  aboutPost,
} from "../interfaces/interfaces";
import probe from "probe-image-size";

const worksDirectory = path.join(process.cwd(), "content/obras");
const bioDirectory = path.join(process.cwd(), "content/bio");
const bioStatementDirectory = path.join(process.cwd(), "content/bio_statement");
const exhibitionsDirectory = path.join(process.cwd(), "content/exhibitions");
const aboutDirectory = path.join(process.cwd(), "content/about");
const imagesDirectory = "public/uploads/obras";
const imagesDirectory2 = "/uploads/obras";

export const getAllPostIds = (locales: string[] | undefined) => {
  // modified to return paths for each locale
  const fileNames = fs.readdirSync(worksDirectory);
  const p = [];
  for (const locale of locales!) {
    const paths = fileNames.map((fileName) => {
      return {
        params: {
          id: fileName.replace(/\.md$/, ""),
        },
        locale,
      };
    });
    p.push(paths);
  }
  return [...p[0], ...p[1]];
};

const getImagesPathsAndDimensions = async (id: string) => {
  const fullPath = path.join(imagesDirectory, `${id}`);
  const fullPath2 = path.join(imagesDirectory2, `${id}`);
  // try catch in case imagesDirectory doesnt exist
  try {
    const fileNames = fs.readdirSync(fullPath);

    const pathsAndDims = async (fileName: string) => {
      // console.log("processing file", fileName);
      const img = fs.createReadStream(
        path.join(process.cwd(), fullPath, fileName)
      );
      const dims = await probe(img);
      return {
        w: dims.width,
        h: dims.height,
        path: path.join(fullPath2, fileName),
      };
    };
    const processFileNames = async () => {
      return await Promise.all(fileNames.map(pathsAndDims));
    };
    return processFileNames();
  } catch (e) {
    return [];
  }
};

export const getWorkPost = (id: string): Promise<workPost> => {
  const postData = async (id: string) => {
    const fullPath = path.join(worksDirectory, `${id}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const matterResult = matter(fileContents);
    const contentSpanish = matterResult.content;
    const _ = matter(matterResult.data.body_eng);
    const contentEnglishOut = _.content.split("\n").join("\r\n");

    const pathsAndDims = await getImagesPathsAndDimensions(id);

    return {
      date: matterResult.data.date,
      thumbnail: matterResult.data.thumbnail,
      front_page: matterResult.data.front_page,
      title: matterResult.data.title,
      title_eng: matterResult.data.title_eng,
      title_color: matterResult.data.title_color,
      year: matterResult.data.year,
      // optional
      vimeo_video_gallery:
        matterResult.data.vimeo_video_gallery != "none"
          ? matterResult.data.vimeo_video_gallery
          : "",

      vimeo_front_url:
        matterResult.data.vimeo_front_url != "none"
          ? matterResult.data.vimeo_front_url
          : "",
      hero_img:
        matterResult.data.hero_img != "none" ? matterResult.data.hero_img : "",
      medidas:
        matterResult.data.medidas != "none" ? matterResult.data.medidas : "",
      medidas_eng:
        matterResult.data.medidas_eng != "none"
          ? matterResult.data.medidas_eng
          : "",
      material:
        matterResult.data.material != "none" ? matterResult.data.material : "",
      material_eng:
        matterResult.data.material_eng != "none"
          ? matterResult.data.material_eng
          : "",
      locacion:
        matterResult.data.locacion != "none" ? matterResult.data.locacion : "",
      locacion_eng:
        matterResult.data.locacion_eng != "none"
          ? matterResult.data.locacion_eng
          : "",
      tecnica:
        matterResult.data.tecnica != "none" ? matterResult.data.tecnica : "",
      tecnica_eng: matterResult.data.tecnica_eng
        ? matterResult.data.tecnica_eng
        : "",
      // computed
      id,
      contentSpanish,
      contentEnglish: contentEnglishOut,
      pathsAndDims,
    };
  };
  const processFileNames = async () => {
    return await Promise.resolve(postData(id));
    // return await Promise.all(fileNames.map(allPostsData));
  };

  return processFileNames();
};

export const getAllWorkPosts = (): Promise<workPost[]> => {
  const fileNames = fs.readdirSync(worksDirectory);
  const allPostsData = async (fileName: string) => {
    const id = fileName.replace(/\.md$/, "");
    const fullPath = path.join(worksDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const matterResult = matter(fileContents);
    // const contentSpanish = matterResult.content;
    // const _ = matter(matterResult.data.body_eng);
    // const contentEnglishOut = _.content.split("\n").join("\r\n");

    var dimensions;
    if (matterResult.data.thumbnail) {
      // img probe
      const img = fs.createReadStream(
        path.join(process.cwd(), "public" + matterResult.data.thumbnail)
      );
      dimensions = await probe(img);
    }

    return {
      date: matterResult.data.date,
      vimeo_video_gallery:
        matterResult.data.vimeo_video_gallery != "none"
          ? matterResult.data.vimeo_video_gallery
          : "",
      vimeo_front_url: matterResult.data.vimeo_front_url,
      thumbnail: matterResult.data.thumbnail,
      front_page: matterResult.data.front_page,
      title: matterResult.data.title,
      title_eng: matterResult.data.title_eng,
      title_color: matterResult.data.title_color,
      year: matterResult.data.year,
      // optional
      hero_img: matterResult.data.hero_img,
      medidas: matterResult.data.medidas,
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
    const _ = matter(matterResult.data.body_eng);
    const contentEnglishOut = _.content.split("\n").join("\r\n");
    return {
      id,
      title: matterResult.data.title,
      contentSpanish,
      contentEnglish: contentEnglishOut,
    };
  });
  return allPostsData;
};

export const getBioStatement = (): bioStatementPost => {
  const fileName = "bio_statement.md";
  const id = fileName.replace(/\.md$/, "");
  const fullPath = path.join(bioStatementDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const matterResult = matter(fileContents);
  const contentSpanish = matterResult.content;
  const _ = matter(matterResult.data.body_eng);
  const contentEnglishOut = _.content.split("\n").join("\r\n");

  return {
    id,
    title: matterResult.data.title,
    contentSpanish,
    contentEnglish: contentEnglishOut,
  };
};

export const getAbout = (): aboutPost => {
  const fileName = "about.md";
  const id = fileName.replace(/\.md$/, "");
  const fullPath = path.join(aboutDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const matterResult = matter(fileContents);
  const contentSpanish = matterResult.content;
  const _ = matter(matterResult.data.body_eng);
  const contentEnglishOut = _.content.split("\n").join("\r\n");
  // console.log("matterResult test", matterResult);
  return {
    id,
    title: matterResult.data.title,
    title_eng: matterResult.data.title_eng,
    contentSpanish,
    contentEnglish: contentEnglishOut,
  };
};

export const getAllExhibitionsPosts = () => {
  const fileNames = fs.readdirSync(exhibitionsDirectory);

  const allPostsData: exhibitionsPost[] = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, "");
    const fullPath = path.join(exhibitionsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const matterResult = matter(fileContents);
    const contentSpanish = matterResult.content;
    const _ = matter(matterResult.data.body_eng);
    const contentEnglishOut = _.content.split("\n").join("\r\n");
    return {
      id,
      title: matterResult.data.title,
      title_eng: matterResult.data.title_eng,
      contentSpanish,
      contentEnglish: contentEnglishOut,
      show: matterResult.data.show,
    };
  });
  return allPostsData;
};
