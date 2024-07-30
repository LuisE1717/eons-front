import clsx from "clsx";
import React from "react";
import "./p.css";

export default function P({
  children,
  primary,
}: {
  children: React.ReactNode;
  primary?: boolean;
}) {
  return (
    <p
      className={clsx(
        "sm:text-[1rem] text-sm sm:mb-5 mb-3.5 md:px-6 !leading-8 w-full",
        { "text-animate": primary }
      )}
    >
      {children}
    </p>
  );
}
