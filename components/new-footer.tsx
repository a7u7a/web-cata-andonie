import { useRouter } from "next/router";

interface NewFooterProps {
  background?: boolean;
  colophon?: boolean;
}

const NewFooter = ({ background = true, colophon = false }: NewFooterProps) => {
  const { locale } = useRouter();
  return (
    <div
      className={`relative flex flex-row space-x-4 p-4 pt-24 pb-40 ${
        background ? "bg-white" : "bg-transparent"
      }`}
    >
      <div className="flex flex-col w-1/2 mix-blend-difference text-white">
        <div>
          <div className="text-6xl ">
            <div>{locale === "es" ? "CONTACTO" : "CONTACT"}</div>
          </div>
          <div className="mt-16 text-3xl">
            <div>
              <a
                className="break-words hover:underline"
                href="mailto:catalinaandonie@gmail.com"
              >
                catalinaandonie@gmail.com
              </a>
            </div>
            <div className="mt-4 hover:underline">
              <a href="https://www.instagram.com/catalina.andonie/">
                @catalina.andonie
              </a>
            </div>
            <div className="mt-4">
              {locale === "es" ? (
                <p>Todos los derechos reservados.</p>
              ) : (
                <p>All rights reserved.</p>
              )}
            </div>
            <div className="mt-4">2022</div>
          </div>
        </div>

        <div className="flex flex-col mt-16">
          <div className="mix-blend-difference text-white">
            <div className="text-6xl">
              {locale === "es" ? "FOTOGRAFÍA" : "PHOTOGRAPHY"}
            </div>
          </div>
          <div className="mt-16 text-3xl">
            <ul>
              <li>Paola Velázquez</li>
              <li>Felipe Ugalde</li>
              <li>Matthew Neary</li>
              <li>Jose Noli</li>
              <li>Andres Lennon</li>
              <li>Paulina Kim Ju</li>
            </ul>
          </div>
        </div>
      </div>

      {colophon ? (
        <div className="w-1/2">
          <div className="text-3xl text-left mix-blend-difference text-white leading-snug">
            {locale === "es" ? (
              <p>
                Este sitio fue diseñado y desarrollado el 2022 por <a className="underline" href="http://esrs.co/">
                  esrs.co
                </a> usando <a className="underline" href="https://norm.to/ll-riforma/">
                  LL Riforma
                </a>. Construído usando Next.js, Typescript, <a className="underline" href="https://github.com/pmndrs/react-three-fiber">
                  R3F
                </a> y
                un poco de GLSL para los fondos generativos. No utiliza ningún
                tipo de cookies de rastreo.
              </p>
            ) : (
              <p>
                This site was designed and developed in 2022 by <a className="underline" href="http://esrs.co/">
                  esrs.co
                </a>. Set in <a className="underline" href="https://norm.to/ll-riforma/">
                  LL Riforma
                </a> and built with Next.js, Typescript, <a className="underline" href="https://github.com/pmndrs/react-three-fiber">
                  R3F
                </a> and some GLSL
                for the generative backgrounds. It does not use any kind of tracking cookies.
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
