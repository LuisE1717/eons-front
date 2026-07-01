import { toast } from "react-toastify";
import Button from "@components/UI/Button/Button";
import useSaveDialog from "@modules/Response/application/useSaveDialog";
import { ACTIONS } from "@modules/Throw/domain/types";
interface Props {
  action: string;
  response: string;
  question?:string;
}

export default function Save({ action, response, question }: Props) {
  const { saveDialog } = useSaveDialog();

  console.log(action)
  console.log(question)

  const scriptHandler = async (save:boolean) =>{
    if(ACTIONS.DIALOGO_ABIERTO == action){
      if(question && save){
        const datah = {
          respuesta:response,
          descripcion: question,
          tipo: 'dialog'
        }
        await saveDialog(datah)
        .then((response) => {
          toast.success('Dialogo Guardado')
          setTimeout(() => {
            window.location.href = '/dialogs/dialog'
          }, 3000);
        })
      }
      else{
        window.location.href = "/services"
      }
    }
    else if(ACTIONS.DIALOGO_DIA == action){
      if(save){
        const datah = {
          respuesta:response,
          descripcion: question,
          tipo: 'day'
        }
        await saveDialog(datah)
        .then((response) => {
          toast.success('Consulta del dia Guardada')
          setTimeout(() => {
            window.location.href = '/dialogs/day'
          }, 3000);
        })
      }
      else{
        window.location.href = "/services"
      }
    }

    else if(ACTIONS.VER_DIALOGO_ABIERTO == action){
      window.location.href = "/dialogs/dialog"
    }

    else if(ACTIONS.VER_DIALOGO_DIA == action){
      window.location.href = "/dialogs/day"
    }
    
  }

  const viewHandler = () =>{

      if(ACTIONS.DIALOGO_ABIERTO == action)
        if(question){
          return(
            <>
              <Button size="sm" onClick={() => scriptHandler(false)} loading={false}>{"Continuar sin guardar"}</Button>

              <Button size="sm" onClick={() => scriptHandler(true)} loading={false} color="primary">
                {"Guardar diálogo"}
              </Button>
            </>
          )
        }
        else{
          return(
            <>
              <Button onClick={() => scriptHandler(false)} loading={false}>{"Continuar"}</Button>
            </>
          )
        }

        if (ACTIONS.DIALOGO_DIA == action){
          return(
            <>
              <Button size="sm" onClick={() => scriptHandler(false)} loading={false}>{"Continuar sin guardar"}</Button>

              <Button size="sm" onClick={() => scriptHandler(true)} loading={false} color="primary">
                {"Guardar consulta de día de hoy"}
              </Button>
            </>
          )
        }

        else if(ACTIONS.VER_DIALOGO_ABIERTO == action){
          return(
            <Button onClick={() => scriptHandler(false)} loading={false}>{"Volver a Dialogos"}</Button>
          )
        }

        else if(ACTIONS.VER_DIALOGO_DIA == action){
          return(
            <Button onClick={() => scriptHandler(false)} loading={false}>{"Volver a Servicios"}</Button>
          )
        }

        else{
          <></>
        }

  }

  return (
    <div className="flex w-full items-center gap-x-3 mb-4">
      {viewHandler()}
    </div>
  );
}
