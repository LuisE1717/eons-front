import { useEffect, useState } from "react";
import AppButton from "../../../../components/UI/Button/Button";

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

  return (
    <div className="flex flex-col items-center w-full">
      <p className="mb-2 text-sm text-gray-400">{question}</p>

      <AppButton loading={false} disabled={disabled} onClick={handleClick}>
        {text}
      </AppButton>
    </div>
  );
}
