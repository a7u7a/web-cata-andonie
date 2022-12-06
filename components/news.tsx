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
    <div id="exhibitions" className="relative">
      {/* <div className="absolute w-full h-full">
        <PageBackground
          progress={0.5}
          scale={0.8}
          src={"/shader-backgrounds/1.jpeg"}
          imgAspect={1.77}
          imgScale={2.0}
          speed={-0.02}
          brightness={-0.5}
          scroll={scroll}
        />
      </div> */}
      <div className="relative w-screen p-6 pt-10 pb-10 bg-white">
        <div className="text-6xl text-black">
          {locale === "es" ? "Exhibiciones" : "Shows"}
        </div>
        <div className="pt-10">
          <div className="flex flex-row space-y-4">
            <div className="flex flex-col w-1/2 space-y-12">
              {currentSection.show ? (
                // only show when selector is true
                <NewsSection post={currentSection} />
              ) : (
                <></>
              )}

              {upcomingSection.show ? (
                // only show when selector is true
                <NewsSection post={upcomingSection} />
              ) : (
                <></>
              )}
            </div>
            <div className="flex flex-col w-1/2">
              {recentSection.show ? (
                // only show when selector is true
                <NewsSection post={recentSection} />
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default News;
