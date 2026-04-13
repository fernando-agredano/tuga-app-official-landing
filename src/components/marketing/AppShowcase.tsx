import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { Smartphone, ShieldCheck, Zap } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const EXPLORA_FEATURES = [
  {
    Icon: Smartphone,
    title: "Interfaz intuitiva",
    desc: "Todo está diseñado para que pedir sea simple, claro y natural desde el primer momento, sin pasos innecesarios. Una presentación visual limpia y moderna que hace que explorar negocios y productos se sienta premium",
  },
  {
    Icon: Zap,
    title: "Acciones más rápidas",
    desc: "Navega, elige y confirma tu pedido con una experiencia ágil que reduce fricción en cada interacción.",
  },
  {
    Icon: ShieldCheck,
    title: "Confianza en cada pedido",
    desc: "Desde la confirmación hasta la entrega, cada detalle está pensado para ofrecer una experiencia segura y confiable.",
  },
] as const;

export function AppShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textGroupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        textGroupRef.current,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          ease: "power2.out",
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
    <section ref={containerRef} className="py-24 bg-zinc-950 overflow-hidden">
      <div className="container mx-auto px-4">
        <div
          ref={textGroupRef}
          className="flex w-full flex-col gap-12 lg:flex-row lg:items-center lg:gap-14 xl:gap-16"
        >
          <div className="w-full min-w-0 lg:w-1/2">
            <h2 className="text-zinc-500 text-sm font-bold tracking-[0.3em] uppercase mb-4">
              Explora
            </h2>
            <h3 className="text-white text-4xl md:text-6xl font-bold tracking-tight mb-5">
              Los restaurantes de siempre{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-200 to-zinc-600">
                ahora en la palma de tu mano
              </span>
            </h3>
            <p className="text-zinc-400 text-base md:text-lg leading-relaxed mb-10">
              Explora una amplia variedad de restaurantes locales; olvídate de
              tener que buscar el número de cualquier lugar. Todo en la palma
              de tu mano: tus lugares favoritos y hasta los que no conocías,
              ahora a un clic de distancia.
            </p>

            <div className="rounded-[1.65rem] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-md">
              <p className="text-zinc-500 text-xs font-bold tracking-[0.28em] uppercase mb-3">
                Delivery
              </p>
              <h4 className="text-white text-2xl md:text-3xl font-bold tracking-tight mb-3">
                Pide fácil, recibe rápido
              </h4>
              <p className="text-zinc-400 text-sm md:text-base leading-relaxed mb-5">
                Deja las explicaciones largas para que den con tu domicilio:
                simplemente establece la ubicación desde la app y recibe en
                minutos.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1.5 text-xs font-medium text-zinc-300">
                  Pago en efectivo
                </span>
                <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1.5 text-xs font-medium text-zinc-300">
                  Entrega express
                </span>
              </div>
            </div>
          </div>

          <div className="w-full min-w-0 lg:w-1/2">
            <div className="space-y-8">
              {EXPLORA_FEATURES.map(({ Icon, title, desc }) => (
                <div key={title} className="flex gap-6">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white">
                    <Icon size={24} strokeWidth={1.5} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-white text-xl font-bold mb-2">
                      {title}
                    </h4>
                    <p className="text-zinc-400 leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
