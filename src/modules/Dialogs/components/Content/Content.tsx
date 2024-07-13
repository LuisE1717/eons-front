import Button from "../../../../components/UI/Button/Button";
import ListContainer from "../../../Shared/components/ListContainer/ListContainer";
import { SECTIONS } from "../../constants";
import Dialogs from "./components/Dialogs/Dialogs";
import Favorites from "./components/Favorites/Favorites";
import Switch from "./components/Switch/Switch";
import useContent from "./hooks/useContent";

export default function Content({type}) {
  const { selected, handleChangeSection, handleAddDialog, handleDeleteDialog, dataDialogs } =
    useContent(type);

  return (
  <>
    <ListContainer>
      <Switch handleChangeSection={handleChangeSection} selected={selected} />

      {selected === SECTIONS.DIALOGS && (
        <Dialogs
          dialogs={dataDialogs.data}
          handleAddDialog={handleAddDialog}
          handleDeleteDialog={handleDeleteDialog}
        />
      )}
      {selected === SECTIONS.FAVORITES && (
        <Favorites
          dialogs={dataDialogs.data}
          handleAddDialog={handleAddDialog}
          handleDeleteDialog={handleDeleteDialog}
        />
      )}
    </ListContainer>
    <div className="flex flex-col w-full items-center gap-x-3 mb-4">
      <a href="/services">
        <Button loading={false}>{"Volver al Menu"}</Button>
      </a>
    </div>
  </>
  );
}
