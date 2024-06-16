import clsx from "clsx";

interface Props {
  handleClick?: () => void;
  text: string;
  id?:string;
}

export default function DropdownItem({ handleClick, text, id }: Props) {
  const CLASS = clsx(
    "text-sm",
    "bg-white",
    "px-4 py-2",
    "transition-all duration-200",
    "hover:bg-gray-100",
    "cursor-pointer",
    "whitespace-nowrap"
  );

  return (
    <div className={CLASS} onClick={handleClick}>
      <a href={`/throw/01/${id}`}>
      {text}
      </a>
    </div>
  );
}
