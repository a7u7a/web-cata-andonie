import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";
import { workPost } from "../../interfaces/interfaces";

interface PostCardProps {
  post: workPost;
}

const PostCard = ({ post }: PostCardProps) => {
  const { locale } = useRouter();

  const _ = [
    locale === "es" ? post.material : post.material_eng,
    locale === "es" ? post.medidas : post.medidas_eng,
    locale === "es" ? post.tecnica : post.tecnica_eng,
    locale === "es" ? post.locacion : post.locacion_eng,
    post.year,
  ];

  // cleanup empty strings
  const tableData = _.filter((field) => field);

  return (
    <div className="flex flex-col p-2 md:pl-4">
      <div className="mt-8 md:mt-14 text-3xl font-bold">
        {locale === "es" ? post.title! : post.title_eng!}
      </div>
      <div className="text-sm font-bold text-gray-600">
        <ul className="mt-12 md:mt-20 space-y-[0.4rem] w-full md:w-1/2">
          {tableData.map((row, i) => (
            <li
              key={i}
              className={`border-black pb-1 mr-4 ${
                i === tableData.length - 1 ? "border-b-0" : "border-b-2"
              }`}
            >
              {row}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-10 md:mt-20 pr-0 md:pr-2 pb-10 md:pb-20">
        <ReactMarkdown
          // eslint-disable-next-line
          children={
            locale === "es" ? post.contentSpanish! : post.contentEnglish!
          }
          className="work"
        />
      </div>
    </div>
  );
};
export default PostCard;
