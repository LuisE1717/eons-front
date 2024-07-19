import React, { useEffect, useMemo, useState } from 'react';
import io from 'socket.io-client';
import Cookies from 'js-cookie';

const WebSocketComponent: React.FC = () => {
  const [Socket,setSocket] = useState(
    io('http://localhost:3000/', {
      reconnectionDelayMax:10000,
      auth: {
        name: Cookies.get('eons_token') || ''
      }
    })
  )
   const socket = useMemo(() => {
     return io('http://localhost:3000/', {
      reconnectionDelayMax:10000,
      auth: {
        name: Cookies.get('eons_token') || ''
      }
    });
   }, [Socket]);
  // const socket = io('http://localhost:3000/', {
  //   reconnectionDelayMax:10000,
  //   auth: {
  //     name: Cookies.get('eons_token') || ''
  //   }
  // });

  const [lastMessage,setLastMessage] = useState('')

  const [connect, setConnect] = useState(false)

  const Connected = useMemo(() => {
    return connect
  }, [connect]);
  useEffect(() => {
    if(!Connected){
      socket.on('connect', () => {
        setConnect(true)
        console.log('Conectado al servidor');
      });

      //socket.emit('register','a')

      // socket.on('notification',(resp) => {
      //   console.log(resp)
      // })

      socket.emit('register',Cookies.get('eons_user'), (resp) =>{console.log(resp)})

      socket.on('notification', (noti) => {
        console.log(noti)
      })
  
      //  socket.on('disconnect', () => {
      //    console.log('Desconectado del servidor');
      //  });
  
      // socket.on('respuesta', (data) => {
      //   setLastMessage(data)
      //   console.log('Respuesta del servidor:', data);
      // });
  
      return () => {
        socket.disconnect();
      };
    }
    // Escucha otros eventos del servidor aquí
  }, []);



  return (
    <div>
      Último mensaje del servidor: {lastMessage}
      <button onClick={() => socket.emit('Hola desde el cliente')}>Enviar Mensaje</button>
    </div>
  );
};

export default WebSocketComponent;


// const WebSocketComponent: React.FC = () => {
//     const { sendMessage, lastMessage } = useSocketIO('http://localhost:3000',{
//         onOpen: () => console.log('open'),
//         shouldReconnect: (closeEvent) => true,
//     })

//   return (
//     <div>
//       Último mensaje del servidor: {lastMessage.payload?.toString()}
//       <button onClick={() => sendMessage('Hola desde el cliente')}>Enviar Mensaje</button>
//     </div>
//   );
// };