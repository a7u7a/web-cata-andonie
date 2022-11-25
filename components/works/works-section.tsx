import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { workPost } from "../../interfaces/interfaces";
import WorksImage from "./../works/works-image";

interface WorksCatalogueProps {
  posts: workPost[];
}

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
      <div className="pl-1 md:pl-4 pt-12 pb-12 text-6xl font-bold mix-blend-difference transition-all duration-300 hover:text-indigo-600 text-black hover:cursor-pointer">
        {locale === "es" ? "Catálogo de obras" : "All works"}
      </div>
      <div className="grid grid-cols-2 gap-y-2">
        {posts.map((post, i) => (
          <WorksImage key={i} post={post} />
        ))}
      </div>
    </div>
  );
};
export default WorksCatalogue;
