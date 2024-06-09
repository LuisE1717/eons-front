import clsx from "clsx";

interface Props {
  icon: React.FC<{ size: number }>;
  selected: boolean;
  handleClick(): void;
}

export default function Icon({ selected, icon, handleClick }: Props) {
  const CLASS = clsx(
    "shadow-md shadow-gray-400",
    "sm:px-6 px-3.5 sm:py-4 py-2.5",
    "rounded-2xl",
    "cursor-pointer",
    "transition-all duration-200",

    {
      "shadow-inner": selected,
    }
  );

  return (
    <div className={CLASS} onClick={handleClick}>
      <i className="stroke-primary">{icon({ size: 36 })}</i>
    </div>
  );
}
