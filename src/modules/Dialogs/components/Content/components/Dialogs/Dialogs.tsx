import React from "react";
import type { Dialog } from "../../../../interfaces";
import List from "../../shared/components/List/List";

interface Props {
  handleAddDialog(id: string): void;
  handleDeleteDialog(id: string): void;
  dialogs:Dialog[];
}

export default function Dialogs({
  handleAddDialog,
  handleDeleteDialog,
  dialogs
}: Props) {

  return (
    <List
      dialogs={dialogs}
      handleDeleteDialog={handleDeleteDialog}
      handleAddDialog={handleAddDialog}
    />
  );
}
