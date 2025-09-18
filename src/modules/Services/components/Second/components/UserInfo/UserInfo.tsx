import { memo } from "react";
import useTranslation from "../../../../../Shared/hooks/useTranslation";
import Line from "../../../../shared/components/Line/Line";
import Span from "../../../../shared/components/Span/Span";
import Info from "../../shared/components/Info/Info";
import A from "../../../../shared/components/A/A";

function UserInfoComponent() {
  const { translation } = useTranslation();
  
  return (
    <Info>
      <Line />
      <A>
        {translation.ServiceMenu.spiritual_family}. 
        <div>
          (<Span>{translation.next}</Span>)
        </div>
      </A>
      <Line />
      <A>
        {translation.ServiceMenu.inf_general_evulation}.
        <div>
          (<Span>{translation.next}</Span>)
        </div>
      </A>
      <A>
        {translation.ServiceMenu.inf_calc_spiritual}. 
        <div>
          (<Span>{translation.next}</Span>)
        </div>
      </A>

      <Line />

      <A>
        {translation.ServiceMenu.Mercados}.
        <div>
          (<Span>{translation.next}</Span>)
        </div>
      </A>

      <A>
        {translation.ServiceMenu.user_valid_list}.
        <div>
          (<Span>{translation.next}</Span>)
        </div>
      </A>

      <Line />

      <A href="/dialogs/dialog">
        {translation.ServiceMenu.save_dialogs}.
        <div>
          (<Span>{translation.next}</Span>)
        </div>
      </A>

      <A href="/dialogs/day">
        {translation.ServiceMenu.save_services}.
        <div>
          (<Span>{translation.next}</Span>)
        </div>
      </A>
      
      <Line />
      <A href="/essence">
        {translation.ServiceMenu.money_admin}.
      </A>
      <Line />
    </Info>
  );
}

export default memo(UserInfoComponent);