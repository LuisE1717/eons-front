import React, { useEffect, useMemo, useState } from 'react';
import io from 'socket.io-client';
import Cookies from 'js-cookie';

const WebSocketComponent = () => {
  const [socket,setSocket] = useState(
    io('http://localhost:3000/', {
      reconnectionDelayMax:10000,
      auth: {
        name: Cookies.get('eons_token') || ''
      }
    })
  )
};

export default WebSocketComponent;