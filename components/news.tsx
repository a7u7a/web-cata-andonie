import { exhibitionsPost } from "../interfaces/interfaces";
import NewsSection from "../components/news/news-section";

interface NewsProps {
  exhibitionsPosts: exhibitionsPost[];
}

const News = ({ exhibitionsPosts }: NewsProps) => {

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
    <div className="pt-8 pb-8">
      <div className="flex flex-row justify-between pl-1 md:pl-4 pr-1 md:pr-4">
        <div className="text-3xl">Exhibitions</div>
      </div>
      <div className="pl-1 md:pl-4 pr-1 md:pr-4 pt-8">
        <div className="flex flex-row space-x-4">
          <div className="flex flex-col w-1/2 mr-1">
            <NewsSection post={currentSection} />
            <NewsSection post={recentSection} />
            {/* <div className="font-bold text-xl">Current</div>
            <ul className="space-y-1">
              <li>Group Show, The name of a current show, more info.</li>
            </ul>
            <div className="font-bold text-xl mt-2">Recent</div>
            <ul className="space-y-1">
              <li>Group Show, The name of a current show, more info.</li>
              <li>Group Show, The name of a current show, more info.</li>
            </ul> */}
          </div>

          <div className="flex flex-col w-1/2 ml-1">
          <NewsSection post={upcomingSection} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default News;
