import useTranslation from "../../../../../Shared/hooks/useTranslation";
import Line from "../../../../shared/components/Line/Line";
import P from "../../../../shared/components/P/P";
import Span from "../../../../shared/components/Span/Span";
import Info from "../../shared/components/Info/Info";
import A from "../../../../shared/components/A/A";

export default function UserInfo() {
  const { translation } = useTranslation();
  return (
    <Info>
      <A href="/spiritual-family">
        {translation.ServiceMenu.spiritual_family} <Span>{translation.ServiceMenu.free}</Span>
      </A>
      <Line />
      <P>
        {translation.ServiceMenu.inf_general_evulation} <Span>{translation.ServiceMenu.free}</Span>
      </P>
      <P>
        {translation.ServiceMenu.inf_calc_spiritual} <Span>{translation.ServiceMenu.free}</Span>
      </P>
      <Line />
      <P>
        {translation.ServiceMenu.save_dialogs} <Span>{translation.ServiceMenu.free}</Span>
      </P>
      <P>
        {translation.ServiceMenu.save_services} <Span>{translation.ServiceMenu.free}</Span>
      </P>

      <Line />

      <P>
        {translation.ServiceMenu.money_admin} <Span>{translation.ServiceMenu.free}</Span>
      </P>
    </Info>
  );
}
