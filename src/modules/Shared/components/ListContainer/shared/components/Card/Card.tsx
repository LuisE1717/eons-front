import moment from "moment";
import type { Dialog } from "../../../../../../Dialogs/interfaces";

interface Props {
  dialog: Dialog;
  children: React.ReactNode;
  handleWatchDialog(id: number): void;
}

export default function Card({ children, dialog, handleWatchDialog }: Props) {
  const time = moment(dialog.fecha).format("hh:mm A");
  const dateStr = moment(dialog.fecha).format("YYYY/MM/DD");

  return (
    <article className="flex justify-between shadow-md shadow-gray-400 items-center py-2 sm:px-7 px-5 rounded-2xl bg-white border-2">
      <div
        className="cursor-pointer"
        onClick={() => handleWatchDialog(dialog.id)}
      >
        <h2 className="text-xl font-medium mb-0">
          {dialog.tipo == "dialog" ? dialog.descripcion : dialog.tipo}
        </h2>
      </div>

      <div className="flex items-center gap-x-2">
        <div className="text-sm text-gray-500 text-right">
          <p className="mb-0.5">{time}</p>
          <p className="mb-0">{dateStr}</p>
        </div>

        {children}
      </div>
    </article>
  );
}
