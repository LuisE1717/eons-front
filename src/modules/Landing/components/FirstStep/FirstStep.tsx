import React from "react";
import Step from "../../shared/components/Step/Step";
import P from "../../shared/components/P/P";
import useTranslation from "../../../Shared/hooks/useTranslation";

export default function FirstStep() {
  const { translation } = useTranslation();

  return (
    <Step>
      <P>{translation.Landing.text5}</P>
    </Step>
  );
}
