import ImageSection from "../../shared/components/ImageSection/ImageSection";
import P from "../../shared/components/P/P";
import useTranslation from "../../../Shared/hooks/useTranslation";

export default function First() {
  const { translation } = useTranslation();

  return (
    <ImageSection reverse={true} image="/manos.webp">
      <P bold className="text-4xl mb-4">{translation.Landing.title}</P>
      <P>{translation.Landing.text1}</P>
      <P>{translation.Landing.text2}</P>
      <P>{translation.Landing.text3}</P>
      <P>{translation.Landing.text4}</P>
    </ImageSection>
  );
}
