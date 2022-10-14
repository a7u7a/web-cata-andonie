import ReactMarkdown from "react-markdown";
import { aboutPost } from "../interfaces/interfaces";

interface AboutProps {
  aboutPost: aboutPost;
}

const About = ({ aboutPost }: AboutProps) => {
  return (
    <div className="pt-8 pb-20">
      <div className="pl-4 text-black text-3xl">{aboutPost.title}</div>
      <div className="pl-4 pr-4 pt-8 text-black text-3xl">
        <ReactMarkdown
          // eslint-disable-next-line
          children={aboutPost.contentSpanish}
          className="about"
        />

        {/* <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos eaque
          iste similique, omnis voluptatum, placeat asperiores dignissimos
          aperiam illo, voluptatibus cupiditate impedit dolorem enim. Odit, ab
          mollitia. Corrupti, repellat dicta?
        </p>
        <br />
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ratione
          eaque ullam animi. Nostrum quibusdam harum iste, recusandae
          reprehenderit eveniet quaerat earum? Asperiores facere ut sapiente
          necessitatibus quia impedit maiores animi.
        </p> */}
      </div>
    </div>
  );
};
export default About;
