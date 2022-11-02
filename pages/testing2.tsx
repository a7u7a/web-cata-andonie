import BackgroundNoiseDisplacement from "../components/background-noise-displacement/index";

const ShaderTest = () => {
  return (
    <div className="w-full h-[80vh]">
      <BackgroundNoiseDisplacement
        progress={0.5}
        scale={0.8}
        src={"/imgs/text1.png"}
        imgAspect={0.664}
        imgScale={3.0}
        speed={-0.02}
      />{" "}
    </div>
  );
};
export default ShaderTest;
