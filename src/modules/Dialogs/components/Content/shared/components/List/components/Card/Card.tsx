import Dropdown from "../../../../../../../../Shared/components/Dropdown/Dropdown";
import type { Dialog } from "../../../../../../../interfaces";
import Icon from "./components/Icon/Icon";
import moment from "moment";
import DropdwonIcon from "../../../../../../../../Shared/components/DropdownIcon/DropdwonIcon";
import Heart from "./components/Heart/Heart";
import Trash from "./components/Trash/Trash";

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
  const time = moment(dialog.fecha).format("hh:mm A");
  const dateStr = moment(dialog.fecha).format("YYYY/MM/DD");

  return (
    <article className="flex justify-between shadow-md shadow-gray-400 items-center py-2 sm:px-7 px-5 rounded-2xl bg-white border-2">
      <div>
        <h2 className="text-base font-medium mb-0">{dialog.descripcion}</h2>
      </div>

      <div className="flex items-center gap-x-2">
        <div className="text-sm text-gray-500 text-right">
          <p className="mb-0.5">{time}</p>
          <p className="mb-0">{dateStr}</p>
        </div>

        <Dropdown header={<Icon />} position="left">
          <DropdwonIcon
            icon={<Heart size={20} />}
            handleClick={handleAddDialog}
          />
          <DropdwonIcon
            icon={<Trash size={20} />}
            handleClick={handleDeleteDialog}
          />
        </Dropdown>
      </div>
    </article>
  );
}
