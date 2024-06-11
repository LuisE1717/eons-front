import type React from "react";

interface Props {
  children: React.ReactNode;
}

export default function ListContainer({ children }: Props) {
  return (
    <div className="flex w-full items-center px-3 mt-10 mb-10 flex-col">
      <div className="flex flex-col bg-gray-100 sm:py-8 py-6 sm:px-10 px-5 w-full max-w-[800px] rounded-xl">
        {children}
      </div>
    </div>
  );
}
