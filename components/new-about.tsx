import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";
import { aboutPost } from "../interfaces/interfaces";
import { ArrowLeft, ArrowRight } from "phosphor-react";
import Link from "next/link";

interface AboutProps {
  post: aboutPost;
}

const About = ({ post }: AboutProps) => {
  const { locale } = useRouter();

  // const post = {
  //   contentEnglish: `Ambiguity has a wide-range of associations and, at the same time, a lack of them.  That is what, in a certain sense, makes it resist classification, cancelling it and making it inaccessible and operational as such. \n
  //  My sculptures and installations refer to preexistent objects or works to elaborate pieces where there is an experimentation towards ambiguity, mostly objects reproduced through archives, found objects, and redesigned objects.`,
  //   contentSpanish: `La ambigüedad tiene una diversidad de referentes y, al mismo tiempo, una falta de ellos. Eso es lo que en cierto sentido la hace resistente a una clasificación, anulándola y haciéndola impenetrable y operativa como tal. \n
  //   Mis esculturas e instalaciones hacen referencia a objetos preexistentes para elaborar piezas donde exista una experimentación en torno a esa ambigüedad. En su mayoría objetos reproducidos a través de archivos, objetos rescatados y objetos rediseñados.`,
  // };

  return (
    <div className="relative bg-white p-6 pt-12 pb-12 flex flex-row justify-between">
      {/* <div className="pl-1 md:pl-4 text-white text-3xl">
        {locale === "es" ? post.title : post.title_eng}
      </div> */}
      <div className="max-w-max w-2/3">
        <ReactMarkdown
          // eslint-disable-next-line
          children={locale === "es" ? post.contentSpanish : post.contentEnglish}
          className="newAbout"
        />
      </div>

      <div className="relative">
        <div className="absolute flex flex-col items-end bottom-0 right-0 w-40">
          <Link href={"/new-bio"}>
            <div className="hover:underline hover:cursor-pointer">
              <div className="text-4xl text-right font-bold">Full Bio</div>
              <ArrowRight size={38} weight="bold" color="black" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default About;
