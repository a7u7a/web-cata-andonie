import BackgroundNoiseDisplacement from "../components/background-noise-displacement/index";

const ShaderTest = () => {
  return (
    <div className="w-full h-[80vh]">
      <BackgroundNoiseDisplacement
        progress={0.5}
        scale={0.8}
        src={"/shader-backgrounds2/3.png"}
        imgAspect={1.77}
        imgScale={2.0}
        speed={-0.02}
      />{" "}
    </div>
  );
};
export default ShaderTest;
