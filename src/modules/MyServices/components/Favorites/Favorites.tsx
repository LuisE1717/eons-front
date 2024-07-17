
import List from "../../../Shared/components/ListContainer/shared/components/List/List";
import DropdwonIcon from "../../../Shared/components/DropdownIcon/DropdwonIcon";
import Trash from "../../../Dialogs/components/Content/shared/components/Trash/Trash";
import Card from "../../../Shared/components/ListContainer/shared/components/Card/Card";
import Dropdown from "../../../Shared/components/Dropdown/Dropdown";
import Heart from "../../../Dialogs/components/Content/shared/components/Heart/Heart";
import Icon from "../../../Dialogs/components/Content/shared/components/Icon/Icon";
import type { Service } from "../../domain";

interface Props {
  handleFavorite(id: number): void;
  handleDelete(id: number): void;
  services: Service[];
}

export default function Favorites({
  handleDelete,
  handleFavorite,
  services,
}: Props) {
  return (
    <List>
      {services.map((d) => (
        <Card key={d.id} date={d.date} name={d.name}>
          <Dropdown header={<Icon />} position="left">
            <DropdwonIcon
              icon={<Heart size={20} />}
              handleClick={() => handleFavorite(d.id)}
            />
            <DropdwonIcon
              icon={<Trash size={20} />}
              handleClick={() => handleDelete(d.id)}
            />
          </Dropdown>
        </Card>
      ))}
    </List>
  );
}
