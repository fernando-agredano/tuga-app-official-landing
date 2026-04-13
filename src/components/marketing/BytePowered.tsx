import { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { Cpu, Globe, Rocket, Shield } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function BytePowered() {
  const containerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<(HTMLDivElement | null)[]>([]);

  const particles = useMemo(() => {
    const pseudoRandom = (seed: number) => {
      const x = Math.sin(seed * 999) * 10000;
      return x - Math.floor(x);
    };

    const fixed = (value: number, decimals = 4) =>
      Number(value.toFixed(decimals));

    return Array.from({ length: 60 }, (_, i) => {
      const r1 = pseudoRandom(i + 1);
      const r2 = pseudoRandom(i + 11);
      const r3 = pseudoRandom(i + 21);
      const r4 = pseudoRandom(i + 31);
      const r5 = pseudoRandom(i + 41);

      return {
        id: i,
        size: fixed(2 + r1 * 5),
        left: `${fixed(r2 * 100)}%`,
        top: `${fixed(r3 * 100)}%`,
        delay: fixed(r4 * 1.5),
        duration: fixed(3 + r5 * 3),
      };
    });
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const pseudoRandom = (seed: number) => {
        const x = Math.sin(seed * 999) * 10000;
        return x - Math.floor(x);
      };

      const fixed = (value: number, decimals = 4) =>
        Number(value.toFixed(decimals));

      gsap.fromTo(
        glowRef.current,
        { opacity: 0, scale: 0.92 },
        {
          opacity: 0.18,
          scale: 1,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
            once: true,
          },
        },
      );

      gsap.fromTo(
        ".byte-card",
        { opacity: 0, y: 18 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          ease: "power2.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 72%",
            once: true,
          },
        },
      );

      particlesRef.current.forEach((particle, index) => {
        if (!particle) return;

        const xMove = fixed(-20 + pseudoRandom(index + 101) * 40);
        const yMove = fixed(-20 + pseudoRandom(index + 201) * 40);
        const baseOpacity = fixed(0.08 + pseudoRandom(index + 301) * 0.14);
        const targetOpacity = fixed(0.18 + pseudoRandom(index + 401) * 0.2);
        const baseScale = fixed(0.7 + pseudoRandom(index + 501) * 0.3);
        const targetScale = fixed(0.9 + pseudoRandom(index + 601) * 0.35);
        const duration = fixed(3 + pseudoRandom(index + 701) * 3);
        const delay = fixed(pseudoRandom(index + 801) * 1.5);

        gsap.set(particle, {
          opacity: baseOpacity,
          scale: baseScale,
        });

        gsap.to(particle, {
          x: xMove,
          y: yMove,
          opacity: targetOpacity,
          scale: targetScale,
          duration,
          delay,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden bg-black py-24 dot-grid"
    >
      <div
        ref={glowRef}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-zinc-400 opacity-10 blur-[100px]"
      />

      <div className="pointer-events-none absolute inset-0">
        {particles.map((particle, index) => (
          <div
            key={particle.id}
            ref={(el) => {
              particlesRef.current[index] = el;
            }}
            className="absolute rounded-full bg-white/40 blur-[1px]"
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              left: particle.left,
              top: particle.top,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-10 flex flex-col items-center">
            <h2 className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-zinc-500">
              Ingeniería de Excelencia
            </h2>

            <div className="group relative">
              <div className="absolute inset-x-0 -bottom-2 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              <h2 className="mb-4 text-5xl font-black tracking-tighter text-white md:text-7xl">
                Impulsado por Byte
              </h2>
            </div>

            <p className="mt-6 max-w-2xl text-lg font-medium leading-relaxed tracking-tight text-zinc-400 md:text-xl">
              TugaApp está construido sobre la infraestructura de clase mundial
              de Byte, asegurando ultra-baja latencia, 99.99% de tiempo de
              actividad y seguridad para cada transacción.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-4">
            {[
              [Cpu, "Hyper-Core", "Motor de IA Propio"],
              [Globe, "Edge Network", "Distribución Global"],
              [Rocket, "Scale Ultra", "1M peticiones/seg"],
              [Shield, "ByteShield", "Cifrado de Extremo a Extremo"],
            ].map(([Icon, title, subtitle]) => (
              <div
                key={title as string}
                className="byte-card group rounded-2xl border border-white/10 bg-white/5 p-6 transition-all duration-300 hover:border-tuga-brand/55 hover:bg-tuga-brand/10 hover:shadow-[0_0_32px_rgba(115,148,106,0.18)]"
              >
                <Icon
                  className="mx-auto mb-4 text-white/70 transition-colors duration-300 group-hover:text-tuga-brand"
                  size={32}
                />
                <h4 className="mb-1 font-bold text-white transition-colors duration-300 group-hover:text-tuga-brand">
                  {title as string}
                </h4>
                <p className="text-xs uppercase tracking-tighter text-zinc-500 transition-colors duration-300 group-hover:text-tuga-brand/80">
                  {subtitle as string}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
