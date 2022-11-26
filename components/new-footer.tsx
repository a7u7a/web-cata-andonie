import { useRouter } from "next/router";

const NewFooter = () => {
  const { locale } = useRouter();
  return (
    <div className="relative flex flex-row space-x-4 bg-white p-4 pt-16 pb-40">
      <div className="flex flex-col w-1/2 text-black">
        <div>
          <div className="text-6xl font-bold transition-all duration-75 hover:text-indigo-600 hover:cursor-pointer">
            <div>Contact</div>
          </div>
          <div className="mt-16 text-4xl">
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
            <div className="mt-4">{locale === "es" ? (
            <p>
              Todos los derechos reservados.
            </p>
          ) : (
            <p>
              All rights reserved.
            </p>
          )}</div>
            <div className="mt-4">2022</div>
          </div>
        </div>

        <div className="flex flex-col mt-16">
          <div className="text-7xl transition-all duration-75 hover:text-indigo-600  hover:cursor-pointer">
            <div className="font-bold text-6xl">Photography</div>
          </div>
          <div className="mt-16 text-4xl">
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

      <div className="w-1/2">
        <div className="text-4xl text-left ">
          {locale === "es" ? (
            <p>
              corporis asperiores incidunt quam, rerum debitis voluptate enim,
              quia doloremque eius, dicta eos ut. Commodi adipisci tempore iste,
              fugit Español lorem ipsum dolor sit amet consectetur adipisicing
              elit. Laudantium reprehenderit quam.
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
    </div>
  );
};

export default NewFooter;
