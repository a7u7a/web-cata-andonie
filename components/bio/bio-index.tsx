import { useRouter } from "next/router";
/**
 * I know this approach is hell and will crash in any minute
 */
const BioIndex = () => {
  const { locale } = useRouter();
  return (
    <div className="flex flex-col mt-0 md:mt-28 pr-6">
      {/* sidebar */}
      <div className="flex flex-col space-y-12 mt-8 mb-6 md:mb-20 text-gray-600">
        <div className="flex flex-col space-y-4">
          <h1 className="text-xl font-bold">
            {locale === "es" ? <p>Índice</p> : <p>Index</p>}
          </h1>
          <a
            href={
              locale === "es"
                ? "#Exhibiciones_individuales"
                : "#Solo_Exhibitions"
            }
            className="text-xl hover:underline"
          >
            {locale === "es" ? (
              <p>Exhibiciones individuales</p>
            ) : (
              <p>Solo Exhibitions</p>
            )}
          </a>
          <a
            href={
              locale === "es" ? "#Exhibiciones_grupales" : "#Group_Exhibitions"
            }
            className="text-xl hover:underline"
          >
            {locale === "es" ? (
              <p>Exhibiciones grupales</p>
            ) : (
              <p>Group Exhibitions</p>
            )}
          </a>
          <a
            href={locale === "es" ? "#Residencias" : "#Residencies"}
            className="text-xl hover:underline"
          >
            {locale === "es" ? <p>Residencias</p> : <p>Residencies</p>}
          </a>
          <a
            href={locale === "es" ? "#Premios" : "#Honors_and_Awards"}
            className="text-xl hover:underline"
          >
            {locale === "es" ? <p>Premios</p> : <p>Honors and Awards</p>}
          </a>
        </div>
        <div className="flex flex-col space-y-4">
          <a
            href={locale === "es" ? "#Colecciones" : "#Collections"}
            className="text-xl hover:underline"
          >
            {locale === "es" ? <p>Colecciones</p> : <p>Collections</p>}
          </a>
          <a
            href={locale === "es" ? "#Subastas" : "#Auctions"}
            className="text-xl hover:underline"
          >
            {locale === "es" ? <p>Subastas</p> : <p>Auctions</p>}
          </a>
          <a
            href={locale === "es" ? "#Ferias_de_arte" : "#Art_Fairs"}
            className="text-xl hover:underline"
          >
            {locale === "es" ? <p>Ferias de arte</p> : <p>Art Fairs</p>}
          </a>
        </div>
        <div className="flex flex-col space-y-4">
          <a
            href={locale === "es" ? "#Educación" : "#Education"}
            className="text-xl hover:underline"
          >
            {locale === "es" ? <p>Educación</p> : <p>Education</p>}
          </a>
          <a href="#Workshops" className="text-xl hover:underline">
            Workshops
          </a>
          <a
            href={locale === "es" ? "#Enseñanza" : "#Teaching"}
            className="text-xl hover:underline"
          >
            {locale === "es" ? <p>Enseñanza</p> : <p>Teaching</p>}
          </a>
          <a
            href={
              locale === "es"
                ? "#Curatorías_y_administración"
                : "#Gallery_Administration_and_Curatorial_Projects"
            }
            className="text-xl hover:underline"
          >
            {locale === "es" ? (
              <p>Curatorías y administración</p>
            ) : (
              <p>Gallery Administration and Curatorial Projects</p>
            )}
          </a>
        </div>
      </div>
    </div>
  );
};

export default BioIndex;
