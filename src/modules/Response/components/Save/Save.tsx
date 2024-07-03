import Button from "../../../../components/UI/Button/Button";
import useTranslation from "../../../Shared/hooks/useTranslation";
import { actionsInterprete } from "../../../Throw/domain/interpreter";
import { ACTIONS } from "../../../Throw/domain/types";

interface Props {
  action: string;
  response: string;
  question?:string;
}

export default function Save({ action, response, question }: Props) {
  const { translation } = useTranslation();

  const navigate = actionsInterprete(action, response);

  const viewHandler = () =>{

      if( ACTIONS.DIALOGO_ABIERTO == action)
        if(question){
          return(
            <div className="flex w-full items-center gap-x-3">
              <a href={navigate} className="w-full">
                <Button loading={false}>{"Continuar sin guardar"}</Button>
              </a>
  
              <a href={navigate} className="w-full">
                <Button loading={false} color="primary">
                  {"Guardar diálogo"}
                </Button>
              </a>
            </div>
          )
        }
        else{
          return(
            <div className="flex w-full items-center gap-x-3">
              <a href={navigate} className="w-full">
                <Button loading={false}>{"Continuar"}</Button>
              </a>
          </div>
          )
        }

        if (ACTIONS.DIALOGO_DIA == action){
          return(
            <div className="flex w-full items-center gap-x-3">
              <a href={navigate} className="w-full">
                <Button loading={false}>{"Continuar sin guardar"}</Button>
              </a>
  
              <a href={navigate} className="w-full">
                <Button loading={false} color="primary">
                  {"Guardar consulta de día de hoy"}
                </Button>
              </a>
            </div>
          )
        }

        else{
          return(
            <></>
          )
        }

  }

  return (
    <div className="flex w-full items-center gap-x-3">
      <a href={navigate} className="w-full">
        <Button loading={false}>{"Continuar sin guardar"}</Button>
      </a>

      <a href={navigate} className="w-full">
        <Button loading={false} color="primary">
          {"Guardar diálogo"}
        </Button>
      </a>
    </div>
  );
}
