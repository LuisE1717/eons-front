import { useCallback, useEffect, useState, type Dispatch, type SetStateAction } from "react"
import type { Spirit } from "../../../interfaces"
import Cookies from "js-cookie"
import { getAllSpirits } from "../../../../../utils/api/spiritsApi"
import { toast } from "react-toastify"
import useTranslation from "../../../../Shared/hooks/useTranslation"

export default function useGetAllSpirits (
    control:boolean,
    setControl:Dispatch<SetStateAction<boolean>>
    )  {
    const {translation} = useTranslation()

    const [loading, setloading] = useState<boolean>(false)
    const [error, setError] = useState<any>(null)
    const [data, setData] = useState<Spirit[]>([])
    const [total_pages,setTotal_pages] = useState<number>()

    const fetchBookings = useCallback(async () =>{
        if(Cookies.get('eons_token')){
            if(control){
                const token = Cookies.get('eons_token') || ''
                setloading(true)
                try {
                    const spirits = await getAllSpirits(token)
                    console.log(spirits)
                    setData(spirits.data)
                } catch (error) {
                    toast.error(translation.fecth_error)
                    setError(error)
                    setloading(false)
                }
                setControl(false)
            }
        }
        else{
            toast.error('No estas Autenticado')
            window.location.href = ''
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[control])

    useEffect(() => {
        fetchBookings()
    }, [fetchBookings])
    
  return {loading: loading , error: error ,data: data, total_pages: total_pages }
}