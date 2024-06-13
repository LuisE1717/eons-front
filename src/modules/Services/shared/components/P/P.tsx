import React from "react";

export default function P({ children }: { children: React.ReactNode }) {
  return (
    <p className="sm:text-[1rem] text-sm sm:mb-5 mb-3.5 md:ml-10 !leading-8">
      {children}
    </p>
  );
}
