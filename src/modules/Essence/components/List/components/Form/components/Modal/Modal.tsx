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
    <IModal open={open} onClose={handleClose} center showCloseIcon={true}>
      <h2 className="sm:text-3xl text-2xl font-semibold mb-4 text-center text-blue-700">
        {translation.Esence.header}
      </h2>

      <p className="text-center sm:text-lg text-base">
        {`${translation.Esence.transfer_question_1} ${count} ${translation.Esence.transfer_question_2}`}{" "}
        <span className="text-blue-500">{to}</span>?
      </p>

      <div className="flex justify-center gap-x-4 w-full mt-8">
        <Button
          loading={loading}
          onClick={handleSubmit}
          full={true}
          size="base"
        >
          {translation.Esence.execute}
        </Button>

        <Button loading={loading} onClick={handleClose} full={true} size="base">
          {translation.Esence.cancell}
        </Button>
      </div>
    </IModal>
  );
}
