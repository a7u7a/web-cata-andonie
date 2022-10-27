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
      <div className="font-bold text-xl">
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
