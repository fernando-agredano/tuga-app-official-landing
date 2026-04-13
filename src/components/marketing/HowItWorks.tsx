import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { Search, ShoppingBag, Bell, PackageCheck } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    icon: Search,
    title: "Explorar",
    description:
      "Busca negocios desde la app, descubre opciones cercanas y encuentra fácilmente lo que quieres pedir.",
    color: "from-blue-500/10 to-transparent",
  },
  {
    icon: ShoppingBag,
    title: "Solicitar",
    description:
      "Selecciona tus productos y envía tu pedido en segundos. El negocio lo recibe, lo acepta y confirma la orden.",
    color: "from-purple-500/10 to-transparent",
  },
  {
    icon: Bell,
    title: "Actualizaciones",
    description:
      "El cliente recibe notificaciones cuando el pedido es aceptado, cuando está listo, cuando va en camino y cuando ha llegado.",
    color: "from-orange-500/10 to-transparent",
  },
  {
    icon: PackageCheck,
    title: "Entrega confirmada",
    description:
      "Una vez que el cliente recibe el pedido, el negocio también recibe la confirmación de que la entrega fue completada.",
    color: "from-tuga-brand/15 to-transparent",
  },
];

export function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".how-card",
        { opacity: 0, y: 24, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.75,
          ease: "power2.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 72%",
            once: true,
          },
        },
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="py-24 bg-black overflow-hidden dot-grid"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-zinc-500 text-sm font-bold tracking-[0.3em] uppercase mb-4">
            Proceso
          </h2>
          <h3 className="text-white text-4xl md:text-6xl font-black tracking-tighter">
            Cómo funciona{" "}
            <span className="text-tuga-brand">TugaApp</span>.
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="how-card group relative p-8 rounded-3xl bg-zinc-900/40 border border-zinc-800/50 hover:border-zinc-700/50 transition-colors"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-b ${step.color} rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
              />

              <div className="relative z-10">
                <div className="mb-6 inline-flex p-4 rounded-2xl bg-zinc-800 text-white group-hover:scale-105 transition-transform duration-300">
                  <step.icon size={32} strokeWidth={1.5} />
                </div>
                <h4 className="text-white text-2xl font-bold mb-4">
                  {step.title}
                </h4>
                <p className="text-zinc-400 leading-relaxed">
                  {step.description}
                </p>
              </div>

              <span className="absolute top-6 right-8 text-5xl font-black text-white/5 group-hover:text-white/10 transition-colors">
                0{index + 1}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
