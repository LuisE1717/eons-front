import { SECTIONS } from "../../constants";
import Dialogs from "./components/Dialogs/Dialogs";
import Favorites from "./components/Favorites/Favorites";
import useContent from "./hooks/useContent";
import ListContainer from "../../../Shared/components/ListContainer/ListContainer";
import DeleteModal from "./components/DeleteModal/DeleteModal";

export default function Content({ type }) {
  const {
    selected,
    handleFavDialog,
    handleDeleteDialog,
    handleWatchDialog,
    dataDialogs,
    items,
    setOpenModal,
    openModal,
    handleOpenDelete,
  } = useContent(type);

  return (
    <ListContainer image={type=='dialog'?"/pixelcut-export (12).webp":"/informacion 3.webp"} items={items}>
      <DeleteModal
        handleClose={() => setOpenModal(null)}
        open={openModal ? openModal.type === "delete" : false}
        handleSubmit={
          openModal ? () => handleDeleteDialog(openModal.id) : () => {}
        }
      />

      {selected === SECTIONS.DIALOGS && (
        <Dialogs
          type={type}
          dialogs={dataDialogs.data}
          handleWatchDialog={handleWatchDialog}
          handleFavDialog={handleFavDialog}
          handleDeleteDialog={handleOpenDelete}
        />
      )}

      {selected === SECTIONS.FAVORITES && (
        <Favorites
          type={type}
          dialogs={dataDialogs.data}
          handleFavDialog={handleFavDialog}
          handleDeleteDialog={handleOpenDelete}
          handleWatchDialog={handleWatchDialog}
        />
      )}
    </ListContainer>
  );
}
