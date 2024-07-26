import React from "react";

export default function T({ children, onclick }: { children: React.ReactNode, onclick?:() => void }) {
  return (
    <div onClick={onclick} className="cursor-pointer sm:text-[1rem] text-sm sm:mb-5 mb-3.5 md:px-6 !leading-8 hover:text-primary">
      {children}
    </div>
  );
}