import { useEffect } from "react";
import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";
import { aboutPost } from "../interfaces/interfaces";

interface AboutProps {
  aboutPost: aboutPost;
}

const About = ({ aboutPost }: AboutProps) => {
  const { locale, locales } = useRouter();
  console.log("locales",locales);

  return (
    <div className="pt-8 pb-20">
      <div className="pl-4 text-black text-3xl">
        {locale === "es" ? aboutPost.title : aboutPost.title_eng}
      </div>
      <div className="pl-4 pr-4 pt-8 text-black text-3xl">
        <ReactMarkdown
          // eslint-disable-next-line
          children={
            locale === "es"
              ? aboutPost.contentSpanish
              : aboutPost.contentEnglish
          }
          className="about"
        />
      </div>
    </div>
  );
};
export default About;
