import { SedeProvider } from "@/components/SedeContexto";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Objeciones } from "@/components/Objeciones";
import { Actividades } from "@/components/Actividades";
import { Sedes } from "@/components/Sedes";
import { Diferenciales } from "@/components/Diferenciales";
import { Planes } from "@/components/Planes";
import { Profes } from "@/components/Profes";
import { Cierre } from "@/components/Cierre";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <SedeProvider>
      <a
        href="#actividades"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:bg-lima focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-caucho"
      >
        Saltar al contenido
      </a>
      <Header />
      <main>
        {/* El hero ocupa el primer viewport completo: la firma de la página
            vive adentro de esa pantalla. */}
        <Hero />
        <Objeciones />
        <Actividades />
        <Sedes />
        <Diferenciales />
        <Planes />
        <Profes />
        <Cierre />
      </main>
      <Footer />
    </SedeProvider>
  );
}
