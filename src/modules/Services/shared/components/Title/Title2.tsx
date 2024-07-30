import React from "react";

export default function Title2({ children }: { children: React.ReactNode }) {
  return (
    <h1 className="sm:text-[1.875rem] text-2xl font-semibold xl:text-center text-left leading-10">
      {children}
    </h1>
  );
}
