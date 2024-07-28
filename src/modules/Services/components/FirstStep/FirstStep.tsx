import React from "react";
import Step from "../../shared/components/Step/Step";
import P from "../../shared/components/P/P";
import useTranslation from "../../../Shared/hooks/useTranslation";
import Cookies from "js-cookie";

export default function FirstStep() {
  const { translation } = useTranslation();

  return (
    <Step>
      <P>{translation.Services.step_1}</P>
      <P>{translation.Services.step_3}</P>
    </Step>
  );
}
