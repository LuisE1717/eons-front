import React from "react";
import ImageSection from "../../shared/components/ImageSection/ImageSection";
import useTranslation from "../../../Shared/hooks/useTranslation";
import P from "../../shared/components/P/P";
import Button from "./components/Button/Button";
import Cookies from "js-cookie";

export default function Second() {
  const { translation } = useTranslation();

  return (
    <ImageSection reverse={false} image="/llave.webp">
      <P>{translation.Landing.text6}</P>
      <P bold>Eons "{translation.Landing.text7}"</P>
      <P>{translation.Landing.text8}</P>
      <P>{translation.Landing.text9}</P>
      <Button />
    </ImageSection>
  );
}
