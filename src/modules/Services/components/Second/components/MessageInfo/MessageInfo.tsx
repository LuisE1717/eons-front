import { toast } from "react-toastify";
import useTranslation from "../../../../../Shared/hooks/useTranslation";
import A from "../../../../shared/components/A/A";
import Line from "../../../../shared/components/Line/Line";
import Span from "../../../../shared/components/Span/Span";
import T from "../../../../shared/components/T/T";
import Info from "../../shared/components/Info/Info";
import Cookies from "js-cookie";
import Fire from "../../shared/components/Fire/Fire";
import Cost from "../../../../shared/components/Cost/Cost";
import Cost2 from "../../../../shared/components/Cost/Cost2";
import Free from "../../../../shared/components/Free/Free";

export function validateService (cost:number,navigate:string) {
  toast.warning('Este Servicio estará disponible en los próximos días.')
  // const essence = Cookies.get('eons_essence')
  //  if(essence && parseInt(essence)>=cost){
  //    window.location.href = navigate
  //  }
  //  else{
  //    toast.warning('Cantidad de esencia insuficiente para usar este servicio, consulte su gestión monetaria')
  //  }
}

export default function MessageInfo() {
  const { translation } = useTranslation();

  return (
    <Info>
      <Line />
      <A>
      {translation.ServiceMenu.system_dialog}.
      <div>
      (<Span>{translation.next}</Span>)
      </div>
      </A>
      <Line />

      <Free
      onclick={() => validateService(1,'/throw/07')}
      name={translation.ServiceMenu.general_evaluation}>
      </Free>

      <A>
        {translation.ServiceMenu.spirit_calc}. 
        <div>
        (<Span>{translation.next}</Span>)
        </div>
      </A>

      <Line />

      <Cost 
      onclick={() => validateService(1,'/throw/07')}
      name={translation.ServiceMenu.open_dialog_mod}
      // cost={translation.ServiceMenu.per_question}
      amount="0.49"
      />

      <Cost
      onclick={() => validateService(1,'/throw/09')}
      name={translation.ServiceMenu.contact_spirit}
      // cost={translation.ServiceMenu.per_question}
      amount="1.29"
      />

      <Line />

      <Cost 
      onclick={() => validateService(1,'/throw/08')}
      name={translation.ServiceMenu.day_dialog}
      amount="0.99"
      />

      <A>
        <div>
        {translation.ServiceMenu.adivination_general}. (<Span>{translation.next}</Span>)
        </div>
      </A>

      <Line />

      <A>
        <div>
        {translation.ServiceMenu.concient_evaluation}. (<Span>{translation.next}</Span>)
        </div>
      </A>
      <A>
        <div>
        {translation.ServiceMenu.fact_evaluation}. (<Span>{translation.next}</Span>)
        </div>
      </A>
      <Line />

      <A>
        <div>
        {translation.ServiceMenu.Revelar_consejo_exacto}. (<Span>{translation.next}</Span>)
        </div>
      </A>

      <A>
        <div>
        {translation.ServiceMenu.Revelar_tiempo}. (<Span>{translation.next}</Span>)
        </div>
      </A>

      <A>
        <div>
        {translation.ServiceMenu.Revelar_porcentaje}. (<Span>{translation.next}</Span>)
        </div>
      </A>

      <A>
        <div>
        {translation.ServiceMenu.Revelar_una_letra}. (<Span>{translation.next}</Span>)
        </div>
      </A>

      <A>
        <div>
        {translation.ServiceMenu.Revelar_un_dígito_decimal}. (<Span>{translation.next}</Span>)
        </div>
      </A>

      <Line />

      <A>
        <div>
        {translation.ServiceMenu.Conocer_conviene}. (<Span>{translation.next}</Span>)
        </div>
      </A>

      <A>
        <div>
        {translation.ServiceMenu.Conocer_sucederá}. (<Span>{translation.next}</Span>)
        </div>
      </A>

      <Line />
    </Info>
  );
}
