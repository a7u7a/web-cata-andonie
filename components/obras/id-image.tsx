import Image from "next/image";

interface IndexImageProps {
  src: string;
  h: number;
  w: number;
  lowResSrc: string;
}

// todo: custom shader transition on hover

const IdImage = ({ src, h, w, lowResSrc }: IndexImageProps) => {
  return (
    <div
      className={`w-full relative ${w > h ? "aspect-[4/3]" : "aspect-[3/4]"}`}
    >
      <Image
        placeholder="blur"
        blurDataURL={lowResSrc}
        src={src}
        objectFit="cover"
        layout="fill"
        alt="imagen"
      />
    </div>
  );
};
export default IdImage;
