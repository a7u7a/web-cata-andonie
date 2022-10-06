const MyFooter = () => {
  return (
    <div className="flex flex-row w-full pt-20 p-6 bg-slate-200">
      <div className="w-1/2 h-96">
        <div className="text-2xl">Contacto</div>
        <div className="mt-8">
          <div>
            <a href="mailto:catalinaandonie@gmail.com">
              catalinaandonie@gmail.com
            </a>
          </div>
          <div className="mt-8">
            <a href="https://www.instagram.com/catalina.andonie/">
              @catalina.andonie
            </a>
          </div>
        </div>
      </div>
      <div className="w-1/2 h-96">
        <div className="text-2xl">Colofón</div>
        <div className="mt-8">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium
          corporis asperiores incidunt quam, rerum debitis voluptate enim, quia
          doloremque eius, dicta eos ut. Commodi adipisci tempore iste, fugit
          reprehenderit quam.
        </div>
      </div>
      <div className="w-1/2 h-96">
        <div className="text-2xl">Fotografía</div>
        <div className="mt-8">
          <ul>
            <li>Javiera Iniguez</li>
            <li>Lorenzo Pizarro</li>
            <li>Macarena Valenzuela</li>
          </ul>
        </div>
      </div>
      <div className="w-1/2 h-96">
        <div className="">Todos los derechos reservados</div>
        <div className="">2022</div>
      </div>
    </div>
  );
};
export default MyFooter;
