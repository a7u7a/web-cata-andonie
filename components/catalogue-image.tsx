import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { workPost } from "../interfaces/interfaces";

interface CatalogueImageProps {
  post: workPost;
}

const CatalogueImage = ({ post }: CatalogueImageProps) => {
  const { locale } = useRouter();
  const [hovered, setHovered] = useState(false);

  return (
    <Link href={"works/" + post.id}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative h-44 sm:h-64 md:h-44 lg:h-48 w-full cursor-pointer"
      >
        <Image
          src={post.thumbnail!}
          objectFit="cover"
          layout="fill"
          alt="imagen"
        />
        <div className="absolute mx-2 my-1 left-0 top-0 inset-0">
          <div
            className={`text-base md:text-lg text-white break-words transition-opacity duration-200 ${
              hovered ? "opacity-100" : "md:opacity-0"
            }`}
          >
            {locale === "es" ? post.title : post.title_eng}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CatalogueImage;
