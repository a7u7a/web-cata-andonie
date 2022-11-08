import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";
import { aboutPost } from "../interfaces/interfaces";

interface AboutProps {
  post: aboutPost;
}

const About = ({ post }: AboutProps) => {
  const { locale } = useRouter();

  return (
    <div className="w-1/2 pb-24">
      {/* <div className="pl-1 md:pl-4 text-white text-3xl">
        {locale === "es" ? post.title : post.title_eng}
      </div> */}
      <div className="text-3xl">
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
