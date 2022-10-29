import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface IndexImageProps {
  src: string;
  title: string;
  href: string;
  h: number;
  w: number;
}

// todo: custom shader transition on hover

const IndexImage = ({ src, h, w, title, href }: IndexImageProps) => {
  const [hovered, setHovered] = useState(false);
  return (
    <Link href={href}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={`cursor-pointer w-full relative ${
          h > w ? "aspect-[3/4]" : "aspect-[4/3]"
        }`}
      >
        <Image src={src} objectFit="cover" layout="fill" alt="imagen" />

        <div className="absolute left-0 top-0 inset-0">
          <div
            className={`opacity-100 font-base text-3xl p-3 md:p-6 text-white transition-opacity duration-200 ${
              hovered ? "opacity-100" : "md:opacity-0"
            }`}
          >
            {title}
          </div>
        </div>
      </div>
    </Link>
  );
};
export default IndexImage;
