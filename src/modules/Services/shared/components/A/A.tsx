import React from "react";

export default function A({
  children,
  href,
}: {
  children: React.ReactNode;
  href?: string;
}) {
  return (
    <a
      href={href || "/services"}
      className="sm:text-[1rem] w-full text-sm sm:mb-5 mb-3.5 md:px-6 !leading-8 hover:text-primary"
    >
      {children}
    </a>
  );
}
