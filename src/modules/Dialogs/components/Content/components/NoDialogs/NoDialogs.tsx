import React from 'react'
import useTranslation from '../../../../../Shared/hooks/useTranslation'

export default function NoDialogs ({type,fav}:{type:string,fav:boolean}) {
  const {translation} = useTranslation()
  return (
    <div className="flex flex-col w-full gap-y-6 py-5 overflow-y-auto max-h-[600px] hide-scrollbar">

      <div className="cursor-pointer">
        <h2 className="text-xl text-center sm:text-start font-medium mb-0">{type == "dialog"?
        fav?translation.Dialogs.no_dialogs_fav:translation.Dialogs.no_dialogs
        :
        fav?translation.Dialogs.no_services_fav:translation.Dialogs.no_services}.</h2>
      </div>
    </div>
  )
}
