import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";
import { workPost } from "../../interfaces/interfaces";
import { ArrowLeft, ArrowRight } from "phosphor-react";
interface PostCardProps {
  post: workPost;
}

const PostCard = ({ post }: PostCardProps) => {
  const { locale } = useRouter();
  const router = useRouter();

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
    <div className="relative flex flex-col bg-white p-6">
      {/* <div className="mt-8 text-6xl text-gray-700">
        {locale === "es" ? post.title! : post.title_eng!}
      </div> */}
      <div className="text-xl text-gray-700">
        <ul className="pt-6 space-y-[0.4rem] w-1/2">
          {tableData.map((row, i) => (
            <li
              key={i}
              className={`border-gray-700 pb-1 mr-4 ${
                i === tableData.length - 1 ? "border-b-0" : "border-b-2"
              }`}
            >
              {row}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-10 pb-10">
        <ReactMarkdown
          // eslint-disable-next-line
          children={
            locale === "es" ? post.contentSpanish! : post.contentEnglish!
          }
          className="work"
        />
      </div>
      <div className="w-full">
        <button onClick={() => router.back()}>
          <div className="flex flex-col items-start hover:underline hover:cursor-pointer">
            <div className="text-4xl text-left">{locale === "es" ? "Atrás" : "Back"}</div>
            <ArrowLeft size={38} weight="bold" color="black" />
          </div>
        </button>
      </div>
    </div>
  );
};
export default PostCard;
