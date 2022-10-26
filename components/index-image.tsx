import Image from "next/image";
import Link from "next/link";

interface IndexImageProps {
  src: string;
  title: string;
  href: string;
  h: number;
  w: number;
}

// todo: custom shader transition on hover

const IndexImage = ({ src, h, w, title, href }: IndexImageProps) => {
  return (
    <Link href={href}>
      <div
        className={`cursor-pointer w-full relative ${
          h > w ? "aspect-[3/4]" : "aspect-[4/3]"
        }`}
      >
        <Image src={src} objectFit="cover" layout="fill" alt="imagen" />

        <div className="absolute opacity-100 md:opacity-0 hover:opacity-100 left-0 top-0 inset-0 font-bold">
          <div className="text-xl p-3 md:p-6 text-white">{title}</div>
        </div>
      </div>
    </Link>
  );
};
export default IndexImage;
