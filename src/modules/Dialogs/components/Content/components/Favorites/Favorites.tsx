import React from "react";
import List from "../../shared/components/List/List";
import type { Dialog } from "../../../../interfaces";

interface Props {
  handleAddDialog(id: string): void;
  handleDeleteDialog(id: string): void;
}

export default function Favorites({
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
      handleAddDialog={handleAddDialog}
      handleDeleteDialog={handleDeleteDialog}
    />
  );
}
