import { memo } from "react";
import useTranslation from "../../../../../Shared/hooks/useTranslation";
import Line from "../../../../shared/components/Line/Line";
import Span from "../../../../shared/components/Span/Span";
import Info from "../../shared/components/Info/Info";
import A from "../../../../shared/components/A/A";
import { showToast } from "@components/UI/Toast";

function UserInfoComponent() {
  const { translation } = useTranslation();
  
  const showComingSoon = () => {
    showToast("Esta sección estará disponible en próximas actualizaciones", "info");
  };

  return (
    <Info>
      <Line />
      <A>
        <div onClick={showComingSoon}>
          {translation.ServiceMenu.spiritual_family}. 
          <div>
            (<Span>{translation.next}</Span>)
          </div>
        </div>
      </A>
      <Line />
      <A>
        <div onClick={showComingSoon}>
          {translation.ServiceMenu.inf_general_evulation}.
          <div>
            (<Span>{translation.next}</Span>)
          </div>
        </div>
      </A>
      <A>
        <div onClick={showComingSoon}>
          {translation.ServiceMenu.inf_calc_spiritual}. 
          <div>
            (<Span>{translation.next}</Span>)
          </div>
        </div>
      </A>

      <Line />

      <A>
        <div onClick={showComingSoon}>
          {translation.ServiceMenu.Mercados}.
          <div>
            (<Span>{translation.next}</Span>)
          </div>
        </div>
      </A>

      <A>
        <div onClick={showComingSoon}>
          {translation.ServiceMenu.user_valid_list}.
          <div>
            (<Span>{translation.next}</Span>)
          </div>
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