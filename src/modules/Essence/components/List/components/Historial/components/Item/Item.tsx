import moment from "moment";
import type { TransferHistorial } from "../../../../domain";
import Cookies from "js-cookie";
import useTranslation from "../../../../../../../Shared/hooks/useTranslation";

interface Props {
  item: TransferHistorial;
}

export default function Item({ item }: Props) {
  const { translation } = useTranslation();
  const email = Cookies.get("eons_user");
  const dateStr = moment(item.date).format("MM/DD/yyyy hh:mm");

  const receive = email === item.receiverEmail;

  const text = receive
    ? `${translation.Esence.historial_item_1} ${item.amount} ${translation.Esence.historial_item_3}`
    : `${translation.Esence.historial_item_2} ${item.amount} ${translation.Esence.historial_item_3}`;

  return (
    <article className="flex justify-between shadow-md items-center py-3 sm:px-7 px-5 rounded-3xl bg-white border-[1px] gap-x-5">
      <h2 className="text-base font-medium mb-0">
        {text}{" "}
        <span className="text-blue-500">
          {receive ? item.senderEmail : item.receiverEmail}
        </span>
      </h2>

      <p className="mb-0 text-sm text-gray-500">{dateStr}</p>
    </article>
  );
}
