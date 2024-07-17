import { SECTIONS } from "../../constants";
import Dialogs from "./components/Dialogs/Dialogs";
import Favorites from "./components/Favorites/Favorites";
import useContent from "./hooks/useContent";
import ListContainer from "../../../Shared/components/ListContainer/ListContainer";

export default function Content({ type }) {
  const { selected, handleAddDialog, handleDeleteDialog, dataDialogs, items } =
    useContent(type);

  return (
    <ListContainer image="/space.png" items={items}>
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
  );
}
