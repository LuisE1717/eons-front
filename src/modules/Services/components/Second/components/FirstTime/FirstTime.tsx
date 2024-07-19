import Button from "../../../../../../components/UI/Button/Button";
import useTranslation from "../../../../../Shared/hooks/useTranslation";
import Line from "../../../../shared/components/Line/Line";
import P from "../../../../shared/components/P/P";
import Span from "../../../../shared/components/Span/Span";
import Info from "../../shared/components/Info/Info";

export default function FirstTime({setSelected}) {
  const { translation } = useTranslation();

  return (
    <Info>
      <P>
        Para captar el azar Universal se necesitará una herramienta que construiremos en un par de minutos, con objetos que usted tenga en mano.
      </P>
      
      <div className="flex flex-col mt-3 gap-4">
        <Button size="xs" color="primary" loading={false}>
            <a href="/use-instruction">
              Ver instrucciones de uso  
            </a>
        </Button>

        <Button size="xs" onClick={() => setSelected(null)} loading={false}>
            Conozco el método
        </Button>
      </div>
    </Info>
  );
}
