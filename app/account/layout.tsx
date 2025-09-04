import NavAccount from '@/components/account/NavAccount';
import NavLinkHome from '@/components/account/NavLinkHome';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-37 md:mt-48 lg:mt-31">
      <div className="max-w-300 px-2 w-full mx-auto grid grid-cols-4 lg:grid-cols-5 gap-2">
        <NavLinkHome />
        <NavAccount />
        <div className="col-span-4">{children}</div>
      </div>
    </div>
  );
}
