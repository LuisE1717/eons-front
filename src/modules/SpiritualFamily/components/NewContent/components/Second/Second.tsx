import { useState } from "react";
import Spirit from "./components/Spirit/Spirit";

interface ISpirit {
  id: string;
  name: string;
}

export default function Second() {
  const [spirits, setSpirits] = useState<ISpirit[]>([
    { id: "1", name: "Espiritu 1" },
    { id: "2", name: "Espiritu 2" },
    { id: "3", name: "Espiritu 3" },
    { id: "4", name: "Espiritu 4" },
    { id: "5", name: "Espiritu 5" },
    { id: "6", name: "Espiritu 6" },
    { id: "7", name: "Espiritu 7" },
    { id: "8", name: "Espiritu 8" },
    { id: "9", name: "Espiritu 9" },
    { id: "10", name: "Espiritu 10" },
  ]);

  return (
    <section className="w-full relative flex justify-center">
      <img src="/marco.png" alt="" />

      <div className="flex justify-center w-full h-full absolute top-0 left-0">
        <div className="w-full h-full grid lg:grid-cols-6 sm:grid-cols-4 grid-cols-2 lg:grid-rows-4 lg:py-24 py-14 px-5 max-w-[900px]">
          {spirits.map((s) => (
            <Spirit key={s.id} name={s.name} />
          ))}
        </div>
      </div>
    </section>
  );
}
