import React from "react";
import P from "./components/P/P";
import Button from "./components/Button/Button";
import useTranslation from "../../../../../Shared/hooks/useTranslation";

interface Props {
  handleAdd(): void;
}

export default function Empty({ handleAdd }: Props) {
  const { translation } = useTranslation();

  return (
    <div className="flex flex-col items-center">
      <P>{translation.Spiritual_Family.empty_1}</P>
      <P>{translation.Spiritual_Family.empty_2}</P>
      <P>{translation.Spiritual_Family.empty_3}</P>
      <P>{translation.Spiritual_Family.empty_4}</P>

      <Button handleClick={handleAdd} />
    </div>
  );
}
