import RenderChatOnPage from './RenderChatOnPage';

export default function ChatProvider({ isLogin }: { isLogin: boolean }) {
  if (isLogin) return <RenderChatOnPage />;
  return <div className="border rounded-full shadow-sm fixed bottom-4 right-4">chat</div>;
}
