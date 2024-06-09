import React from "react";
import P from "../../shared/components/P/P";
import Title from "../../shared/components/Title/Title";
import Span from "../../shared/components/Span/Span";
import ImageSection from "../../shared/components/ImageSection/ImageSection";

export default function First() {
  return (
    <ImageSection image="/services-1.webp" reverse={false}>
      <Title>
        Bienvenidos a Eones "Tecnología de Acceso a la Fuente Existencial"{" "}
        <Span>Primera Fase</Span>
      </Title>
      <P>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, eius?
        Sunt aliquam provident debitis tempore molestias sit blanditiis quos
        quae.
      </P>
      <P>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, eius?
        Sunt aliquam provident debitis tempore molestias sit blanditiis quos
        quae.
      </P>
      <P>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, eius?
        Sunt aliquam provident debitis tempore molestias sit blanditiis quos
        quae.
      </P>
    </ImageSection>
  );
}
