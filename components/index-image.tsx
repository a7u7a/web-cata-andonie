import Image from "next/image";

interface IndexImageProps {
  src: string;
}

const IndexImage = ({ src }: IndexImageProps) => {
  return (
    <div className="w-full h-96 relative">
      <Image
        className="cursor-pointer"
        src={src}
        objectFit="cover"
        layout="fill"
        alt="imagen"
      />
    </div>
  );
};
export default IndexImage;
