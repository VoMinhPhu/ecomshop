import BoxChat from '@/components/admin/chats/BoxChat';
import NavChat from '@/components/admin/chats/NavChat';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function page() {
  return (
    <Card className="md:m-4 m-2 h-full gap-3">
      <CardHeader className="md:px-6 px-2">
        <CardTitle>Tin nhắn</CardTitle>
        <CardDescription>Nhắn tin trực tiếp với khách hàng</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 md:px-6 px-2">
        <div className="border rounded-md flex h-full">
          <NavChat />
          <BoxChat />
        </div>
      </CardContent>
    </Card>
  );
}
