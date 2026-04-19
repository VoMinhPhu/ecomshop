'use client';

import RenderChatOnPage from './RenderChatOnPage';

export default function ChatProvider({ isLogin }: { isLogin: boolean }) {
  return isLogin ? <RenderChatOnPage /> : null;
}
