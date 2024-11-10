import moment from "moment";
import type { TransferHistorial } from "../../../../domain";
import Cookies from "js-cookie";
import useTranslation from "../../../../../../../Shared/hooks/useTranslation";
import ChevronDownIcon from "../../../../../../../../components/UI/ChevronDownIcon";

interface Props {
  item: TransferHistorial;
}

export default function Item({ item }: Props) {
  const { translation } = useTranslation();
  const email = Cookies.get("eons_user");
  const dateStr = moment(item.date).format("MM/DD/yyyy hh:mm A");

  const receive = email === item.receiver;

  const text = receive
    ? `${translation.Esence.historial_item_1} ${item.amount} ${translation.Esence.historial_item_4}`
    : `${translation.Esence.historial_item_2} ${item.amount} ${translation.Esence.historial_item_3}`;

  return (
    <article className="flex flex-col sm:flex-row justify-between shadow-md items-start sm:items-center py-3 sm:px-7 px-5 rounded-3xl bg-white border-[1px] gap-y-2 sm:gap-x-3">
      <h2 className="text-base font-medium mb-0">
        {text}{" "}
        <span className="text-blue-500">
          {receive ? item.sender : item.receiver}
        </span>
      </h2>

      <p className="mb-0 text-sm text-gray-500">{dateStr}</p>
    </article>
  );
}
