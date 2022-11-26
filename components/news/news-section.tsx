import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";
import { exhibitionsPost } from "../../interfaces/interfaces";

interface NewsSectionProps {
  post: exhibitionsPost;
}

const NewsSection = ({ post }: NewsSectionProps) => {
  const { locale } = useRouter();
  return (
    <div>
      <div className="font-bold text-3xl text-white">
        {locale === "es" ? post.title : post.title_eng}
      </div>
      <ReactMarkdown
        // eslint-disable-next-line
        children={locale === "es" ? post.contentSpanish : post.contentEnglish}
        className="news"
      />
    </div>
  );
};

export default NewsSection;
