import React, { useState } from "react";
import { SECTIONS } from "../../../constants";
import useGetAllDialogs from "./useGetAllDialogs";

export default function useContent() {
  const [selected, setSelected] = useState(SECTIONS.DIALOGS);

  const [control,setControl] = useState(true)
  const dataDialogs = useGetAllDialogs(control,setControl)

  function handleChangeSection(s: SECTIONS) {
    setSelected(s);
  }

  function handleAddDialog(id: string) {}

  function handleDeleteDialog(id: string) {}

  return { selected, handleChangeSection, handleAddDialog, handleDeleteDialog,dataDialogs };
}
