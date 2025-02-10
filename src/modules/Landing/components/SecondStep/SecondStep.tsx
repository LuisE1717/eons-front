import React from "react";
import Step from "../../shared/components/Step/Step";
import useTranslation from "../../../Shared/hooks/useTranslation";
import P from "../../shared/components/P/P";
import Cookies from "js-cookie";

export default function SecondStep() {
  const { translation } = useTranslation();

  return (
    <Step>
      <div className="flex flex-col">
      <P bold>{translation.Landing.subTitle2}</P><br/>
      <p></p>
      <P>{translation.Landing.text10}</P><br/>
      <P>{translation.Landing.text101}</P>
      </div>
      
    </Step>
  );
}
