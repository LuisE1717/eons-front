import React, { useEffect, useMemo, useState } from 'react';
import io from 'socket.io-client';
import Cookies from 'js-cookie';
import configEnv from '../../../../.env_config';

const WebSocketComponent = () => {
  const [socket,setSocket] = useState(
    io(configEnv.ws, {
      reconnectionDelayMax:10000,
      auth: {
        name: Cookies.get('eons_token') || ''
      }
    })
  )
};

export default WebSocketComponent;