import { Modal } from "react-responsive-modal";
import Button from "../../../../../../components/UI/Button/Button";
import { useState } from "react";

interface Props {
  handleClose(): void;
  open: boolean;
  handleSubmit(): void;
}

export default function DeleteModal({
  handleClose,
  open,
  handleSubmit,
}: Props) {
  const [text, setText] = useState("");

  return (
    <Modal open={open} onClose={handleClose} center showCloseIcon={false}>
      <h2 className="text-xl font-semibold">Eliminar diálogo</h2>
      <p>¿Está seguro que desea eliminar el diálogo? </p>

      <div className="flex justify-end w-full mt-3">
        <Button loading={false} onClick={handleSubmit} full={false} size="sm">
          Eliminar
        </Button>
      </div>
    </Modal>
  );
}
