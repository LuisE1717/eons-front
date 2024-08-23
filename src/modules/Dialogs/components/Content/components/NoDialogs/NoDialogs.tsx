import React from 'react'

export default function NoDialogs ({type,fav}:{type:string,fav:boolean}) {
  return (
    <div className="flex flex-col w-full gap-y-6 py-5 overflow-y-auto max-h-[600px] hide-scrollbar">

      <div className="cursor-pointer">
        <h2 className="text-xl text-center sm:text-start font-medium mb-0">{type == "dialog"?
        fav?"Aún no tiene ningún Diálogo Favorito determinado":"Aún no tiene ningún Diálogo salvado"
        :
        fav?"Aún no tiene ningún Servicio Favorito determinado":"Aún no tiene ningún Servicio salvado"}.</h2>
      </div>
    </div>
  )
}
