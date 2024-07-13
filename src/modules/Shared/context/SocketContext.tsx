
import { createContext, useMemo, type ReactElement } from "react"
import { io, Socket } from "socket.io-client"

interface Props {
  socket: Socket
}

const SocketContext = createContext<Props>({} as Props)

function SocketProvider({ children }: { children: ReactElement }) {

  const socket = useMemo(() => {
    return io('http://localhost:3000', {
    })
  }, [])

  const data = { socket }

  return <SocketContext.Provider value={data}>{children}</SocketContext.Provider>
}

export { SocketContext, SocketProvider }