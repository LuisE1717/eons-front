import React from "react";
import useList from "./hooks/useList";
import Card from "./components/Card/Card";
import Header from "./components/Header/Header";

export default function List() {
  const { list, handleClick } = useList();

  return (
    <div className="flex w-full items-center px-3 mt-10 mb-10 flex-col">
      <div className="flex flex-col bg-gray-100 sm:py-8 py-6 sm:px-10 px-5 w-full max-w-[800px] rounded-xl">
        <Header />

        <div className="flex flex-col sm:gap-y-4 gap-y-2.5">
          {list.map((e) => (
            <Card
              key={e.id}
              essence={e}
              handleClick={() => handleClick(e.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
