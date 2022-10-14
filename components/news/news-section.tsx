import ReactMarkdown from "react-markdown";
import { exhibitionsPost } from "../../interfaces/interfaces";

interface NewsSectionProps {
  post: exhibitionsPost;
}

const NewsSection = ({ post }: NewsSectionProps) => {
  return (
    <div>
      <div className="font-bold text-xl">{post.title}</div>
      <ReactMarkdown
        // eslint-disable-next-line
        children={post.contentSpanish}
        className="news"
      />
    </div>
  );
};

export default NewsSection;
