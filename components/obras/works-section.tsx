import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { workPost } from "../../interfaces/interfaces";
import WorksImage from "./../obras/works-image";
import VideoHero from "../../components/new-video-hero";
import { ArrowLeft, ArrowRight } from "phosphor-react";

interface WorksSectionProps {
  posts: workPost[];
  title?: boolean;
  nextButton?: boolean;
  backButton?: boolean;
}

const WorksSection = ({
  posts,
  title = false,
  nextButton = false,
  backButton = false,
}: WorksSectionProps) => {
  // const filenames = getImages();
  const { locale } = useRouter();
  const router = useRouter();
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    posts.sort((a, b) => {
      return new Date(b.date).valueOf() - new Date(a.date).valueOf();
    });
  }, []);

  return (
    <div className="relative bg-black">
      {/* <div className="flex flex-row justify-between">
        {title ? (
          <div className="pt-10 pb-10 pl-6 text-6xl font-bold transition-all duration-300 hover:text-indigo-600 text-white hover:cursor-pointer">
            {locale === "es" ? "Obras seleccionadas" : "Selected Works"}
          </div>
        ) : (
          <></>
        )}
        {nextButton ? (
          <Link href={"/obras"}>
            <div className="flex flex-col items-end justify-end text-white hover:underline hover:cursor-pointer pb-8 pr-6">
              <div className="text-3xl text-right">
                {locale === "es" ? "Ver todas" : "All works"}
              </div>
              <ArrowRight size={38} weight="bold" color="white" />
            </div>
          </Link>
        ) : (
          <></>
        )}
      </div> */}

      <div className="absolute flex flex-col z-50 p-6 text-6xl mix-blend-difference text-white">
        {locale === "es" ? "Obras seleccionadas" : "Selected Works"}
      </div>

      <div className="absolute right-0 top-0 p-6 z-40 mix-blend-difference">
        <Link href={"/obras"}>
          <div className="flex flex-col items-end justify-end text-white hover:underline hover:cursor-pointer">
            <div className="text-3xl text-right">
              {locale === "es" ? "Ver todas" : "All works"}
            </div>
            <ArrowRight size={38} weight="bold" color="white" />
          </div>
        </Link>
      </div>

      <VideoHero />

      {/* <div className="ml-1 mr-1 grid grid-cols-2 gap-y-1 gap-x-1">
        {posts.map((post, i) => (
          <WorksImage key={i} post={post} />
        ))}
        {backButton ? (
          <div className="w-full p-4">
            <button onClick={() => router.back()}>
              <div className="flex flex-col items-start hover:underline hover:cursor-pointer pr-6">
                <div className="text-4xl text-left font-bold">Back</div>
                <ArrowLeft size={38} weight="bold" color="black" />
              </div>
            </button>
          </div>
        ) : (
          <></>
        )}
      </div>
      {nextButton ? (
        <div className="w-full pt-6">
          <Link href={"/obras"}>
            <div className="flex flex-col items-end hover:underline hover:cursor-pointer pr-6">
              <div className="text-4xl text-right font-bold">
                {locale === "es" ? "Todas las obras" : "All works"}
              </div>
              <ArrowRight size={38} weight="bold" color="black" />
            </div>
          </Link>
        </div>
      ) : (
        <></>
      )} */}
    </div>
  );
};
export default WorksSection;