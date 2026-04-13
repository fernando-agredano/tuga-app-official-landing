import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Apple, PlayCircle, Download, Users, Store } from "lucide-react";
import gsap from "gsap";

const stats = [
  {
    icon: Download,
    value: "1.2M+",
    label: "Descargas",
    description: "Instalaciones activas en iOS y Android",
    chart: [
      { month: "Ene", total: "120K", value: 38 },
      { month: "Feb", total: "165K", value: 52 },
      { month: "Mar", total: "210K", value: 66 },
      { month: "Abr", total: "258K", value: 78 },
      { month: "May", total: "310K", value: 92 },
    ],
  },
  {
    icon: Users,
    value: "850K+",
    label: "Usuarios clientes",
    description: "Personas ordenando cada mes en TugaApp",
    chart: [
      { month: "Ene", total: "72K", value: 30 },
      { month: "Feb", total: "95K", value: 45 },
      { month: "Mar", total: "120K", value: 58 },
      { month: "Abr", total: "143K", value: 70 },
      { month: "May", total: "168K", value: 82 },
    ],
  },
  {
    icon: Store,
    value: "12K+",
    label: "Negocios registrados",
    description: "Restaurantes y comercios aliados en la plataforma",
    chart: [
      { month: "Ene", total: "2.1K", value: 24 },
      { month: "Feb", total: "3.8K", value: 40 },
      { month: "Mar", total: "6.2K", value: 56 },
      { month: "Abr", total: "8.9K", value: 72 },
      { month: "May", total: "12K", value: 88 },
    ],
  },
];

export function FinalCTA() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".stat-card",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: "power2.out",
        },
      );

      gsap.fromTo(
        ".chart-bar-fill",
        { height: 0 },
        {
          height: (_, target) => target.getAttribute("data-height"),
          duration: 1,
          stagger: 0.04,
          ease: "power3.out",
          delay: 0.2,
        },
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="py-24 bg-black overflow-hidden dot-grid">
      <div className="container mx-auto px-4">
        <div className="relative rounded-[4rem] bg-zinc-900/40 backdrop-blur-xl border border-white/5 text-white overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-tuga-brand opacity-15 rounded-full blur-[90px] -mr-40 -mt-40 transition-opacity duration-700" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-zinc-200 opacity-5 rounded-full blur-[90px] -ml-40 -mb-40" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center p-10 md:p-12 lg:p-14">
            {/* Left content */}
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-5xl xl:text-6xl font-black tracking-tighter mb-6 leading-[1.05] text-center lg:text-left">
                El futuro de <br />{" "}
                <span className="text-tuga-brand">la entrega</span> está aquí.
              </h2>

              <p className="text-zinc-400 text-base md:text-lg xl:text-xl mb-8 font-medium tracking-tight text-center lg:text-left max-w-lg">
                Únete a miles de usuarios disfrutando de la experiencia premium
                de TugaApp. Comienza hoy y obtén tu primera entrega gratis.
              </p>

              <div className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4">
                <Button
                  size="lg"
                  className="glass-button h-14 px-8 rounded-full text-base font-bold hover:scale-[1.02] transition-transform"
                >
                  <Apple className="mr-2 h-5 w-5 fill-current" />
                  App Store
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  className="border-zinc-800 text-zinc-400 h-14 px-8 rounded-full text-base font-bold transition-all hover:scale-[1.02] hover:border-tuga-brand/40 hover:bg-tuga-brand/10 hover:text-tuga-brand"
                >
                  <PlayCircle className="mr-2 h-5 w-5" />
                  Play Store
                </Button>
              </div>
            </div>

            {/* Right stats cards */}
            <div className="w-full">
              <div className="grid grid-cols-1 gap-3.5 md:gap-4 max-w-[500px] mx-auto lg:ml-auto">
                {stats.map((stat) => {
                  const Icon = stat.icon;

                  return (
                    <div
                      key={stat.label}
                      className="stat-card relative overflow-visible rounded-[1.6rem] border border-white/8 bg-white/[0.03] backdrop-blur-md p-4 md:p-5"
                    >
                      <div className="relative z-10 flex items-center justify-between gap-4">
                        <div className="flex min-w-0 items-start gap-4">
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-white">
                            <Icon size={20} strokeWidth={1.8} />
                          </div>

                          <div className="min-w-0">
                            <div className="text-2xl md:text-3xl font-black tracking-tight text-white mb-0.5">
                              {stat.value}
                            </div>
                            <div className="text-xs md:text-sm font-semibold text-zinc-200 mb-1.5">
                              {stat.label}
                            </div>
                            <p className="text-xs md:text-sm leading-relaxed text-zinc-500 max-w-[240px]">
                              {stat.description}
                            </p>
                          </div>
                        </div>

                        {/* Interactive chart */}
                        <div className="hidden sm:flex w-28 md:w-32 shrink-0 items-end gap-2 self-stretch justify-end">
                          {stat.chart.map((item) => {
                            return (
                              <div
                                key={`${stat.label}-${item.month}`}
                                className="group/bar relative flex-1 h-20 flex items-end"
                              >
                                <div className="absolute -top-14 left-1/2 -translate-x-1/2 pointer-events-none opacity-0 translate-y-1 transition-all duration-200 group-hover/bar:opacity-100 group-hover/bar:translate-y-0 z-20">
                                  <div className="rounded-xl border border-white/10 bg-zinc-950/95 backdrop-blur-md px-3 py-2 shadow-[0_10px_30px_rgba(0,0,0,0.35)] whitespace-nowrap">
                                    <div className="text-[10px] uppercase tracking-[0.18em] text-zinc-500 mb-1">
                                      {item.month}
                                    </div>
                                    <div className="text-xs font-semibold text-white">
                                      {item.total} total
                                    </div>
                                  </div>
                                </div>

                                <div className="relative w-full h-full rounded-full bg-white/8 overflow-hidden border border-white/6">
                                  <div
                                    className="chart-bar-fill absolute bottom-0 left-0 w-full rounded-full bg-tuga-brand/80 transition-all duration-300 group-hover/bar:bg-tuga-brand group-hover/bar:scale-y-[1.06] origin-bottom"
                                    data-height={`${item.value}%`}
                                    style={{ height: `${item.value}%` }}
                                  />
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
