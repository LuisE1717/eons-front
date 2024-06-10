import React from "react";

export default function Title({ children }: { children: React.ReactNode }) {
  return (
    <h1 className="sm:text-[1.875rem] text-2xl mb-6 font-semibold xl:text-center text-left leading-10">
      {children}
    </h1>
  );
}
