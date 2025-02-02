import { toast } from "react-toastify";
import useTranslation from "../../../../../Shared/hooks/useTranslation";
import A from "../../../../shared/components/A/A";
import Blink from "../../../../shared/components/Blink/Blink";
import Line from "../../../../shared/components/Line/Line";
import Span from "../../../../shared/components/Span/Span";
import Info from "../../shared/components/Info/Info";

export default function BookInfo({first_time}) {
  const { translation } = useTranslation();

  const validateInfo = () =>{
    toast.warning("La Sección Informacional estará disponible en los próximos días.")
  }

  return (
    <Info>
      <Line />
      {/* {first_time?
      <Blink>
        <div onClick={validateInfo}>
        {translation.ServiceMenu.use_instruction}.
        </div>
      </Blink>
      :
      <A>
        <div onClick={validateInfo}>
        {translation.ServiceMenu.use_instruction}.
        </div>
      </A>
      } */}
      <A>
        <div onClick={()=> window.location.href = `/usage`}>
        {translation.ServiceMenu.use_instruction}.
        </div>
      </A>
      <Line />
      <A>
        <div >
        {translation.ServiceMenu.thinks_to_know}.
        <div>
                (<Span>{translation.next}</Span>)
                </div>
        </div>
      </A>
      <A>
        <div >
        {translation.ServiceMenu.cautions}.
        <div>
                (<Span>{translation.next}</Span>)
                </div>
        </div>
      </A>
      <Line />
      <A>
        <div >
        {translation.ServiceMenu.security}.
        <div>
                (<Span>{translation.next}</Span>)
                </div>
        </div>
      </A>
      <Line />
      <A>
        <div >
        {translation.ServiceMenu.examples}.
        <div>
                (<Span>{translation.next}</Span>)
                </div>
        </div>
      </A>

      <Line />

      <A>
        <div >
        {translation.ServiceMenu.demostration}.
        <div>
                (<Span>{translation.next}</Span>)
                </div>
        </div>
      </A>
      <Line />

      <A>
        <div >
        {translation.ServiceMenu.glosary}.
        <div>
                (<Span>{translation.next}</Span>)
                </div>
        </div>
      </A>
      <Line />
    </Info>
  );
}
