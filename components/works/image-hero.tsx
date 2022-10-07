import Image from "next/image";

interface ImageHeroProps {
  src: string;
}

const ImageHero = ({ src }: ImageHeroProps) => {
  return (
    <div className="relative w-screen h-[100vh]">
      <Image src={src} objectFit="cover" layout="fill" alt="imagen" />
    </div>
  );
};
export default ImageHero;
