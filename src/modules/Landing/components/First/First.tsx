import React from "react";
import ImageSection from "../../shared/components/ImageSection/ImageSection";
import P from "../../shared/components/P/P";
import useTranslation from "../../../Shared/hooks/useTranslation";

export default function First() {
  const { translation } = useTranslation();

  return (
    <ImageSection reverse={true} image="/manos.webp">
      <P>{translation.Landing.text1}</P>
      <P>{translation.Landing.text2}</P>
      <P>{translation.Landing.text3}</P>
      <P>{translation.Landing.text4}</P>
    </ImageSection>
  );
}
