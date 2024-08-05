import clsx from "clsx";
import useTranslation from "../../../../../../../Shared/hooks/useTranslation";

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

  const { translation } = useTranslation()

  return (
    <button onClick={handleClick} className={CLASS} disabled={disabled}>
      {text}{" "}
      {disabled && 
      <>
      (
      <span className="text-primary">{translation.Landing.text14_1}</span>
      )
      </>
      }
    </button>
  );
}
