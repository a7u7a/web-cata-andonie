import { useRouter } from "next/router";
import { exhibitionsPost } from "../interfaces/interfaces";
import NewsSection from "../components/news/news-section";

interface NewsProps {
  exhibitionsPosts: exhibitionsPost[];
}

const News = ({ exhibitionsPosts }: NewsProps) => {
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
    <div className="pt-0 md:pt-8 pb-20">
      <div className="">
        {/* <div className="font-bold text-7xl mix-blend-difference transition-all duration-75 hover:text-indigo-600 text-white hover:cursor-pointer">
          {locale === "es" ? "Exhibiciones" : "Exhibitions"}
        </div> */}
        <div className="flex flex-col space-y-8 pt-12">
          <NewsSection post={currentSection} />
          <NewsSection post={recentSection} />
          <NewsSection post={upcomingSection} />
        </div>
      </div>
      {/* <div className=" pt-8">
        <div className="flex flex-row space-x-4">
          <div className="flex flex-col w-1/2 mr-1 space-y-2">
            <NewsSection post={currentSection} />
            <NewsSection post={recentSection} />
          </div>
          <div className="flex flex-col w-1/2 ml-1">
            <NewsSection post={upcomingSection} />
          </div>
        </div>
      </div> */}
    </div>
  );
};
export default News;
