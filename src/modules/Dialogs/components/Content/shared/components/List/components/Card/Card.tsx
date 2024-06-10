import { createRef, useState } from "react";
import type { Dialog } from "../../../../../../../interfaces";
import Icon from "./components/Icon/Icon";
import Menu from "./components/Menu/Menu";
import moment from "moment";

interface Props {
  dialog: Dialog;
  handleAddDialog(): void;
  handleDeleteDialog(): void;
}

export default function Card({
  dialog,
  handleAddDialog,
  handleDeleteDialog,
}: Props) {
  const ref = createRef<HTMLDivElement>();

  const [openMenu, setOpenMenu] = useState(false);

  const time = moment(dialog.date).format("hh:mm A");
  const dateStr = dialog.date.toLocaleDateString();

  function handleOpen() {
    setOpenMenu((prev) => !prev);
  }

  function handleClose() {
    setOpenMenu(false);
  }

  return (
    <article className="flex justify-between items-center py-2 px-7 rounded-full bg-white">
      <div>
        <h2 className="text-base font-medium mb-0">{dialog.name}</h2>
      </div>

      <div className="flex items-center gap-x-2">
        <div className="text-sm text-gray-500 text-center">
          <p className="mb-0.5">{time}</p>
          <p className="mb-0">{dateStr}</p>
        </div>

        <div className="cursor-pointer" ref={ref}>
          <div onClick={handleOpen}>
            <Icon />
          </div>

          {openMenu && (
            <Menu
              wrapRef={ref}
              handleClose={handleClose}
              handleAdd={handleAddDialog}
              handleDelete={handleDeleteDialog}
            />
          )}
        </div>
      </div>
    </article>
  );
}
