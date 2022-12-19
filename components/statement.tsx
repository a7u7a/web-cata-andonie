import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";
import { aboutPost } from "../interfaces/interfaces";

interface AboutProps {
  post: aboutPost;
}

const Statement = ({ post }: AboutProps) => {
  const { locale } = useRouter();

  // const post = {
  //   contentEnglish: `Ambiguity has a wide-range of associations and, at the same time, a lack of them.  That is what, in a certain sense, makes it resist classification, cancelling it and making it inaccessible and operational as such. \n
  //  My sculptures and installations refer to preexistent objects or works to elaborate pieces where there is an experimentation towards ambiguity, mostly objects reproduced through archives, found objects, and redesigned objects.`,
  //   contentSpanish: `La ambigüedad tiene una diversidad de referentes y, al mismo tiempo, una falta de ellos. Eso es lo que en cierto sentido la hace resistente a una clasificación, anulándola y haciéndola impenetrable y operativa como tal. \n
  //   Mis esculturas e instalaciones hacen referencia a objetos preexistentes para elaborar piezas donde exista una experimentación en torno a esa ambigüedad. En su mayoría objetos reproducidos a través de archivos, objetos rescatados y objetos rediseñados.`,
  // };

  return (
    <div className="relative p-3 md:p-6 md:pt-48 pt-48 pb-16 md:pb-28 flex flex-col">
      <div className="w-full lg:w-2/3">
        <ReactMarkdown
          // eslint-disable-next-line
          children={locale === "es" ? post.contentSpanish : post.contentEnglish}
          className="statement"
        />
      </div>
    </div>
  );
};
export default Statement;
