import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Button } from "@/components/ui/button";
import { Apple, PlayCircle } from "lucide-react";

export function HeroSection({ show }: { show: boolean }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!show) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.fromTo(
        badgeRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.55, ease: "power2.out", delay: 0.25 },
      )
        .fromTo(
          titleRef.current,
          { opacity: 0, y: 32 },
          { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" },
          "-=0.2",
        )
        .fromTo(
          subRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.65, ease: "power2.out" },
          "-=0.45",
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
          "-=0.35",
        );
    }, sectionRef);

    return () => ctx.revert();
  }, [show]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-black pt-10 md:pt-14 dot-grid"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-white/4 rounded-full blur-[80px] pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4 min-h-screen flex items-center justify-center -mt-8 md:-mt-12">
        <div className="w-full max-w-2xl mx-auto text-center">
          <div
            ref={badgeRef}
            className="mb-5 inline-flex items-center justify-center rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-300 opacity-0"
          >
            <span className="mr-2 text-tuga-brand" aria-hidden>
              ⚡
            </span>
            El Itacate de la Región
          </div>

          <h1
            ref={titleRef}
            className="text-white text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter mb-5 opacity-0 leading-[0.95]"
          >
            Tu comida favorita,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-tuga-brand/85 to-zinc-600">
              a un toque de distancia
            </span>
          </h1>

          <p
            ref={subRef}
            className="text-zinc-400 text-base md:text-xl mb-8 opacity-0 font-medium tracking-tight leading-relaxed max-w-xl mx-auto"
          >
            La plataforma de delivery simplificada para tu región. Conectamos
            con los restaurantes de siempre, sin complicaciones.
          </p>

          <div
            ref={ctaRef}
            className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 opacity-0"
          >
            <Button
              size="lg"
              className="glass-button h-14 px-8 rounded-full text-lg font-bold hover:scale-[1.02] transition-transform"
            >
              <Apple className="mr-2 h-5 w-5 fill-current" />
              Descargar para iOS
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="border-zinc-800 text-zinc-400 h-14 px-8 rounded-full text-lg font-bold transition-all hover:scale-[1.02] hover:border-tuga-brand/40 hover:bg-tuga-brand/10 hover:text-tuga-brand"
            >
              <PlayCircle className="mr-2 h-5 w-5" />
              Descargar para Android
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
