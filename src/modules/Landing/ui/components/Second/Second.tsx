import ImageSection from "@modules/Shared/components/ImageSection/ImageSection";
import useTranslation from "@modules/Shared/hooks/useTranslation";
import P from "../../shared/components/P/P";
import Button from "./components/Button/Button";
import Span from "../../shared/components/Span/Span";

export default function Second({auth} : {auth:string}) {
  const { translation } = useTranslation();

  return (
    <ImageSection reverse={false} image="/llave.webp">
      <div className="pt-4">
      <P>{translation.Landing.text6} (<Span>{translation.Landing.text7}</Span>) {translation.Landing.text7_1}</P> 
      </div>
      <P bold>Eons "{translation.Services.first_text_1_1}"</P>
      <P>{translation.Landing.text8}</P>
      <P>{translation.Landing.text9}</P>
      <Button auth={auth} />
    </ImageSection>
  );
}
