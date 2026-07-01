import ImageSection from "@modules/Shared/components/ImageSection/ImageSection";
import useTranslation from "@modules/Shared/hooks/useTranslation";
import P from "../../shared/components/P/P";
import Span from "../../shared/components/Span/Span";

export default function Third() {
  const { translation } = useTranslation();

  return (
    <ImageSection reverse={false} image="/cofre.webp">
      <P>{translation.Landing.text11}</P>
      <P>{translation.Landing.text12}</P>
      <P>{translation.Landing.text13}</P>
      <P bold>{translation.Landing.text14} (<Span>{translation.Landing.text14_1}</Span>).</P>
    </ImageSection>
  );
}
