import { socket } from '@/lib/socket/socket';

export const chatSocket = {
  connect: () => socket.connect(),
  disconnect: () => socket.disconnect(),

  join(conversationId: string) {
    socket.emit('join', { conversationId });
  },

  joinMany(conversationIds: string[]) {
    conversationIds.forEach((id) => {
      socket.emit('join', { conversationId: id });
    });
  },

  sendMessage: (data: any) => {
    socket.emit('send_message', data);
  },

  typing: (conversationId: string) => socket.emit('typing', { conversationId }),

  seen: (conversationId: string) => socket.emit('seen', conversationId),

  onMessage: (cb: any) => socket.on('new_message', cb),

  onTyping: (cb: any) => socket.on('typing', cb),

  off: () => {
    socket.off('new_message');
    socket.off('typing');
  },
};
