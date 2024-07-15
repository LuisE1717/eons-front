import useTranslation from "../../../../../Shared/hooks/useTranslation";
import Line from "../../../../shared/components/Line/Line";
import P from "../../../../shared/components/P/P";
import Span from "../../../../shared/components/Span/Span";
import Info from "../../shared/components/Info/Info";
import A from "../../../../shared/components/A/A";
import Cookies from "js-cookie";

export default function UserInfo() {
  const { translation } = useTranslation();
  return (
    <Info>
      <A >
        {translation.ServiceMenu.spiritual_family} <Span>{translation.ServiceMenu.free}</Span>
      </A>
      <Line />
      <A>
        {translation.ServiceMenu.inf_general_evulation} <Span>{translation.ServiceMenu.free}</Span>
      </A>
      <A>
        {translation.ServiceMenu.inf_calc_spiritual} <Span>{translation.ServiceMenu.free}</Span>
      </A>
      <Line />
      <A href="/dialogs/dialog">
        {translation.ServiceMenu.save_dialogs} <Span>{translation.ServiceMenu.free}</Span>
      </A>
      <A href="/dialogs/day">
        {translation.ServiceMenu.save_services} <Span>{translation.ServiceMenu.free}</Span>
      </A>
      <Line />
      <A href="/essence">
        {translation.ServiceMenu.money_admin} <Span>{translation.ServiceMenu.free}</Span>
      </A>
    </Info>
  );
}
