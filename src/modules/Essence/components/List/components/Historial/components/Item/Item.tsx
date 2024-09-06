import moment from "moment";
import type { TransferHistorial } from "../../../../domain";
import useTranslation from "../../../../../../../Shared/hooks/useTranslation";

interface Props {
  item: TransferHistorial;
}

export default function Item({ item }: Props) {
  const { translation } = useTranslation();
  const dateStr = moment(item.fecha).format("YYYY/MM/DD");

  const text = item.recibido
    ? `${translation.Esence.historial_item_1} ${item.cantidad} ${translation.Esence.historial_item_3}`
    : `${translation.Esence.historial_item_2} ${item.cantidad} ${translation.Esence.historial_item_3}`;

  return (
    <article className="flex justify-between shadow-md items-center py-3 sm:px-7 px-5 rounded-2xl bg-white border-[1px]">
      <h2 className="text-base font-medium mb-0">
        {text} <span className="text-blue-500">{item.usuario}</span>
      </h2>

      <p className="mb-0 text-sm text-gray-500">{dateStr}</p>
    </article>
  );
}
