import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";
import { workPost } from "../../interfaces/interfaces";

interface PostCardProps {
  post: workPost;
}

const PostCard = ({ post }: PostCardProps) => {
  const { locale } = useRouter();
  console.log("post", post);
  // const tableData = [
  //   "Acero, textil impermeable y espuma",
  //   "150 x 290 x 223 cm",
  //   "Ubicacion de la obra",
  //   "Fotografia Isidora Rodriguez",
  //   "2019",
  // ];

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
    <div className="flex flex-col p-2 pl-4 ">
      <div className="mt-14 text-3xl font-bold">
        Titulo quaerat labore nulla
      </div>
      <div className="text-sm font-bold text-gray-600">
        <ul className="mt-20 space-y-[0.4rem] w-1/2 ">
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
      
      <div className="mt-20 pr-2  pb-20">
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
