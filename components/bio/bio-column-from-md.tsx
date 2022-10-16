import ReactMarkdown from "react-markdown";
import { bioPost } from "../../interfaces/interfaces";

interface BioColumnFromMarkdownProps {
  post: bioPost;
}

const BioColumnFromMarkdown = ({ post }: BioColumnFromMarkdownProps) => {
  
  return (
    <ReactMarkdown
      // eslint-disable-next-line
      children={post.contentSpanish}
      className="bio"
      components={{
        // this should go into a separate component
        h1: ({ node, ...props }) => {
          const id = props.children[0] as string;

          return <h1 {...props} id={id.replaceAll(" ", "_")} />;
        },
      }}
    />
  );
};

export default BioColumnFromMarkdown;
