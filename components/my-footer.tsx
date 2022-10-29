import { useRouter } from "next/router";
import BackgroundShader from "./background-wobble";

const MyFooter = () => {
  const { locale } = useRouter();
  return (
    <div className="relative">
      <div className="absolute w-full h-[100vh] md:h-[70vh] ">
        <BackgroundShader
          progress={0.5}
          scale={0.8}
          src={"/imgs/conchas.jpg"}
          imgAspect={1.5229}
          imgScale={1.5}
          speed={-0.02}
        />
      </div>
      <div className="absolute flex flex-col w-full pt-12 md:pt-20 p-3 md:p-6 text-white">
        {/* Colophon */}
        <div className="w-full md:w-1/2">
          <div className="text-2xl">
            {/* {locale === "es" ? "Colofón" : "Colophon"} */}
          </div>
          <div className="">
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

        <div className="flex flex-row md:w-1/2 w-full pt-12">
          {/* Photographers */}
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
          {/* Contact */}
          <div className="w-1/2">
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
