import moment from "moment";

interface Props {
  date: Date;
  name: string;
  children: React.ReactNode;
}

export default function Card({ children, date, name }: Props) {
  const time = moment(date).format("hh:mm A");
  const dateStr = moment(date).format("YYYY/MM/DD");

  return (
    <article className="flex justify-between shadow-md shadow-gray-400 items-center py-2 sm:px-7 px-5 rounded-2xl bg-white border-2">
      <div>
        <h2 className="text-base font-medium mb-0">{name}</h2>
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
