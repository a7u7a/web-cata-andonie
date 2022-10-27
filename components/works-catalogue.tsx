import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { workPost } from "../interfaces/interfaces";
import CatalogueImage from "./catalogue-image";

interface WorksCatalogueProps {
  posts: workPost[];
}

// const getImages = () => {
//   const filenames = [];
//   for (let i = 0; i < 19; i++) {
//     const name = `/imgs/works/${i + 1}.jpg`;

//     filenames.push(name);
//   }
//   return filenames;
// };

const WorksCatalogue = ({ posts }: WorksCatalogueProps) => {
  // const filenames = getImages();
  const { locale } = useRouter();
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    posts.sort((a, b) => {
      return new Date(b.date).valueOf() - new Date(a.date).valueOf();
    });
  }, []);

  return (
    <div className="ml-2 mr-2 mb-2">
      <div className="pl-1 md:pl-4 pt-6 pb-8 text-3xl">
        {locale === "es" ? "Catálogo de obras" : "All works"}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-x-2 gap-y-2">
        {posts.map((post, i) => (
          <CatalogueImage key={i} post={post} />
        ))}
      </div>
    </div>
  );
};
export default WorksCatalogue;
