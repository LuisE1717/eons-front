import { useEffect, useState } from "react";
import clsx from "clsx";

interface Props {
  text: string;
  question: string;
}

export default function Button({ question, text }: Props) {
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    if (disabled) {
      setTimeout(() => {
        setDisabled(false);
      }, 10000);
    }
  }, [disabled]);

  function handleClick() {
    setDisabled(true);
  }

  const CLASS = clsx(
    "border-2 border-gray-200",
    "px-8 py-3",
    "font-medium",
    "rounded-full",
    "transition-all duration-200",
    "bg-white",
    "w-full",
    "sm:text-lg text-base",
    "shadow-md",

    { "hover:shadow-lg": !disabled },
    { "opacity-60": disabled }
  );

  return (
    <div className="flex flex-col items-center w-full">
      <p className="mb-2 text-sm text-gray-400">{question}</p>

      <button disabled={disabled} onClick={handleClick} className={CLASS}>
        {text}
      </button>
    </div>
  );
}
