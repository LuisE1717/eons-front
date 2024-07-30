import P from "../../shared/components/P/P";
import ImageSection from "../../shared/components/ImageSection/ImageSection";
import useTranslation from "../../../Shared/hooks/useTranslation";
import Span from "../../shared/components/Span/Span";
import Title from "../../shared/components/Title/Title";
import PhoneView from "../../shared/components/PhoneView/PhoneView";
import Image from "../../shared/components/Image/Image";
import Cookies from "js-cookie";
import Title2 from "../../shared/components/Title/Title2";

export default function Third() {
  const { translation } = useTranslation();

  return (
    <ImageSection
      image="/services-2.webp"
      reverse={true}
      className="mb-12"
      phoneReverse={false}
      imageInPhone={false}
    >
      <P>
        {translation.Services.third_text_1_init}{" "}
        <Span>{translation.Services.first_phase}</Span>{" "}
        {translation.Services.third_text_1}
      </P>

      <PhoneView>
        <Image image="/services-2.webp" />
      </PhoneView>

      <P>{translation.Services.third_text_2}</P>

      <P>{translation.Services.third_text_3}</P>

      <Title2>{translation.Services.third_text_4}.</Title2>
    </ImageSection>
  );
}
