import type { Dialog } from "../../../../interfaces";
import Card from "../../../../../Shared/components/ListContainer/shared/components/Card/Card";
import List from "../../../../../Shared/components/ListContainer/shared/components/List/List";
import Dropdown from "../../../../../Shared/components/Dropdown/Dropdown";
import Icon from "../../shared/components/Icon/Icon";
import DropdwonIcon from "../../../../../Shared/components/DropdownIcon/DropdwonIcon";
import Trash from "../../shared/components/Trash/Trash";
import Heart from "../../shared/components/Heart/Heart";
import NoDialogs from "../NoDialogs/NoDialogs";

interface Props {
  handleFavDialog(id: number): void;
  handleDeleteDialog(id: number): void;
  handleWatchDialog(id: number): void;
  dialogs: Dialog[];
  type: string;
}

export default function Dialogs({
  handleFavDialog,
  handleDeleteDialog,
  handleWatchDialog,
  dialogs,
  type,
}: Props) {
  return (
    <>
      {dialogs.length > 0 ? (
        <List>
          {dialogs.map((d) => (
            <Card dialog={d} key={d.id} handleWatchDialog={handleWatchDialog}>
              <Dropdown no_close header={<Icon />} position="left">
                <DropdwonIcon
                  icon={<Heart favorite={d.favorito} size={20} />}
                  handleClick={() => handleFavDialog(d.id)}
                />
                <DropdwonIcon
                  icon={<Trash size={20} />}
                  handleClick={() => handleDeleteDialog(d.id)}
                />
              </Dropdown>
            </Card>
          ))}
        </List>
      ) : (
        <NoDialogs fav={false} type={type} />
      )}
    </>
  );
}
