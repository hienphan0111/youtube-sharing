import React from 'react';
import { Socket } from 'socket.io-client';
import { VideoShared } from '../../store/videoSharedSlice';

export interface ISocketContextState {
  socket: Socket | undefined;
  message: string;
  updateVideoShared: VideoShared | undefined;
}

export const defaultSocketContextState: ISocketContextState = {
  socket: undefined,
  message: '',
  updateVideoShared: undefined,
};

export type TSocketContextActions = 'update_socket' | 'update_message' | 'update_video_shared';

export type TSocketContextPayload = string | Socket | VideoShared;

export interface ISocketContextActions {
  type: TSocketContextActions;
  payload: TSocketContextPayload;
}

export const SocketReducer = (state: ISocketContextState, action: ISocketContextActions): ISocketContextState => {
  console.log('socketReducer', state, action);

  switch(action.type) {
    case 'update_socket':
      return { ...state, socket: action.payload as Socket };
    case 'update_message':
      return { ...state, message: action.payload as string };
    case 'update_video_shared':
      return { ...state, updateVideoShared: action.payload as VideoShared };
    default:
      return state;
  }
};

export interface ISocketContext {
  SocketState: ISocketContextState;
  SocketDispatch: React.Dispatch<ISocketContextActions>;
}

const SocketContext = React.createContext<ISocketContext>({
  SocketState: defaultSocketContextState,
  SocketDispatch: () => undefined,
});

export const SocketContextConsumer = SocketContext.Consumer;
export const SocketContextProvider = SocketContext.Provider;

export default SocketContext;
