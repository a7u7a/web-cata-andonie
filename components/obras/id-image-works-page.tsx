import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import useMediaQuery from "../../lib/media";

// import {triplet, keyStr, rgbDataURL} from "../../lib/utils"

interface IndexImageProps {
  src: string;
  h: number;
  w: number;
  title: string;
  title_eng: string;
  year: number;
  title_color: string;
  id: string;
  lowResPath: string;
}

const IdImageWorksPage = ({
  src,
  h,
  w,
  year,
  title,
  title_eng,
  title_color,
  id,
  lowResPath,
}: IndexImageProps) => {
  const isSm = useMediaQuery("(max-width: 640px)");
  const { locale } = useRouter();
  const [hovered, setHovered] = useState(false);
  const [showTitle, setShowTitle] = useState(false);

  useEffect(() => {
    if (isSm) {
      setShowTitle(true);
    } else {
      if (hovered) {
        setShowTitle(true);
      } else {
        setShowTitle(false);
      }
    }
  }, [hovered, isSm]);

  return (
    <Link href={"obras/" + id}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={`w-full relative cursor-pointer ${
          w > h ? "aspect-[4/3]" : "aspect-[3/4]"
        }`}
      >
        <Image
          placeholder="blur"
          blurDataURL={lowResPath}
          src={src}
          objectFit="cover"
          layout="fill"
          alt="imagen"
        />

        <div
          className={`absolute w-2/3 mx-3 md:mx-4 my-2 md:my-1 left-0 top-0 text-3xl transition-all duration-200 ${
            showTitle ? "opacity-100 translate-y-2" : "opacity-0 translate-y-0"
          } 
        ${title_color === "white" ? "text-white" : "text-black"}
        
        `}
        >
          {locale === "es" ? title : title_eng}
        </div>

        <div className="absolute mx-4 my-1 right-0 top-0">
          <div
            className={`text-3xl transition-all duration-200 ${
              showTitle ? "opacity-100 translate-y-2" : "opacity-0 translate-y-0"
            } 
          ${title_color === "white" ? "text-white" : "text-black"}`}
          >
            {year}
          </div>
        </div>
      </div>
    </Link>
  );
};
export default IdImageWorksPage;
