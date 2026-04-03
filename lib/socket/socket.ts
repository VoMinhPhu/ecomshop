import { io } from 'socket.io-client';

export const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL!, {
  withCredentials: true, // require for cookie JWT
  autoConnect: false, // control connect manually
});
