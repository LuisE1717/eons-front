import useTranslation from "../../../../../Shared/hooks/useTranslation";
import Line from "../../../../shared/components/Line/Line";
import P from "../../../../shared/components/P/P";
import Span from "../../../../shared/components/Span/Span";
import Info from "../../shared/components/Info/Info";

export default function BookInfo() {
  const { translation } = useTranslation();

  return (
    <Info>
      <P>
        {translation.ServiceMenu.use_instruction}{" "}
        <Span>{translation.ServiceMenu.free}</Span>
      </P>
      <Line />
      <P>
        {translation.ServiceMenu.thinks_to_know}{" "}
        <Span>{translation.ServiceMenu.free}</Span>
      </P>
      <P>
        {translation.ServiceMenu.cautions}{" "}
        <Span>{translation.ServiceMenu.free}</Span>
      </P>
      <Line />
      <P>
        {translation.ServiceMenu.security}{" "}
        <Span>{translation.ServiceMenu.free}</Span>
      </P>
      <Line />
      <P>
        {translation.ServiceMenu.examples}{" "}
        <Span>{translation.ServiceMenu.free}</Span>
      </P>

      <Line />

      <P>
        {translation.ServiceMenu.demostration}{" "}
        <Span>{translation.ServiceMenu.free}</Span>
      </P>
    </Info>
  );
}
