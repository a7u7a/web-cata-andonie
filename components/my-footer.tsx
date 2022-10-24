const MyFooter = () => {
  return (
    <div className="flex flex-col md:flex-row w-full pt-10 md:pt-20 p-6 bg-gray-200 space-y-12 md:space-y-0">
      <div className="w-full md:w-1/2 md:h-96">
        <div className="text-2xl">Colofón</div>
        <div className="mt-8">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium
          corporis asperiores incidunt quam, rerum debitis voluptate enim, quia
          doloremque eius, dicta eos ut. Commodi adipisci tempore iste, fugit
          reprehenderit quam.
        </div>
      </div>

      <div className="flex flex-row space-x-6 md:w-1/2 w-full">

        <div className="w-1/2 h-96">
          <div className="text-2xl">Fotografía</div>
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

        <div className="w-1/2 h-96">
          <div className="text-2xl">Contacto</div>
          <div className="mt-8">
            <div>
              <a className="break-words" href="mailto:catalinaandonie@gmail.com">
                catalinaandonie@gmail.com
              </a>
            </div>
            <div className="mt-8">
              <a href="https://www.instagram.com/catalina.andonie/">
                @catalina.andonie
              </a>
            </div>
          </div>

          <div className="">Todos los derechos reservados</div>
          <div className="">2022</div>
        </div>
      </div>
    </div>
  );
};
export default MyFooter;
