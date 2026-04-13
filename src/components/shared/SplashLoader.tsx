import { useEffect, useRef } from "react";
import gsap from "gsap";
import { TugaSplashBrand } from "@/components/brand/tuga-brand-logo";

export function SplashLoader({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const byteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 0.8,
          ease: "power2.inOut",
          onComplete,
        });
      },
    });

    tl.fromTo(
      logoRef.current,
      { opacity: 0, scale: 0.9, y: 24 },
      { opacity: 1, scale: 1, y: 0, duration: 1.1, ease: "power4.out" },
    ).fromTo(
      byteRef.current,
      { opacity: 0, y: 8 },
      { opacity: 0.6, y: 0, duration: 0.8, ease: "power2.out" },
      "-=0.45",
    );

    tl.to({}, { duration: 0.5 });

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black text-white"
    >
      <div className="flex flex-col items-center gap-5 sm:gap-6">
        <div ref={logoRef}>
          <TugaSplashBrand />
        </div>

        <div
          ref={byteRef}
          className="text-sm font-medium tracking-widest uppercase text-zinc-500 opacity-0"
        >
          Powered by Byte
        </div>
      </div>
    </div>
  );
}
