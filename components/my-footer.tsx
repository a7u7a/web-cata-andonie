import { useRouter } from "next/router";
import BackgroundShader from "./background-wobble";

const MyFooter = () => {
  const { locale } = useRouter();
  return (
    <div>
      <div className="absolute w-full h-[90vh] md:h-96 ">
        <BackgroundShader progress={1.0} scale={0.82} src={"/imgs/espuma.png"} />
      </div>
      <div className="absolute flex flex-col md:flex-row w-full pt-10 md:pt-20 p-3 md:p-6 space-y-12 md:space-y-0 md:space-x-6 text-white">
        <div className="w-full md:w-1/2">
          <div className="text-2xl">
            {locale === "es" ? "Colofón" : "Colophon"}
          </div>
          <div className="mt-8">
            {locale === "es" ? (
              <p>
                corporis asperiores incidunt quam, rerum debitis voluptate enim,
                quia doloremque eius, dicta eos ut. Commodi adipisci tempore
                iste, fugit Español lorem ipsum dolor sit amet consectetur
                adipisicing elit. Laudantium reprehenderit quam.
              </p>
            ) : (
              <p>
                English lorem ipsum dolor sit amet consectetur adipisicing elit.
                Laudantium corporis asperiores incidunt quam, rerum debitis
                voluptate enim, quia doloremque eius, dicta eos ut. Commodi
                adipisci tempore iste, fugit reprehenderit quam.
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-row space-x-6 md:w-1/2 w-full">
          <div className="w-1/2 ">
            <div className="text-2xl">
              {locale === "es" ? "Fotografía" : "Photography"}
            </div>
            <div className="mt-8">
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

          <div className="w-1/2 ">
            <div className="text-2xl">
              {locale === "es" ? "Contacto" : "Contact"}
            </div>
            <div className="mt-8">
              <div>
                <a
                  className="break-words"
                  href="mailto:catalinaandonie@gmail.com"
                >
                  catalinaandonie@gmail.com
                </a>
              </div>
              <div className="mt-8">
                <a href="https://www.instagram.com/catalina.andonie/">
                  Ig: @catalina.andonie
                </a>
              </div>
            </div>

            <div className="">
              {locale === "es"
                ? "Todos los derechos reservados"
                : "All rights reserved"}
            </div>
            <div className="">2022</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MyFooter;
