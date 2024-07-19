import { Tooltip } from "react-tooltip";

interface Props {
  text: string;
}

export default function Book({ text }: Props) {
  return (
    <div className="flex justify-end w-full">
      <figure className="cursor-pointer book-tooltip">
        <img src="/book.webp" alt="" className="w-[40px] object-contain" />
      </figure>

      <Tooltip place="bottom" anchorSelect=".book-tooltip">
        {text}
      </Tooltip>
    </div>
  );
}
