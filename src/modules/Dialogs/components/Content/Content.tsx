import ListContainer from "../../../Shared/components/ListContainer/ListContainer";
import { SECTIONS } from "../../constants";
import Dialogs from "./components/Dialogs/Dialogs";
import Favorites from "./components/Favorites/Favorites";
import Switch from "./components/Switch/Switch";
import useContent from "./hooks/useContent";

export default function Content() {
  const { selected, handleChangeSection, handleAddDialog, handleDeleteDialog } =
    useContent();

  return (
    <ListContainer>
      <Switch handleChangeSection={handleChangeSection} selected={selected} />

      {selected === SECTIONS.DIALOGS && (
        <Dialogs
          handleAddDialog={handleAddDialog}
          handleDeleteDialog={handleDeleteDialog}
        />
      )}
      {selected === SECTIONS.FAVORITES && (
        <Favorites
          handleAddDialog={handleAddDialog}
          handleDeleteDialog={handleDeleteDialog}
        />
      )}
    </ListContainer>
  );
}
