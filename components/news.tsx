import { useRouter } from "next/router";
import { exhibitionsPost } from "../interfaces/interfaces";
import NewsSection from "../components/news/news-section";
import PageBackground from "../components/stacking-effects3/index";

interface NewsProps {
  exhibitionsPosts: exhibitionsPost[];
  scroll: number;
}

const News = ({ exhibitionsPosts, scroll }: NewsProps) => {
  const { locale } = useRouter();
  // assumes only one per section
  const currentSection = exhibitionsPosts.filter(
    (post) => post.id === "current"
  )[0];
  const recentSection = exhibitionsPosts.filter(
    (post) => post.id === "recent"
  )[0];
  const upcomingSection = exhibitionsPosts.filter(
    (post) => post.id === "upcoming"
  )[0];

  return (
    <div className="relative">
      <div className="absolute w-full h-full">
        <PageBackground
          progress={0.5}
          scale={0.8}
          src={"/shader-backgrounds/1.jpg"}
          imgAspect={1.77}
          imgScale={2.0}
          speed={-0.02}
          brightness={-0.4}
          scroll={scroll}
        />
      </div>
      <div className="relative w-screen p-4 pt-16 pb-8">
        <div className="text-6xl  font-bold mix-blend-difference transition-all duration-300 hover:text-indigo-600 text-white hover:cursor-pointer">
          {locale === "es" ? "Exhibiciones" : "Exhibitions"}
        </div>
        <div className="pt-16">
          <div className="flex flex-row space-x-4">
            <div className="flex flex-col w-1/2 mr-1 space-y-12">
              <NewsSection post={currentSection} />
              <NewsSection post={recentSection} />
            </div>
            <div className="flex flex-col w-1/2 ml-1">
              <NewsSection post={upcomingSection} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default News;
