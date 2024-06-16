import useTranslation from "../../../../../Shared/hooks/useTranslation";
import A from "../../../../shared/components/A/A";
import Line from "../../../../shared/components/Line/Line";
import Span from "../../../../shared/components/Span/Span";
import Info from "../../shared/components/Info/Info";

export default function MessageInfo() {
  const { translation } = useTranslation();
  return (
    <Info>
      <A>
        {translation.ServiceMenu.general_evaluation} <Span>{translation.ServiceMenu.free}</Span>
      </A>
      <A>
        {translation.ServiceMenu.spirit_calc} <Span>{translation.ServiceMenu.free}</Span>
      </A>

      <Line />

      <A>
        {translation.ServiceMenu.open_dialog_mod} <Span>{translation.ServiceMenu.free}</Span>
      </A>
      <A>
        {translation.ServiceMenu.contact_spirit} <Span>{translation.ServiceMenu.free}</Span>
      </A>

      <Line />

      <A>
        {translation.ServiceMenu.day_dialog} <Span>{translation.ServiceMenu.free}</Span>
      </A>
      <A>
        {translation.ServiceMenu.adivination_general} <Span>{translation.ServiceMenu.free}</Span>
      </A>

      <Line />

      <A>
        {translation.ServiceMenu.concient_evaluation} <Span>{translation.ServiceMenu.free}</Span>
      </A>
      <A>
        {translation.ServiceMenu.fact_evaluation} <Span>{translation.ServiceMenu.free}</Span>
      </A>
    </Info>
  );
}
