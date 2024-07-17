import type { Dialog } from "../../../../interfaces";
import Card from "../../../../../Shared/components/ListContainer/shared/components/Card/Card";
import List from "../../../../../Shared/components/ListContainer/shared/components/List/List";
import Dropdown from "../../../../../Shared/components/Dropdown/Dropdown";
import Icon from "../../shared/components/Icon/Icon";
import DropdwonIcon from "../../../../../Shared/components/DropdownIcon/DropdwonIcon";
import Trash from "../../shared/components/Trash/Trash";
import Heart from "../../shared/components/Heart/Heart";

interface Props {
  handleAddDialog(id: number): void;
  handleDeleteDialog(id: number): void;
  dialogs: Dialog[];
}

export default function Favorites({
  handleAddDialog,
  handleDeleteDialog,
  dialogs,
}: Props) {
  return (
    <List>
      {dialogs.map((d) => (
        <Card key={d.id} date={d.fecha} name={d.descripcion}>
          <Dropdown header={<Icon />} position="left">
            <DropdwonIcon
              icon={<Heart size={20} />}
              handleClick={() => handleAddDialog(d.id)}
            />
            <DropdwonIcon
              icon={<Trash size={20} />}
              handleClick={() => handleDeleteDialog(d.id)}
            />
          </Dropdown>
        </Card>
      ))}
    </List>
  );
}
