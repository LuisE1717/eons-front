import { Modal as IModal } from "react-responsive-modal";
import Button from "../../../../../../../../components/UI/Button/Button";

import "react-responsive-modal/styles.css";
import useTranslation from "../../../../../../../Shared/hooks/useTranslation";

interface Props {
  handleClose(): void;
  open: boolean;
  handleSubmit(): void;
  loading: boolean;
  count: number;
  to: string;
}

export default function Modal({
  handleClose,
  open,
  handleSubmit,
  count,
  loading,
  to,
}: Props) {
  const { translation } = useTranslation();

  return (
    <IModal open={open} onClose={handleClose} center showCloseIcon={false}>
      <h2 className="text-xl font-semibold mb-4">
        {translation.Esence.header}
      </h2>

      <p>{`${translation.Esence.transfer_question_1} ${count} ${translation.Esence.transfer_question_2} ${to}?`}</p>

      <div className="flex justify-end gap-x-2.5 w-full mt-4">
        <Button loading={loading} onClick={handleSubmit} full={false} size="sm">
          Transferir
        </Button>

        <Button loading={loading} onClick={handleClose} full={false} size="sm">
          Cancelar
        </Button>
      </div>
    </IModal>
  );
}
