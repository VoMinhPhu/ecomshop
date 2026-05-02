// 'use client';

// import { useState } from 'react';
// import Link from 'next/link';

// import useUserStore from '@/stores/userStore';
// import AuthPopup from '@/components/auth/AuthPopup';
// import { HomeIcon, LayersIcon, Package2Icon, ShoppingCartIcon, UserIcon } from 'lucide-react';

// export default function NavBottomOnMobile() {
//   const [openAuth, setOpenAuth] = useState<boolean>(false);
//   const user = useUserStore((s) => s.user);

//   return (
//     <>
//       <nav className="md:hidden fixed bottom-0 w-full z-50 border-t-2 border-primary bg-white h-14 flex">
//         <Link href="/" className="flex-1 h-full flex flex-col items-center justify-center gap-0">
//           <HomeIcon className="size-6 text-primary" />
//           <span className="text-xs text-gray-500">Trang chủ</span>
//         </Link>
//         <Link href="/" className="flex-1 h-full flex flex-col items-center justify-center gap-0">
//           <LayersIcon className="size-6 text-primary" />
//           <span className="text-xs text-gray-500">Danh mục</span>
//         </Link>
//         <Link href="/products" className="flex-1 h-full flex flex-col items-center justify-center gap-0">
//           <Package2Icon className="size-6 text-primary" />
//           <span className="text-xs text-gray-500">Sản phẩm</span>
//         </Link>
//         {user ? (
//           <>
//             <Link href="/account/cart" className="flex-1 h-full flex flex-col items-center justify-center gap-0">
//               <ShoppingCartIcon className="size-6 text-primary" />
//               <span className="text-xs text-gray-500">Giỏ hàng</span>
//             </Link>

//             <Link href="/account" className="flex-1 h-full flex flex-col items-center justify-center gap-0">
//               <UserIcon className="size-6 text-primary" />
//               <span className="text-xs text-gray-500">Tài khoản</span>
//             </Link>
//           </>
//         ) : (
//           <button
//             onClick={() => setOpenAuth(true)}
//             className="flex-1 h-full flex flex-col items-center justify-center gap-0"
//           >
//             <UserIcon className="size-6 text-primary" />
//             <span className="text-xs text-gray-500">Đăng nhập</span>
//           </button>
//         )}
//       </nav>
//       <AuthPopup open={openAuth} onOpenChange={setOpenAuth} />
//     </>
//   );
// }

'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

import useUserStore from '@/stores/userStore';
import AuthPopup from '@/components/auth/AuthPopup';
import { HomeIcon, LayersIcon, Package2Icon, ShoppingCartIcon, UserIcon } from 'lucide-react';

export default function NavBottomOnMobile() {
  const [openAuth, setOpenAuth] = useState(false);
  const [visible, setVisible] = useState(true);

  const lastScrollY = useRef(0);
  const user = useUserStore((s) => s.user);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;

      if (currentY > lastScrollY.current && currentY > 50) {
        // kéo xuống
        setVisible(false);
      } else {
        // kéo lên
        setVisible(true);
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`md:hidden fixed bottom-0 w-full z-50 border-t-2 border-primary bg-white h-14 flex transition-transform duration-[600ms] ${
          visible ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <Link href="/" className="flex-1 flex flex-col items-center justify-center">
          <HomeIcon className="size-6 text-primary" />
          <span className="text-xs text-gray-500">Trang chủ</span>
        </Link>

        <Link href="/" className="flex-1 flex flex-col items-center justify-center">
          <LayersIcon className="size-6 text-primary" />
          <span className="text-xs text-gray-500">Danh mục</span>
        </Link>

        <Link href="/products" className="flex-1 flex flex-col items-center justify-center">
          <Package2Icon className="size-6 text-primary" />
          <span className="text-xs text-gray-500">Sản phẩm</span>
        </Link>

        {user ? (
          <>
            <Link href="/account/cart" className="flex-1 flex flex-col items-center justify-center">
              <ShoppingCartIcon className="size-6 text-primary" />
              <span className="text-xs text-gray-500">Giỏ hàng</span>
            </Link>

            <Link href="/account" className="flex-1 flex flex-col items-center justify-center">
              <UserIcon className="size-6 text-primary" />
              <span className="text-xs text-gray-500">Tài khoản</span>
            </Link>
          </>
        ) : (
          <button onClick={() => setOpenAuth(true)} className="flex-1 flex flex-col items-center justify-center">
            <UserIcon className="size-6 text-primary" />
            <span className="text-xs text-gray-500">Đăng nhập</span>
          </button>
        )}
      </nav>

      <AuthPopup open={openAuth} onOpenChange={setOpenAuth} />
    </>
  );
}
