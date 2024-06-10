import clsx from "clsx";

interface Props {
  text: string;
  handleClick(): void;
  selected: boolean;
}

export default function Section({ text, handleClick, selected }: Props) {
  const CLASS = clsx(
    "flex justify-center items-center",
    "w-full",
    "cursor-pointer",
    "text-center",
    "text-white",
    "rounded-full",
    "sm:text-lg text-base",
    "px-6 py-3",

    {
      "bg-black": selected,
    }
  );

  return (
    <div className={CLASS} onClick={handleClick}>
      {text}
    </div>
  );
}
