import type { Session } from '@auth/core/types'
import { signOut } from 'auth-astro/client'
import Cookies from 'js-cookie'
import { postLogout } from '../../../../utils/api/userApi'
import { toast } from 'react-toastify'

interface Props{
    session:Session|null
}

const LogOut = ({session} : Props) => {
    async function handleLogOut() {
        
        try {
            const datah = {
                providerId:session?.user?.id
            }
            // await postLogout(Cookies.get('eons_token')||'',datah)
            // .then( async ()=>{
                Cookies.remove('eons_token')
                Cookies.remove('eons_user')
                Cookies.remove('eons_refresh_token')
                Cookies.remove('eons_essence')
                await signOut().then(() => window.location.href = "/auth")
            // })
        } catch (error) {
            console.log(error)
            //toast.error()
        }
    }

  return (
    <div onClick={handleLogOut}>
        <label className="flex items-center px-4 py-2 hover:bg-slate-100 cursor-pointer">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4" stroke="#000000" stroke-width="1.5" stroke-linecap="round"></path> <path d="M10 12H20M20 12L17 9M20 12L17 15" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            </path> 
            </g>
          </svg>
            <span className="ml-2">Cerrar Sesion</span>
        </label>
    </div>
  )
}

export default LogOut
