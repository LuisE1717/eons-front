import React from "react";

export default function Step({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex xl:text-center text-left sm:mt-10 mt-3">
      {children}
    </div>
  );
}
