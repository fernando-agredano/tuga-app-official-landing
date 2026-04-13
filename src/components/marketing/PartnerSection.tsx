import { Button } from "@/components/ui/button";
import { Store, Bell, LineChart, Headphones } from "lucide-react";

const title = "Para negocios";
const heading = "Vende más, sin importar lo que ofrezca tu negocio.";
const description =
  "No importa lo que vendas: comida, productos, farmacia, conveniencia o artículos especializados. Nuestra solución te ayuda a recibir más pedidos, mejorar la experiencia de tus clientes y aumentar tus ventas con una operación de entrega simple y bien organizada.";
const secondaryText =
  "La plataforma se centra en dos roles: cliente y negocio. Desde ahí, tu equipo puede gestionar pedidos con mayor claridad, mientras tus repartidores se benefician de una operación más ordenada y mejor coordinada, aunque no formen parte de la app como un rol independiente. El MVP notifica cuando el pedido es aceptado, cuando sale, cuando va en camino y cuando ha sido entregado.";

const pillars = [
  {
    icon: Store,
    title: "Panel del negocio",
    text: "Pedidos entrantes, estado y tiempos en un solo lugar.",
  },
  {
    icon: Bell,
    title: "Notificaciones",
    text: "Aceptación, preparación, en camino y entrega confirmada.",
  },
  {
    icon: LineChart,
    title: "Claridad operativa",
    text: "Menos fricción entre cocina, mostrador y reparto.",
  },
  {
    icon: Headphones,
    title: "Soporte al crecer",
    text: "Escala tu operación sin perder el control del día a día.",
  },
] as const;

export function PartnerSection() {
  return (
    <section className="bg-black py-16">
      <div className="container mx-auto px-4">
        <div className="grid items-start gap-12 py-12 lg:grid-cols-2 lg:gap-16">
          <div className="max-w-xl lg:-translate-y-1">
            <h2 className="text-zinc-500 text-sm font-bold tracking-[0.3em] uppercase mb-4">
              {title}
            </h2>

            <h2 className="mb-4 text-3xl font-semibold leading-tight tracking-tight text-white md:text-4xl">
              {heading}
            </h2>

            <p className="mb-4 text-sm leading-7 text-zinc-300 md:text-base">
              {description}
            </p>

            <p className="mb-7 text-sm leading-7 text-zinc-400">{secondaryText}</p>

            <Button
              size="lg"
              className="h-14 rounded-full border border-white/10 bg-white/[0.04] px-7 text-sm font-semibold text-white backdrop-blur-md transition-all duration-300 hover:border-tuga-brand/45 hover:bg-tuga-brand/10 hover:text-tuga-brand"
            >
              Registrar mi negocio
            </Button>
          </div>

          <div className="w-full">
            <div className="rounded-[2rem] border border-white/10 bg-zinc-950/40 p-6 md:p-8">
              <p className="text-zinc-500 text-xs font-bold tracking-[0.28em] uppercase mb-6">
                Qué obtienes
              </p>
              <ul className="grid gap-4 sm:grid-cols-2">
                {pillars.map(({ icon: Icon, title: t, text }) => (
                  <li
                    key={t}
                    className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 transition-[border-color,background-color,transform] duration-300 hover:border-tuga-brand/35 hover:bg-tuga-brand/[0.06]"
                  >
                    <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-tuga-brand">
                      <Icon size={22} strokeWidth={1.75} />
                    </div>
                    <h3 className="text-white text-sm font-bold mb-1.5">{t}</h3>
                    <p className="text-zinc-500 text-xs leading-relaxed">{text}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
