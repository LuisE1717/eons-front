import useTranslation from "../../../../../Shared/hooks/useTranslation";
import A from "../../../../shared/components/A/A";
import Blink from "../../../../shared/components/Blink/Blink";
import Line from "../../../../shared/components/Line/Line";
import P from "../../../../shared/components/P/P";
import Span from "../../../../shared/components/Span/Span";
import Info from "../../shared/components/Info/Info";

export default function BookInfo({first_time}) {
  const { translation } = useTranslation();

  return (
    <Info>
      {first_time?
      <Blink>
        {translation.ServiceMenu.use_instruction}.
      </Blink>
      :
      <P>
        {translation.ServiceMenu.use_instruction}.
      </P>
      }
      <Line />
      <P>
        {translation.ServiceMenu.thinks_to_know}.
      </P>
      <P>
        {translation.ServiceMenu.cautions}.
      </P>
      <Line />
      <P>
        {translation.ServiceMenu.security}.
      </P>
      <Line />
      <P>
        {translation.ServiceMenu.examples}.
      </P>

      <Line />

      <P>
        {translation.ServiceMenu.demostration}.
      </P>
    </Info>
  );
}
