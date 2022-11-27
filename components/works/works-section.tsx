import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { workPost } from "../../interfaces/interfaces";
import WorksImage from "./../works/works-image";
import { ArrowLeft, ArrowRight } from "phosphor-react";

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
    <div className="relative bg-white">
      <div className="flex flex-row justify-between">
        <div className="pt-16 pb-16 pl-6 text-6xl font-bold transition-all duration-300 hover:text-indigo-600 text-black hover:cursor-pointer">
          {locale === "es" ? "Obras seleccionadas" : "Selected works"}
        </div>

        <Link href={"/works"}>
          <div className="flex flex-col items-end justify-end hover:underline hover:cursor-pointer pb-6 pr-6">
            <div className="text-4xl text-right font-bold">See all</div>
            <ArrowRight size={38} weight="bold" color="black" />
          </div>
        </Link>
      </div>

      <div className="ml-1 mr-1 grid grid-cols-2 gap-y-1 gap-x-1">
        {posts.map((post, i) => (
          <WorksImage key={i} post={post} />
        ))}
      </div>
      <div className="w-full p-4">
        <Link href={"/new-bio"}>
          <div className="flex flex-col items-end hover:underline hover:cursor-pointer">
            <div className="text-4xl text-right font-bold">See all</div>
            <ArrowRight size={38} weight="bold" color="black" />
          </div>
        </Link>
      </div>
    </div>
  );
};
export default WorksCatalogue;
