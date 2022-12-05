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
//     const name = `/imgs/obras/${i + 1}.jpg`;

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
    <div className="relative">
      <div className="bg-white">
        <div className="w-1/2 text-7xl pt-4 mix-blend-difference transition-all duration-75 hover:text-indigo-600 text-white hover:cursor-pointer">
          <div className="pl-4 pt-20 pb-8 font-bold text-7xl">
            {locale === "es" ? "Catálogo de obras" : "All works"}
          </div>
        </div>
      </div>
      <div className="relative grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 ">
        {posts.map((post, i) => (
          <CatalogueImage key={i} post={post} />
        ))}
      </div>
    </div>
  );
};
export default WorksCatalogue;
