import useTranslation from "../../../../../Shared/hooks/useTranslation";
import Line from "../../../../shared/components/Line/Line";
import P from "../../../../shared/components/P/P";
import Span from "../../../../shared/components/Span/Span";
import Info from "../../shared/components/Info/Info";

export default function MessageInfo() {
  const { translation } = useTranslation();
  return (
    <Info>
      <P>
        {translation.ServiceMenu.general_evaluation} <Span>{translation.ServiceMenu.free}</Span>
      </P>
      <P>
        {translation.ServiceMenu.spirit_calc} <Span>{translation.ServiceMenu.free}</Span>
      </P>

      <Line />

      <P>
        {translation.ServiceMenu.open_dialog_mod} <Span>{translation.ServiceMenu.free}</Span>
      </P>
      <P>
        {translation.ServiceMenu.contact_spirit} <Span>{translation.ServiceMenu.free}</Span>
      </P>

      <Line />

      <P>
        {translation.ServiceMenu.day_dialog} <Span>{translation.ServiceMenu.free}</Span>
      </P>
      <P>
        {translation.ServiceMenu.adivination_general} <Span>{translation.ServiceMenu.free}</Span>
      </P>

      <Line />

      <P>
        {translation.ServiceMenu.concient_evaluation} <Span>{translation.ServiceMenu.free}</Span>
      </P>
      <P>
        {translation.ServiceMenu.fact_evaluation} <Span>{translation.ServiceMenu.free}</Span>
      </P>
    </Info>
  );
}
