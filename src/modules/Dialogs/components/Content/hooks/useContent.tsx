import React, { useState } from "react";
import { SECTIONS } from "../../../constants";
import useGetAllDialogs from "./useGetAllDialogs";
import type { Dialog } from "../../../interfaces";

export default function useContent(type: string) {
  const [selected, setSelected] = useState(SECTIONS.DIALOGS);

  const [control, setControl] = useState(true);
  // const dataDialogs = useGetAllDialogs(control,setControl,type)

  const dataDialogs: Dialog[] = [
    {
      descripcion: "Dialogo 1",
      fecha: new Date(),
      id: 1,
      id_usuario: "2",
      respuesta: "buenas",
      tipo: "",
    },
    {
      descripcion: "Dialogo 1",
      fecha: new Date(),
      id: 1,
      id_usuario: "2",
      respuesta: "buenas",
      tipo: "",
    },
    {
      descripcion: "Dialogo 1",
      fecha: new Date(),
      id: 1,
      id_usuario: "2",
      respuesta: "buenas",
      tipo: "",
    },
    {
      descripcion: "Dialogo 1",
      fecha: new Date(),
      id: 1,
      id_usuario: "2",
      respuesta: "buenas",
      tipo: "",
    },
    {
      descripcion: "Dialogo 1",
      fecha: new Date(),
      id: 1,
      id_usuario: "2",
      respuesta: "buenas",
      tipo: "",
    },
  ];

  function handleChangeSection(s: SECTIONS) {
    setSelected(s);
  }

  function handleAddDialog(id: string) {}

  function handleDeleteDialog(id: string) {}

  return {
    selected,
    handleChangeSection,
    handleAddDialog,
    handleDeleteDialog,
    dataDialogs,
  };
}
