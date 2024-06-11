import React, { useState } from "react";
import ListContainer from "../../../Shared/components/ListContainer/ListContainer";
import useTranslation from "../../../Shared/hooks/useTranslation";
import type { Spirit } from "../../interfaces";
import Header from "./components/Header/Header";
import Empty from "./components/Empty/Empty";
import Card from "./components/Card/Card";

export default function Content() {
  useTranslation();

  const [spirits, setSpirits] = useState<Spirit[]>([]);

  function handleAdd() {
    setSpirits((prev) => [...prev, { id: "1", name: "Espíritu 1" }]);
  }

  return (
    <ListContainer>
      <Header />

      {spirits.length === 0 && <Empty handleAdd={handleAdd} />}

      {spirits.length > 0 && (
        <div className="flex flex-col gap-y-2 min-h-[400px] overflow-y-auto">
          {spirits.map((s) => (
            <Card spirit={s} key={s.id} />
          ))}
        </div>
      )}
    </ListContainer>
  );
}
