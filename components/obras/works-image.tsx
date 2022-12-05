import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { workPost } from "../../interfaces/interfaces";
import ImageWithParallelRefraction from "../parallel-refraction/index";

interface CatalogueImageProps {
  post: workPost;
}

const WorksImage = ({ post }: CatalogueImageProps) => {
  const { locale } = useRouter();
  const [hovered, setHovered] = useState(false);

  return (
    <Link href={"works/" + post.id}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative h-96 w-full cursor-pointer "
      >
        <Image
          src={post.thumbnail!}
          objectFit="cover"
          layout="fill"
          alt="imagen"
        />
        <div className="absolute mx-3 my-2 left-0 bottom-0">
          <div
            className={`text-lg md:text-2xl text-white break-words transition-all duration-200 ${
              hovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
            }`}
          >
            {locale === "es" ? post.title : post.title_eng}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default WorksImage;
