import React from "react";
import Title from "../../shared/components/Title/Title";
import P from "../../shared/components/P/P";
import ImageSection from "../../shared/components/ImageSection/ImageSection";

export default function Third() {
  return (
    <ImageSection image="/services-2.webp" reverse={true} className="mb-12">
      <Title>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Qui dicta quae
        at.
      </Title>

      <P>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolores at
        sint architecto, eius nisi nostrum quasi alias nihil nobis consectetur?
      </P>

      <P>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolores at
        sint architecto, eius nisi nostrum quasi alias nihil nobis consectetur?
      </P>

      <P>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolores at
        sint architecto, eius nisi nostrum quasi alias nihil nobis consectetur?
      </P>
    </ImageSection>
  );
}
