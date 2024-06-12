import React, { useState } from "react";
import ListContainer from "../../../Shared/components/ListContainer/ListContainer";
import useTranslation from "../../../Shared/hooks/useTranslation";
import type { Spirit } from "../../interfaces";
import Header from "./components/Header/Header";
import Empty from "./components/Empty/Empty";
import Card from "./components/Card/Card";
import Selected from "./components/Selected/Selected";

export default function Content() {
  useTranslation();

  const [spirits, setSpirits] = useState<Spirit[]>([]);

  const [selected, setSelected] = useState<Spirit | null>(null);

  function handleAdd() {
    setSpirits((prev) => [
      ...prev,
      {
        id: "1",
        name: "Espíritu 1",
        description:
          "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sapiente consequuntur repellat reprehenderit aliquam vitae neque quis, praesentium accusantium cum excepturi maxime mollitia. Quam, amet. Eos?",
        image: "/blog-placeholder-1.jpg",
      },
    ]);
  }

  function handleSelect(s: Spirit) {
    setSelected(s);
  }

  function handleDesSelect() {
    setSelected(null);
  }

  return (
    <ListContainer>
      {!selected && <Header />}

      {spirits.length === 0 && <Empty handleAdd={handleAdd} />}
      {spirits.length > 0 && !selected && (
        <div className="flex flex-col gap-y-2 min-h-[400px] overflow-y-auto">
          {spirits.map((s) => (
            <Card spirit={s} key={s.id} handleClick={() => handleSelect(s)} />
          ))}
        </div>
      )}

      {spirits.length > 0 && selected && (
        <Selected handleClose={handleDesSelect} spirit={selected} />
      )}
    </ListContainer>
  );
}
