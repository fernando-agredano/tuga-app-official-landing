import type { ComponentProps } from "react";
import { Turtle } from "lucide-react";
import { cn } from "@/lib/utils";

const BRAND = "text-tuga-brand";

function BrandTurtle({ className }: { className?: string }) {
  return (
    <Turtle
      className={className}
      strokeWidth={1.75}
      aria-hidden
    />
  );
}

/**
 * Tortuga + TugaApp (misma composición en navbar y en la simulación del teléfono).
 */
export function TugaBrandLockup({
  size = "navbar",
}: {
  size?: "navbar" | "phone";
}) {
  const turtle =
    size === "phone"
      ? "h-5 w-5 sm:h-6 sm:w-6"
      : "h-7 w-7 md:h-8 md:w-8 lg:h-9 lg:w-9";
  const text =
    size === "phone"
      ? "text-[0.98rem] sm:text-[1.06rem]"
      : "text-[1.4rem] md:text-[1.55rem] lg:text-[1.7rem]";
  const gap = size === "phone" ? "gap-1.5 sm:gap-2" : "gap-2 md:gap-2.5";

  return (
    <div
      className={cn(
        "inline-flex min-w-0 items-center leading-none",
        gap,
      )}
    >
      <BrandTurtle
        className={cn(turtle, "shrink-0 text-tuga-brand")}
      />
      <span
        className={cn(
          "font-black tracking-[-0.06em] text-white",
          text,
        )}
      >
        Tuga<span className={BRAND}>App</span>
      </span>
    </div>
  );
}

export function TugaBrandLogo({
  className,
  href = "#inicio",
  ...props
}: Omit<ComponentProps<"a">, "children">) {
  return (
    <a
      href={href}
      className={cn(
        "group inline-flex w-fit select-none items-center leading-none",
        className,
      )}
      {...props}
    >
      <TugaBrandLockup size="navbar" />
    </a>
  );
}

/** Splash: wordmark + tortuga en verde de marca. */
export function TugaSplashBrand() {
  return (
    <div className="flex flex-col items-center select-none leading-none">
      <div className="flex items-center justify-center gap-3 sm:gap-4 md:gap-5">
        <BrandTurtle className="h-10 w-10 shrink-0 text-tuga-brand sm:h-12 sm:w-12 md:h-14 md:w-14" />
        <span className="text-4xl font-black tracking-[-0.06em] text-white sm:text-5xl md:text-6xl">
          Tuga<span className="text-tuga-brand">App</span>
        </span>
      </div>
    </div>
  );
}
