import BackgroundWobbleExperimental from "../components/background-wobble-experimental/index";

const ShaderTest = () => {
  return (
    <div className="w-full h-[50vh]">
      <BackgroundWobbleExperimental
        progress={0.5}
        scale={0.8}
        src={"/imgs/conchas.jpg"}
        imgAspect={1.5229}
        imgScale={1.5}
        speed={-0.02}
      />{" "}
    </div>
  );
};
export default ShaderTest;
