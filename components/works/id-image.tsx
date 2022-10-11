import Image from "next/image";
import Link from "next/link";

interface IndexImageProps {
  src: string;
  h: number;
  w: number;
}

// todo: custom shader transition on hover

const IdImage = ({ src, h, w }: IndexImageProps) => {
  return (
    <div
      className={`w-full relative ${
        h > w ? "aspect-[4/3]" : "aspect-[3/4]"
      }`}
    >
      <Image src={src} objectFit="cover" layout="fill" alt="imagen" />
    </div>
  );
};
export default IdImage;
