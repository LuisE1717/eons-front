import React from "react";
import First from "./components/First/First";
import FirstStep from "./components/FirstStep/FirstStep";
import Second from "./components/Second/Second";
import Third from "./components/Third/Third";

export default function NewContent() {
  return (
    <div className="flex w-full flex-col items-center px-8 mb-16">
      <main className="w-full flex-col flex max-w-[1100px] lg:pt-0 pt-10">
        <First />
        <FirstStep />
        <Second />
        <Third />
      </main>
    </div>
  );
}
