import clsx from "clsx";

interface Props {
  handleClick(): void;
  text: string;
  selected: boolean;
}

export default function SectionButton({ handleClick, selected, text }: Props) {
  const CLASS = clsx("py-2 px-5", "text-lg", "rounded-full", "bg-transparent", {
    "border-2 border-primary": selected,
  });

  return (
    <button onClick={handleClick} className={CLASS}>
      {text}
    </button>
  );
}
