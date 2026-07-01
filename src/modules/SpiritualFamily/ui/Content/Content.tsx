import React, { useState } from "react";
import ListContainer from "../../../Shared/components/ListContainer/ListContainer";
import useTranslation from "../../../Shared/hooks/useTranslation";
import type { Spirit } from "@modules/SpiritualFamily/domain";
import Header from "./components/Header/Header";
import Empty from "./components/Empty/Empty";
import Card from "./components/Card/Card";
import Selected from "./components/Selected/Selected";
import useGetAllSpirits from "@modules/SpiritualFamily/application/useGetAllSpirits";
import useCreateSpirit from "@modules/SpiritualFamily/application/useCreateSpirit";

export default function Content() {
  const i18 = useTranslation();

  const [spirits, setSpirits] = useState<Spirit[]>([]);

  const [selected, setSelected] = useState<Spirit | null>(null);

  const [control,setControl] = useState<boolean>(true)

  const dataSpirits = useGetAllSpirits(control,setControl)

  const { createSpirit } = useCreateSpirit()

  async function handleAdd() {
    await createSpirit()
    setControl(true)
  }

  function handleSelect(s: Spirit) {
    setSelected(s);
  }

  function handleDesSelect() {
    setSelected(null);
  }

  return (
    <ListContainer items={[]} image="/pixelcut-export (12).webp">
      {!selected && <Header />}

      {dataSpirits.data.length === 0 && <Empty handleAdd={handleAdd} />}
      {dataSpirits.data.length > 0 && !selected && (
        <div className="flex flex-col gap-y-2 min-h-[400px] overflow-y-auto">
          {dataSpirits.data.map((s) => (
            <Card spirit={s} key={s.id} handleClick={() => handleSelect(s)} />
          ))}
        </div>
      )}

      {dataSpirits.data.length > 0 && selected && (
        <Selected handleClose={handleDesSelect} spirit={selected} />
      )}
    </ListContainer>
  );
}
