import React, { useState } from "react";
import { SECTIONS } from "../../../constants";

export default function useContent() {
  const [selected, setSelected] = useState(SECTIONS.DIALOGS);

  function handleChangeSection(s: SECTIONS) {
    setSelected(s);
  }

  function handleAddDialog(id: string) {}

  function handleDeleteDialog(id: string) {}

  return { selected, handleChangeSection, handleAddDialog, handleDeleteDialog };
}
