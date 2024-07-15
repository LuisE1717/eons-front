import clsx from "clsx";

interface Props {
  icon: React.ReactNode;
  handleClick(): void;
}

export default function DropdwonIcon({ icon, handleClick }: Props) {
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
      {icon}
    </div>
  );
}
