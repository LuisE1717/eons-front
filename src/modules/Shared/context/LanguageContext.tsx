import { createContext } from "react";

interface Props {
  locale: string;
}

export const LanguageContext = createContext<Props>({} as Props);

export function LanguageProvider({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: string;
}) {
  console.log(locale)
  return (
    <LanguageContext.Provider value={{ locale: locale }}>
      {children}
    </LanguageContext.Provider>
  );
}
