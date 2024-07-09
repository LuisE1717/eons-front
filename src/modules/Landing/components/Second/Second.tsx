import React from "react";
import ImageSection from "../../shared/components/ImageSection/ImageSection";
import useTranslation from "../../../Shared/hooks/useTranslation";
import P from "../../shared/components/P/P";
import Button from "./components/Button/Button";
import Cookies from "js-cookie";
import Span from "../../shared/components/Span/Span";

export default function Second({auth} : {auth:string}) {
  const { translation } = useTranslation();

  return (
    <ImageSection reverse={false} image="/llave.webp">
      <P>{translation.Landing.text6} <Span>{translation.Landing.text7}</Span> {translation.Landing.text7_1}</P> 
      <P bold>Eons "Access Technology to the Existential Source"</P>
      <P>{translation.Landing.text8}</P>
      <P>{translation.Landing.text9}</P>
      <Button auth={auth} />
    </ImageSection>
  );
}
