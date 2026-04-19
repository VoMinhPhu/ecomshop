import { socket } from '@/lib/socket/socket';

export const chatSocket = {
  connect: () => socket.connect(),
  disconnect: () => socket.disconnect(),

  join: (conversationId: string) => socket.emit('join', { conversationId }),
  leave: (conversationId: string) => socket.emit('leave', conversationId),
  sendMessage: (data: any, onAck?: () => void) => socket.emit('send_message', data, onAck),
  typing: (conversationId: string) => socket.emit('typing', { conversationId }),
  seen: (conversationId: string) => socket.emit('seen', conversationId),

  onMessage: (cb: any) => socket.on('new_message', cb),
  onTyping: (cb: any) => socket.on('typing', cb),
  onNotify: (cb: any) => socket.on('new_conversation_message', cb),
  onSeenUpdate: (cb: any) => socket.on('seen_update', cb),

  // tách off riêng từng event
  offMessage: () => socket.off('new_message'),
  offTyping: () => socket.off('typing'),
  offNotify: () => socket.off('new_conversation_message'),
  offSeenUpdate: () => socket.off('seen_update'),

  // off tất cả (dùng khi disconnect hẳn)
  offAll: () => {
    socket.off('new_message');
    socket.off('typing');
    socket.off('new_conversation_message');
    socket.off('seen_update');
  },
};
