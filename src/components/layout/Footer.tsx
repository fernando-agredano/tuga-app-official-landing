import { TugaBrandLogo } from "@/components/brand/tuga-brand-logo";
import { Twitter, Instagram, Linkedin, Github } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-black pt-24 pb-12 border-t border-zinc-900">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-20">
          <div className="col-span-2 lg:col-span-2">
            <div className="mb-6">
              <TugaBrandLogo />
            </div>

            <p className="text-zinc-500 text-lg max-w-xs leading-relaxed">
              Redefiniendo la entrega de comida para el estilo de vida urbano
              moderno. Calidad premium. Velocidad récord.
            </p>

            <div className="flex gap-4 mt-8">
              {[Twitter, Instagram, Linkedin, Github].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-500 hover:bg-tuga-brand hover:text-white transition-all"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Producto</h4>
            <ul className="space-y-4">
              {[
                "Funciones",
                "Precios",
                "App Store",
                "Play Store",
                "Soporte",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="inline-block text-zinc-500 transition-all duration-300 hover:translate-x-1 hover:text-tuga-brand"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Empresa</h4>
            <ul className="space-y-4">
              {["Nosotros", "Carreras", "Prensa", "Partners", "Contacto"].map(
                (item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="inline-block text-zinc-500 transition-all duration-300 hover:translate-x-1 hover:text-tuga-brand"
                    >
                      {item}
                    </a>
                  </li>
                ),
              )}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Legal</h4>
            <ul className="space-y-4">
              {[
                "Privacidad",
                "Términos",
                "Política de Cookies",
                "Aviso Legal",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="inline-block text-zinc-500 transition-all duration-300 hover:translate-x-1 hover:text-tuga-brand"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-zinc-600 text-sm">
            © 2026 TugaApp. Todos los derechos reservados.
          </p>

          <div className="flex items-center gap-2">
            <span className="text-zinc-700 text-xs font-bold tracking-[0.2em] uppercase">
              Powered by
            </span>
            <span className="text-zinc-400 text-xs font-bold tracking-tight">
              BYTE
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
