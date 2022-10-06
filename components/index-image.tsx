import Image from "next/image";

interface IndexImageProps {
  src: string;
  h: number;
  w: number;
}

// todo: custom shader transition on hover

const IndexImage = ({ src, h, w }: IndexImageProps) => {
  return (
    <div className={`cursor-pointer w-full relative ${h > w ? "h-[25rem]" : "h-[60rem]"}`}>
      <Image
        src={src}
        objectFit="cover"
        layout="fill"
        alt="imagen"
      />

      <div className="absolute opacity-0 hover:opacity-100 left-0 top-0 inset-0 font-bold">
        <div className="text-xl p-6 text-white">Title</div>
      </div>
    </div>
  );
};
export default IndexImage;
