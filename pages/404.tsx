import { useRouter } from "next/router";
import Link from "next/link";

const PageNotFound = () => {
  const { back, locale } = useRouter();
  return (
    <div className="flex flex-col w-screen space-y-6">
      <div className="flex flex-row justify-center">
        <div className="mt-12 font-bold">
          {locale === "es" ? "Página no encontrada" : "Page not found"}
        </div>
      </div>
      <div className="flex flex-row justify-center underline">
        <Link href="/">{locale === "es" ? "Volver al inicio" : "Home"}</Link>
      </div>
    </div>
  );
};

export default PageNotFound;
