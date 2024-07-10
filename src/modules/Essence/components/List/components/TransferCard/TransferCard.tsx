import type { Transfer } from "../../domain";

interface Props {
  transfer: Transfer;
}

export default function TransferCard({ transfer }: Props) {
  const date = `${transfer.date.getUTCDay()}/${transfer.date.getMonth()}/${transfer.date.getFullYear()}`;

  return (
    <article className="bg-white cursor-pointer rounded-lg flex items-center justify-between py-3 sm:px-7 px-5 transition-all duration-200 hover:scale-105 shadow-sm">
      <section className="flex flex-col">
        <h1 className="sm:text-lg text-base mb-0 font-semibold">
          {`${transfer.user} (${transfer.count})`}
        </h1>
      </section>

      <section>
        <span className="sm:text-base text-sm text-gray-400">{date}</span>
      </section>
    </article>
  );
}
