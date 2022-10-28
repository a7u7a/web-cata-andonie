import BackgroundShader from "../components/background-wobble";

const Testing = () => {
  return (
    <div className="">
      <div className="absolute w-full h-96">
        <BackgroundShader
          progress={1.0}
          scale={0.82}
          src={"/imgs/espuma.png"}
        />
      </div>
      <div className="absolute w-full h-96">hello</div>
    </div>
  );
};

export default Testing;
