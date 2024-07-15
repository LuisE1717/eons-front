import React from "react";
import List from "../../shared/components/List/List";
import type { Dialog } from "../../../../interfaces";

interface Props {
  handleAddDialog(id: string): void;
  handleDeleteDialog(id: string): void;
  dialogs:Dialog[];
}

export default function Favorites({
  handleAddDialog,
  handleDeleteDialog,
  dialogs
}: Props) {
  
  return (
    <List
      dialogs={dialogs}
      handleAddDialog={handleAddDialog}
      handleDeleteDialog={handleDeleteDialog}
    />
  );
}
