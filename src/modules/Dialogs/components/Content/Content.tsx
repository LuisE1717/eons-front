import { SECTIONS } from "../../constants";
import Dialogs from "./components/Dialogs/Dialogs";
import Favorites from "./components/Favorites/Favorites";
import Image from "./components/Image/Image";
import Switch from "./components/Switch/Switch";
import useContent from "./hooks/useContent";

export default function Content({ type }) {
  const {
    selected,
    handleChangeSection,
    handleAddDialog,
    handleDeleteDialog,
    dataDialogs,
  } = useContent(type);

  return (
    <main className="flex flex-col items-center px-6 pb-20">
      <div className="w-full max-w-[1100px] flex flex-col">
        <div className="flex lg:flex-row flex-col-reverse items-center justify-between w-full gap-x-10 gap-y-10">
          <div className="flex flex-col items-center lg:items-start w-full max-w-[500px]">
            <Switch
              handleChangeSection={handleChangeSection}
              selected={selected}
            />

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
          </div>

          <Image />
        </div>
      </div>
    </main>
  );
}
