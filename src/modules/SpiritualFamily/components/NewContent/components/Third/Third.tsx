import ImageSection from "../../shared/components/ImageSection/ImageSection";
import useTranslation from "../../../../../Shared/hooks/useTranslation";
import P from "../../shared/components/P/P";

export default function Third() {
  const { translation } = useTranslation();

  return (
    <ImageSection reverse={false} image="/flor.png">
      <P>{translation.Landing.text11}</P>
      <P>{translation.Landing.text12}</P>
      <P>{translation.Landing.text13}</P>
      <P>{translation.Landing.text14}</P>
    </ImageSection>
  );
}
