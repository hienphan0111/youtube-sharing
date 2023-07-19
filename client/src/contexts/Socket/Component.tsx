import React, { PropsWithChildren, useEffect } from 'react'
import { defaultSocketContextState, SocketContextProvider, SocketReducer } from './Context';
import { useSocket } from '../../store/useSocket';
import { useAppSelector } from '../../store/hooks';
import { VideoShared, videoSharedSelector } from '../../store/videoSharedSlice';

export type ISocketContextComponentProps = PropsWithChildren
const SocketContextComponent: React.FunctionComponent<ISocketContextComponentProps> = (props) => {
  const { children } = props;

  const [SocketState, SocketDispatch] = React.useReducer(SocketReducer, defaultSocketContextState);
  const { newVideoShared } = useAppSelector(videoSharedSelector);

  const ioUrl = import.meta.env.VITE_API_URL;
  const socket = useSocket(ioUrl, {
    reconnectionAttempts: 5,
    reconnectionDelay: 5000,
    autoConnect: false,
  })

  useEffect(() => {
    /* Connect to the websocket */
    socket.connect();

    /* Save the socket in context */
    SocketDispatch({ type: 'update_socket', payload: socket });

    /* Start listen the events */
    StartListeners();

    /* Send the handshake */
    SendHandshake();

  }, [socket, newVideoShared]);

  const StartListeners = () => {
    socket.io.on('reconnect', (attempt) => {
      console.info('Reconnected on attempt:', + attempt);
    })

    socket.on('receive_message', (data: {message: string}) => {
      console.log(data.message);
    })

    socket.on('new_video_shared', (data: { video: VideoShared }) => {
      SocketDispatch({ type: 'update_video_shared', payload: data.video });
    });
  };

  const SendHandshake = () => {
    if (newVideoShared) {
      socket.emit('new_video_shared', { video: newVideoShared });
    }
  };

  return (
    <SocketContextProvider value={{ SocketState, SocketDispatch }}>
      {children}
    </SocketContextProvider>
  )
}

export default SocketContextComponent;
