import React from "react";
import ImageSection from "../../shared/components/ImageSection/ImageSection";
import useTranslation from "../../../Shared/hooks/useTranslation";
import P from "../../shared/components/P/P";
import Cookies from "js-cookie";
import Span from "../../shared/components/Span/Span";

export default function Third() {
  const { translation } = useTranslation();

  return (
    <ImageSection reverse={true} image="/cofre.webp">
      <P>{translation.Landing.text11}</P>
      <P>{translation.Landing.text12}</P>
      <P>{translation.Landing.text13}</P>
      <P bold>{translation.Landing.text14} <Span>{translation.Landing.text14_1}</Span></P>
    </ImageSection>
  );
}
