import { toast } from "react-toastify";
import useTranslation from "../../../../../Shared/hooks/useTranslation";
import A from "../../../../shared/components/A/A";
import Line from "../../../../shared/components/Line/Line";
import Span from "../../../../shared/components/Span/Span";
import T from "../../../../shared/components/T/T";
import Info from "../../shared/components/Info/Info";
import Cookies from "js-cookie";

export default function MessageInfo() {
  const { translation } = useTranslation();

  function validateService (cost:number,navigate:string) {
    const essence = Cookies.get('eons_essence')
    if(essence && parseInt(essence)>=cost){
      window.location.href = navigate
    }
    else{
      toast.warning('Cantidad de esencia insuficiente para usar este servicio, consulte su gestión monetaria')
    }
  }

  return (
    <Info>
      <A>
        {translation.ServiceMenu.general_evaluation} <Span>{translation.ServiceMenu.free}</Span>
      </A>
      <A>
        {translation.ServiceMenu.spirit_calc} <Span>{"proximamente"}</Span>
      </A>

      <Line />

      <T onclick={() => validateService(1,'/throw/07')}>
        {translation.ServiceMenu.open_dialog_mod} <Span>{translation.ServiceMenu.free}</Span>
      </T>
      <T onclick={() => validateService(1,'/throw/09')}>
        {translation.ServiceMenu.contact_spirit} <Span>{translation.ServiceMenu.free}</Span>
      </T>

      <Line />

      <T onclick={() => validateService(1,'/throw/08')}>
        {translation.ServiceMenu.day_dialog} <Span>{translation.ServiceMenu.free}</Span>
      </T>
      <A>
        {translation.ServiceMenu.adivination_general} <Span>{"proximamente"}</Span>
      </A>

      <Line />

      <A>
        {translation.ServiceMenu.concient_evaluation} <Span>{"proximamente"}</Span>
      </A>
      <A>
        {translation.ServiceMenu.fact_evaluation} <Span>{"proximamente"}</Span>
      </A>
    </Info>
  );
}
