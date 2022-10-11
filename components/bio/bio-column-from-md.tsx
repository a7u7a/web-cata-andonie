import ReactMarkdown from "react-markdown";
import { bioPost } from "../../interfaces/interfaces";

interface BioColumnFromMarkdownProps {
  bioPost: bioPost;
  proseClass: string;
}

const BioColumnFromMarkdown = ({
  bioPost,
  proseClass,
}: BioColumnFromMarkdownProps) => {
    return (
      // eslint-disable-next-line
    <ReactMarkdown children={bioPost.contentSpanish} className={proseClass} />
  );
};

export default BioColumnFromMarkdown;
