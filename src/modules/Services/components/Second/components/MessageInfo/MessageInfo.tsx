import { memo } from "react";
import useTranslation from "../../../../../Shared/hooks/useTranslation";
import A from "../../../../shared/components/A/A";
import Line from "../../../../shared/components/Line/Line";
import Span from "../../../../shared/components/Span/Span";
import Info from "../../shared/components/Info/Info";
import Cost from "../../../../shared/components/Cost/Cost";
import Cost2 from "../../../../shared/components/Cost/Cost2";
import { showToast } from "@components/UI/Toast";

function MessageInfoComponent() {
  const { translation } = useTranslation();

  const showComingSoon = () => {
    showToast("Esta sección estará disponible en próximas actualizaciones", "info");
  };

  const handleOpenDialogMode = () => {
    window.location.href = '/launch';
  };

  const validateService = (cost: number, navigate: string) => {
    showComingSoon();
  };

  return (
    <Info>
      <Line />
      <A>
        <div onClick={showComingSoon}>
          {translation.ServiceMenu.system_dialog}.
          <div>
            (<Span>{translation.next}</Span>)
          </div>
        </div>
      </A>
      <Line />
      
      <A>
        <div onClick={showComingSoon}>
          {translation.ServiceMenu.general_evaluation}. 
          <div>
            (<Span>{translation.next}</Span>)
          </div>
        </div>
      </A>
      
      <A>
        <div onClick={showComingSoon}>
          {translation.ServiceMenu.spirit_calc}. 
          <div>
            (<Span>{translation.next}</Span>)
          </div>
        </div>
      </A>

      <Line />

      <Cost 
        onclick={handleOpenDialogMode}
        name={translation.ServiceMenu.open_dialog_mod}
        amount="0.49"
        cost={translation.ServiceMenu.per_question}
      />

      <Cost2
        onclick={() => validateService(1, '/throw/09')}
        name={translation.ServiceMenu.contact_spirit}
        amount="1.29"
        amount2="0.49"
        cost={translation.ServiceMenu.per_question}
      />

      <Line />

      <Cost 
        onclick={() => validateService(1, '/throw/08')}
        name={translation.ServiceMenu.day_dialog}
        amount="0.99"
      />

      <A>
        <div onClick={showComingSoon}>
          {translation.ServiceMenu.adivination_general}. (<Span>{translation.next}</Span>)
        </div>
      </A>

      <Line />

      <A>
        <div onClick={showComingSoon}>
          {translation.ServiceMenu.concient_evaluation}. (<Span>{translation.next}</Span>)
        </div>
      </A>
      <A>
        <div onClick={showComingSoon}>
          {translation.ServiceMenu.fact_evaluation}. (<Span>{translation.next}</Span>)
        </div>
      </A>
      <Line />

      <A>
        <div onClick={showComingSoon}>
          {translation.ServiceMenu.Revelar_consejo_exacto}. (<Span>{translation.next}</Span>)
        </div>
      </A>

      <A>
        <div onClick={showComingSoon}>
          {translation.ServiceMenu.Revelar_tiempo}. (<Span>{translation.next}</Span>)
        </div>
      </A>

      <A>
        <div onClick={showComingSoon}>
          {translation.ServiceMenu.Revelar_porcentaje}. (<Span>{translation.next}</Span>)
        </div>
      </A>

      <A>
        <div onClick={showComingSoon}>
          {translation.ServiceMenu.Revelar_una_letra}. (<Span>{translation.next}</Span>)
        </div>
      </A>

      <A>
        <div onClick={showComingSoon}>
          {translation.ServiceMenu.Revelar_un_dígito_decimal}. (<Span>{translation.next}</Span>)
        </div>
      </A>

      <Line />

      <A>
        <div onClick={showComingSoon}>
          {translation.ServiceMenu.Conocer_conviene}. (<Span>{translation.next}</Span>)
        </div>
      </A>

      <A>
        <div onClick={showComingSoon}>
          {translation.ServiceMenu.Conocer_sucederá}. (<Span>{translation.next}</Span>)
        </div>
      </A>

      <Line />
    </Info>
  );
}

export default memo(MessageInfoComponent);