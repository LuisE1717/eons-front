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
        {translation.ServiceMenu.spiritual_family} 
        <div>
        (<Span>{"proximamente"}</Span>).
        </div>
      </A>
      <Line />
      <A>
        {translation.ServiceMenu.inf_general_evulation}.
      </A>
      <A>
        {translation.ServiceMenu.inf_calc_spiritual} 
        <div>
        (<Span>{"proximamente"}</Span>).
        </div>
      </A>

      <Line />

      <A >
        {"Mercados"} 
        <div>
        (<Span>{"proximamente"}</Span>).
        </div>
      </A>

      <A >
        {"Lista de Usuarios avalados por el Sistema"} 
        <div>
        (<Span>{"proximamente"}</Span>).
        </div>
      </A>

      <Line />

      <A href="/dialogs/dialog">
        {translation.ServiceMenu.save_dialogs}.
      </A>

      <A href="/dialogs/day">
        {translation.ServiceMenu.save_services}.
      </A>
      
      <Line />
      <A href="/essence">
        {translation.ServiceMenu.money_admin}.
      </A>
    </Info>
  );
}
