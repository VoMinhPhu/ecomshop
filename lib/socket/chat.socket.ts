import { socket } from '@/lib/socket/socket';

export const chatSocket = {
  connect: () => socket.connect(),
  disconnect: () => socket.disconnect(),

  join: (conversationId?: string) => socket.emit('join', { conversationId }),
  leave: (conversationId: string) => socket.emit('leave', conversationId),
  sendMessage: (data: any, onAck?: () => void) => socket.emit('send_message', data, onAck),
  typing: (conversationId: string) => socket.emit('typing', { conversationId }),
  seen: (conversationId: string) => socket.emit('seen', conversationId),

  onMessage: (cb: any) => socket.on('new_message', cb),
  onTyping: (cb: any) => socket.on('typing', cb),
  onNotify: (cb: any) => socket.on('new_conversation_message', cb),
  onSeenUpdate: (cb: any) => socket.on('seen_update', cb),

  onConnect: (cb: () => void) => socket.on('connect', cb),
  onDisconnect: (cb: (reason: string) => void) => socket.on('disconnect', cb),
  onConnectError: (cb: (err: Error) => void) => socket.on('connect_error', cb),
  onReconnect: (cb: () => void) => socket.on('reconnect', cb),

  onMessageRevoked: (cb: (data: { messageId: string }) => void) => socket.on('message_revoked', cb),
  offMessageRevoked: () => socket.off('message_revoked'),

  offConnect: () => socket.off('connect'),
  offDisconnect: () => socket.off('disconnect'),
  offConnectError: () => socket.off('connect_error'),
  offReconnect: () => socket.off('reconnect'),

  offMessage: () => socket.off('new_message'),
  offTyping: () => socket.off('typing'),
  offNotify: () => socket.off('new_conversation_message'),
  offSeenUpdate: () => socket.off('seen_update'),

  offAll: () => {
    socket.off('new_message');
    socket.off('typing');
    socket.off('new_conversation_message');
    socket.off('seen_update');
    socket.off('connect');
    socket.off('disconnect');
    socket.off('connect_error');
    socket.off('reconnect');
    socket.off('message_revoked');
  },
};
