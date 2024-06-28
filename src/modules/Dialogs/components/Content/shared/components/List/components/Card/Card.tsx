import Dropdown from "../../../../../../../../Shared/components/Dropdown/Dropdown";
import type { Dialog } from "../../../../../../../interfaces";
import Icon from "./components/Icon/Icon";
import moment from "moment";
import DropdownItem from "../../../../../../../../Shared/components/DropdownItem/DropdownItem";
import useTranslation from "../../../../../../../../Shared/hooks/useTranslation";
import Cookies from "js-cookie";

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
  const { translation } = useTranslation();

  const time = moment(dialog.date).format("hh:mm A");
  const dateStr = dialog.date.toLocaleDateString();

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

        <Dropdown header={<Icon />}>
          <DropdownItem
            handleClick={handleAddDialog}
            text={translation.Dialogs.add_text}
          />
          <DropdownItem
            handleClick={handleDeleteDialog}
            text={translation.Dialogs.delete_text}
          />
        </Dropdown>
      </div>
    </article>
  );
}
