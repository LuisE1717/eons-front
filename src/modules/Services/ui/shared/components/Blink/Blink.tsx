import React from "react";

export default function Blink({ children }: { children: React.ReactNode }) {
  return (
    <a href="/services" className="text-primary sm:text-[1rem] text-sm sm:mb-5 mb-3.5 md:px-6 !leading-8 blink">
      {children}
    </a>
  );
}
