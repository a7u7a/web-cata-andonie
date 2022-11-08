import Image from "next/image";
import { useState } from "react";
import StackingEffects from "../components/stacking-effects2/index";

const ShaderTest = () => {
  const [hovered, setHovered] = useState(false);
  return (
    <div className="relative">
      <div className="fixed w-full h-[100vh]">
        <StackingEffects
          progress={0.5}
          scale={0.8}
          src={"/shader-backgrounds/2.png"}
          imgAspect={1.77}
          imgScale={2.0}
          speed={-0.02}
        />{" "}
      </div>
      <div>
        <div className={`absolute p-6 `}>
          <div className="mix-blend-difference transition-all duration-75 hover:text-indigo-600 text-white hover:cursor-pointer">
            <div>
              <div className="font-bold text-7xl ">Catalina Andonie</div>
            </div>
          </div>
          <div className="text-3xl text-white w-1/2 mt-10">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officia
            animi culpa id vel pariatur molestias debitis aliquid fugiat error,
            quod, iusto, ducimus illo. Dolore dolorum vitae repellat excepturi
            ad, laudantium obcaecati, odit illum et magni quidem beatae facere
            perspiciatis nemo molestias corrupti harum eligendi quod hic culpa
            omnis, sapiente sed laboriosam. Ratione quibusdam dolorum, cumque
            aspernatur tempora repellendus iure cum hic, vitae, labore tenetur
            beatae ea corporis nulla vel esse repudiandae repellat adipisci
            voluptate amet consequatur a sequi voluptatem mollitia? Reiciendis
            porro reprehenderit aliquid a eaque tempora earum voluptatibus unde
            commodi quis omnis, nihil, quibusdam vitae quam accusantium
            aspernatur corrupti quos sunt, nobis veritatis. Animi, at ipsa
            reprehenderit molestiae laborum iste doloribus quod temporibus id
            repudiandae magni adipisci veniam nemo, corrupti similique.
            Inventore, est ut.
          </div>
        </div>
      </div>
    </div>
  );
};
export default ShaderTest;
