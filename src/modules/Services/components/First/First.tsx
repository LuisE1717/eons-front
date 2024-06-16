import React from "react";
import P from "../../shared/components/P/P";
import Title from "../../shared/components/Title/Title";
import Span from "../../shared/components/Span/Span";
import ImageSection from "../../shared/components/ImageSection/ImageSection";
import useTranslation from "../../../Shared/hooks/useTranslation";
import PhoneView from "../../shared/components/PhoneView/PhoneView";
import Image from "../../shared/components/Image/Image";

export default function First() {
  const { translation } = useTranslation();

  return (
    <ImageSection
      image="/services-1.webp"
      reverse={false}
      phoneReverse={true}
      imageInPhone={true}
    >
      <Title>
        {translation.Services.first_text_1}{" "}
        <Span>{translation.Services.first_phase}</Span>
      </Title>
      <P>{translation.Services.first_text_2}</P>

      <PhoneView>
        <Image image="/paper.png" />
      </PhoneView>

      <P>{translation.Services.first_text_3}</P>
      <P>{translation.Services.first_text_4}</P>
    </ImageSection>
  );
}
