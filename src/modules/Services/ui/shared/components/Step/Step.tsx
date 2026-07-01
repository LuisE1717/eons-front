import React from "react";

export default function Step({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-start flex w-full lg:pt-12 lg:pb-12 pb-4 pt-4 text-lg">
      {children}
    </div>
  );
}
