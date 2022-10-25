import Image from "next/image";
import { useRouter } from "next/router";
import { workPost } from "../interfaces/interfaces";

interface WorksCatalogueProps {
  posts: workPost[];
}

// const getImages = () => {
//   const filenames = [];
//   for (let i = 0; i < 19; i++) {
//     const name = `/imgs/works/${i + 1}.jpg`;

//     filenames.push(name);
//   }
//   return filenames;
// };

const WorksCatalogue = ({ posts }: WorksCatalogueProps) => {
  // const filenames = getImages();
  const { locale } = useRouter();
  return (
    <div className="ml-2 mr-2 mb-2">
      <div className="pl-1 md:pl-4 pt-6 pb-8 text-3xl">{
            locale === "es" ? "Catálogo de obras" : "All works"
          }</div>
      <div className="grid grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-x-2 gap-y-2">
        {posts.map((post, i) => (
          <div key={i} className="relative h-24 sm:h-32 md:h-44 lg:h-48 w-full cursor-pointer">
            <Image
              src={post.hero_img!}
              objectFit="cover"
              layout="fill"
              alt="imagen"
            />
            <div className="absolute opacity-0 hover:opacity-100 px-2 py-1 left-0 top-0 inset-0 font-bold">
              <div className="text-lg text-white">
                {locale === "es" ? post.title : post.title_eng}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default WorksCatalogue;
