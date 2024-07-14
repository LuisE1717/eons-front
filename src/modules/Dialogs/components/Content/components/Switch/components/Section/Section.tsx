import clsx from "clsx";

interface Props {
  text: string;
  handleClick(): void;
  selected: boolean;
}

export default function Section({ text, handleClick, selected }: Props) {
  const CLASS = clsx(
    "flex justify-center items-center",
    "w-max",
    "cursor-pointer",
    "text-center",
    "rounded-full",
    "text-base",
    "px-8 py-2",
    "bg-white",

    {
      "border-2 border-primary": selected,
    }
  );

  return (
    <div className={CLASS} onClick={handleClick}>
      {text}
    </div>
  );
}
