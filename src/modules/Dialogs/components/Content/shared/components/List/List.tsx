import type { Dialog } from "../../../../../interfaces";
import Card from "./components/Card/Card";

interface Props {
  dialogs: Dialog[];
  handleAddDialog(id: string): void;
  handleDeleteDialog(id: string): void;
}

export default function List({
  dialogs,
  handleAddDialog,
  handleDeleteDialog,
}: Props) {
  return (
    <div className="flex flex-col w-full gap-y-3">
      {dialogs.map((d) => (
        <Card
          dialog={d}
          key={d.id}
          handleAddDialog={() => handleAddDialog(d.id.toString())}
          handleDeleteDialog={() => handleDeleteDialog(d.id.toString())}
        />
      ))}
    </div>
  );
}
