import useTranslation from "../../../../../Shared/hooks/useTranslation";
import A from "../../../../shared/components/A/A";
import Blink from "../../../../shared/components/Blink/Blink";
import Line from "../../../../shared/components/Line/Line";
import Span from "../../../../shared/components/Span/Span";
import Info from "../../shared/components/Info/Info";

export default function BookInfo({first_time}) {
  const { translation } = useTranslation();

  return (
    <Info>
      <Line />
      {first_time?
      <Blink>
        <div>
        {translation.ServiceMenu.use_instruction}.
        (<Span>{"Próximamente"}</Span>)
        </div>
      </Blink>
      :
      <A>
        <div>
        {translation.ServiceMenu.use_instruction}.
        (<Span>{"Próximamente"}</Span>)
        </div>
      </A>
      }
      <Line />
      <A>
        <div>
        {translation.ServiceMenu.thinks_to_know}.
        (<Span>{"Próximamente"}</Span>)
        </div>
      </A>
      <A>
        <div>
        {translation.ServiceMenu.cautions}.
        (<Span>{"Próximamente"}</Span>)
        </div>
      </A>
      <Line />
      <A>
        <div>
        {translation.ServiceMenu.security}.
        (<Span>{"Próximamente"}</Span>)
        </div>
      </A>
      <Line />
      <A>
        <div>
        {translation.ServiceMenu.examples}.
        (<Span>{"Próximamente"}</Span>)
        </div>
      </A>

      <Line />

      <A>
        <div>
        {translation.ServiceMenu.demostration}.
        (<Span>{"Próximamente"}</Span>)
        </div>
      </A>
      <Line />
    </Info>
  );
}
