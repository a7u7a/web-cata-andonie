import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { workPost } from "../../interfaces/interfaces";
import VideoHero from "../video-hero";
import { ArrowRight } from "phosphor-react";

interface WorksSectionProps {
  posts: workPost[];
  title?: boolean;
  nextButton?: boolean;
  backButton?: boolean;
}

const SelectedWorks = ({
  posts,
  title = false,
  nextButton = false,
  backButton = false,
}: WorksSectionProps) => {
  const { locale } = useRouter();
  const router = useRouter();
  const [hovered, setHovered] = useState(false);

  return (
    <div className="relative bg-black">
      <div className="absolute top-0 inset-x-0 flex flex-col md:flex-row justify-between z-40 p-3 md:p-6 text-5xl md:text-6xl break-words mix-blend-difference text-white">
        <a>{locale === "es" ? "OBRAS SELECCIONADAS" : "SELECTED WORKS"}</a>

        <Link href={"/obras"}>
          <div className="flex flex-col items-end justify-end text-white hover:underline hover:cursor-pointer">
            <div className="pt-1 text-3xl text-right">
              {locale === "es" ? "Ver todas" : "All works"}
            </div>
            <ArrowRight size={38} weight="bold" color="white" />
          </div>
        </Link>      
      </div>

      <VideoHero />
    </div>
  );
};
export default SelectedWorks;
