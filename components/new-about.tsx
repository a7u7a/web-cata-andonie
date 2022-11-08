import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";
import { aboutPost } from "../interfaces/interfaces";

interface AboutProps {
  post: aboutPost;
}

const About = ({ post }: AboutProps) => {
  const { locale } = useRouter();

  return (
    <div className="pt-8 pb-10 w-1/2 md:pb-20">
      {/* <div className="pl-1 md:pl-4 text-white text-3xl">
        {locale === "es" ? post.title : post.title_eng}
      </div> */}
      <div className="pl-1 md:pl-4 pr-1 md:pr-4 pt-8 text-3xl">
        <ReactMarkdown
          // eslint-disable-next-line
          children={
            locale === "es"
              ? post.contentSpanish
              : post.contentEnglish
          }
          className="newAbout"
        />
      </div>
    </div>
  );
};
export default About;
