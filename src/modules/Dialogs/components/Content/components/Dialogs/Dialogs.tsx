import React from "react";
import type { Dialog } from "../../../../interfaces";
import List from "../../shared/components/List/List";

interface Props {
  handleAddDialog(id: string): void;
  handleDeleteDialog(id: string): void;
}

export default function Dialogs({
  handleAddDialog,
  handleDeleteDialog,
}: Props) {
  const dialogs: Dialog[] = Array.from({ length: 6 }).map((_, index) => ({
    date: new Date(),
    id: String(index),
    name: "Dialogo 1",
  }));

  return (
    <List
      dialogs={dialogs}
      handleDeleteDialog={handleDeleteDialog}
      handleAddDialog={handleAddDialog}
    />
  );
}
