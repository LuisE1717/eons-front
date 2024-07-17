import { useState } from "react";
import { SECTIONS } from "../../../constants";
import useGetAllDialogs from "./useGetAllDialogs";
import type { SwitchItem } from "../../../../Shared/components/ListContainer/domain";
import useTranslation from "../../../../Shared/hooks/useTranslation";
import { deleteDialog, putDialog } from "../../../../../utils/api/dialogApi";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

export default function useContent(type: string) {
  const { translation } = useTranslation();

  const [selected, setSelected] = useState(SECTIONS.DIALOGS);

  const [control, setControl] = useState(true);
  const dataDialogs = useGetAllDialogs(control, setControl, type);

  function handleChangeSection(s: SECTIONS) {
    setSelected(s);
  }

  console.log(dataDialogs.data)

  async function handleFavDialog(id: number) {
    const dialog = dataDialogs.data.find((x) => x.id==id)
    if(dialog){
      let dialog_send 
      if(dialog.favorito){
        dialog_send = {
          ...dialog,
          favorito: false
        }
      }
      else{
        dialog_send = {
          ...dialog,
          favorito: true
        }
      }
      await putDialog(Cookies.get('eons_token')||'',dialog_send,id.toString())
        .then(() => {setControl(true)})
        .catch(() =>{toast.error(translation.fecth_error)})
    }
  }

  async function handleDeleteDialog(id: number) {
    const dialog = dataDialogs.data.find((x) => x.id==id)
    if(dialog){
      await deleteDialog(Cookies.get('eons_token')||'',id.toString())
        .then(() => {setControl(true)})
        .catch(() =>{toast.error(translation.fecth_error)})
    }
  }

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
    handleFavDialog,
    handleDeleteDialog,
    dataDialogs,
    items,
  };
}
