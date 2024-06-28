interface Props {
  descripcion:string;
  descripcion_sistema:string;
}

export default function Description({ descripcion, descripcion_sistema }: Props) {
  console.log(descripcion_sistema)
  return (
  <div className="flex flex-row">
  <p className="leading-7 text-base text-justify">{descripcion_sistema}</p>
  <br/>
  <p className="leading-7 text-base text-justify">{descripcion}</p>
  </div>
  )
}
