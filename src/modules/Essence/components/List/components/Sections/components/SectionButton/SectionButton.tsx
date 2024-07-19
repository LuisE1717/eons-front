import clsx from "clsx";

interface Props {
  handleClick(): void;
  text: string;
  selected: boolean;
  disabled: boolean;
}

export default function SectionButton({
  handleClick,
  selected,
  text,
  disabled,
}: Props) {
  const CLASS = clsx(
    "py-4 px-10",
    "text-lg",
    "rounded-full",
    "bg-transparent",
    "shadow-lg",
    "w-full",
    {
      "border-2 border-primary": selected,
    }
  );

  return (
    <button onClick={handleClick} className={CLASS} disabled={disabled}>
      {text}{" "}
      {disabled && <span className="text-primary">{"(Próximamente)"}</span>}
    </button>
  );
}
