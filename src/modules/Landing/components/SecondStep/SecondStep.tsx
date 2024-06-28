import React from "react";
import Step from "../../shared/components/Step/Step";
import useTranslation from "../../../Shared/hooks/useTranslation";
import P from "../../shared/components/P/P";
import Cookies from "js-cookie";

export default function SecondStep() {
  const { translation } = useTranslation();

  return (
    <Step>
      <P>{translation.Landing.text10}</P>
    </Step>
  );
}
