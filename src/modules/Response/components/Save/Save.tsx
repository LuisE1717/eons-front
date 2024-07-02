import Button from "../../../../components/UI/Button/Button";
import useTranslation from "../../../Shared/hooks/useTranslation";
import { actionsInterprete } from "../../../Throw/domain/interpreter";

interface Props {
  action: string;
  response: string;
}

export default function Save({ action, response }: Props) {
  const { translation } = useTranslation();

  const navigate = actionsInterprete(action, response);

  return (
    <div className="flex w-full items-center gap-x-3">
      <a href={navigate} className="w-full">
        <Button loading={false}>{"Continuar sin guardar"}</Button>
      </a>

      <a href={navigate} className="w-full">
        <Button loading={false} color="primary">
          {"Guardar diálogo"}
        </Button>
      </a>
    </div>
  );
}
