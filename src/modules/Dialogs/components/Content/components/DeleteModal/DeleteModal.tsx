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
      <h2 className="text-xl font-semibold mb-4">Eliminar diálogo</h2>

      <p>
        ¿Está seguro que desea eliminar el diálogo? Escriba{" "}
        <span>Eliminar</span> en el cuadro de texto
      </p>

      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="outline-none w-full border-b-2 mt-2.5 border-gray-300 pb-1.5 focus:border-gray-400 transition-all duration-200"
      />

      <div className="flex justify-end w-full mt-4">
        <Button
          disabled={text !== "Eliminar"}
          loading={false}
          onClick={handleSubmit}
          full={false}
          size="sm"
        >
          Eliminar
        </Button>
      </div>
    </Modal>
  );
}
