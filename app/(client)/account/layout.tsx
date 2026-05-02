import NavAccount from '@/components/account/NavAccount';
import NavLinkHome from '@/components/account/NavLinkHome';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="md:mt-36 lg:mt-20">
      <div className="max-w-300 px-2 md:px-4 w-full mx-auto grid grid-cols-4">
        <NavLinkHome />
        <div className="col-span-4 lg:col-span-1">
          <NavAccount />
        </div>
        <div className="col-span-4 lg:col-span-3">{children}</div>
      </div>
    </div>
  );
}
