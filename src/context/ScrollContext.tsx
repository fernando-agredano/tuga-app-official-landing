import { createContext, useContext } from "react";

export type ScrollToSectionFn = (id: string) => void;

const ScrollContext = createContext<ScrollToSectionFn | null>(null);

export function ScrollProvider({
  value,
  children,
}: {
  value: ScrollToSectionFn;
  children: React.ReactNode;
}) {
  return (
    <ScrollContext.Provider value={value}>{children}</ScrollContext.Provider>
  );
}

export function useScrollToSection(): ScrollToSectionFn {
  const fn = useContext(ScrollContext);
  return (
    fn ??
    ((id: string) => {
      document.getElementById(id)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    })
  );
}
