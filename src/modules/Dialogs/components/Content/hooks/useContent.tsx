import { useState } from "react";
import { SECTIONS } from "../../../constants";
import useGetAllDialogs from "./useGetAllDialogs";
import type { SwitchItem } from "../../../../Shared/components/ListContainer/domain";
import useTranslation from "../../../../Shared/hooks/useTranslation";

export default function useContent(type: string) {
  const { translation } = useTranslation();

  const [selected, setSelected] = useState(SECTIONS.DIALOGS);

  const [control, setControl] = useState(true);
  const dataDialogs = useGetAllDialogs(control, setControl, type);

  function handleChangeSection(s: SECTIONS) {
    setSelected(s);
  }

  function handleAddDialog(id: number) {}

  function handleDeleteDialog(id: number) {}

  const items: SwitchItem[] = [
    {
      click: () => handleChangeSection(SECTIONS.DIALOGS),
      selected: selected === SECTIONS.DIALOGS,
      text: translation.Dialogs.saved_dialogs,
    },
    {
      click: () => handleChangeSection(SECTIONS.FAVORITES),
      selected: selected === SECTIONS.FAVORITES,
      text: translation.Dialogs.favorites,
    },
  ];

  return {
    selected,
    handleChangeSection,
    handleAddDialog,
    handleDeleteDialog,
    dataDialogs,
    items,
  };
}
