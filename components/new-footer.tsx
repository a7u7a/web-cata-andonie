import { useRouter } from "next/router";

interface NewFooterProps {
  background?: boolean;
  colophon?: boolean;
}

const NewFooter = ({ background = true, colophon = false }: NewFooterProps) => {
  const { locale } = useRouter();
  return (
    <div
      id="contact"
      className={`relative flex flex-row space-x-4 p-6 pt-24 pb-40 ${
        background ? "bg-white" : "bg-transparent"
      }`}
    >
      <div className="flex flex-col w-1/2 mix-blend-difference text-white">
        <div>
          <div className="text-6xl ">
            <div>{locale === "es" ? "CONTACTO" : "CONTACT"}</div>
          </div>

          <div className="mt-16 text-3xl flex flex-col space-y-3">
            <div>
              <a
                className="break-words hover:underline"
                href="mailto:catalinaandonie@gmail.com"
              >
                catalinaandonie@gmail.com
              </a>
            </div>

            <div className=" hover:underline">
              <a href="https://www.instagram.com/catalina.andonie/">
                @catalina.andonie
              </a>
            </div>

            <div className="">
              {locale === "es" ? (
                <p>Todos los derechos reservados.</p>
              ) : (
                <p>All rights reserved.</p>
              )}
            </div>

            <div className="">2022</div>
          </div>
        </div>

        <div className="flex flex-col mt-16">
          <div className="mix-blend-difference text-white">
            <div className="text-6xl">
              {locale === "es" ? "FOTOGRAFÍA" : "PHOTOGRAPHY"}
            </div>
          </div>
          <div className="mt-16 text-3xl">
            <ul className="flex flex-col space-y-3">
              <li>
                <a className="hover:underline" href="https://www.instagram.com/paolavelasquezdiaz">
                  Paola Velázquez
                </a>
              </li>
              <li>
                <a className="hover:underline" href="https://www.felipeugalde.com/">Felipe Ugalde</a>
              </li>
              <li>
                {" "}
                <a className="hover:underline" href="https://cargocollective.com/matthewneary">
                  Matthew Neary
                </a>
              </li>
              <li>Jose Noli</li>
              <li>
                <a className="hover:underline" href="https://www.instagram.com/andres.lennon.s/">
                  Andres Lennon
                </a>
              </li>
              <li>
                <a className="hover:underline" href="https://p-kim-joo.studio/">Paulina Kim Ju</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {colophon ? (
        <div className="w-1/2">
          <div className="text-3xl text-left mix-blend-difference text-white leading-snug">
            {locale === "es" ? (
              <p>
                Este sitio fue diseñado usando{" "}
                <a className="underline" href="https://norm.to/ll-riforma/">
                  LL Riforma
                </a>{" "}
                y desarrollado con Next.js, Typescript,{" "}
                <a
                  className="underline"
                  href="https://github.com/pmndrs/react-three-fiber"
                >
                  R3F
                </a>{" "}
                y un poco de{" "}
                <a
                  className="underline"
                  href="https://www.khronos.org/opengl/wiki/OpenGL_Shading_Language"
                >
                  GLSL
                </a>{" "}
                para los fondos generativos. Creado por{" "}
                <a className="underline" href="http://esrs.co/">
                  esrs.co
                </a>{" "}
                en el 2022. No utiliza cookies de rastreo.
              </p>
            ) : (
              <p>
                This site was set in{" "}
                <a className="underline" href="https://norm.to/ll-riforma/">
                  LL Riforma
                </a>{" "}
                and developed using Next.js, Typescript,{" "}
                <a
                  className="underline"
                  href="https://github.com/pmndrs/react-three-fiber"
                >
                  R3F
                </a>{" "}
                and some{" "}
                <a
                  className="underline"
                  href="https://www.khronos.org/opengl/wiki/OpenGL_Shading_Language"
                >
                  GLSL
                </a>
                for the generative backgrounds. Created by{" "}
                <a className="underline" href="http://esrs.co/">
                  esrs.co
                </a>{" "}
                in 2022. It does not use tracking cookies.
              </p>
            )}
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default NewFooter;
