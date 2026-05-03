import Link from 'next/link';
import Image from 'next/image';

import { Home, Mail, MapPinHouse } from 'lucide-react';

import FooterCarousel from './FooterCarousel';

const Footer = () => {
  return (
    <footer>
      <FooterCarousel />
      <div>
        <div className="max-w-300 mx-auto px-2 md:pb-10 pb-16 grid lg:grid-cols-5 md:grid-cols-3">
          <div>
            <h3 className="font-semibold text-xl mb-2 mt-4 md:mt-2 lg:mt-0">Cửa hàng</h3>
            <div className="text-sm flex flex-col gap-1.5 pl-5 md:pl-2">
              <p className="flex items-center gap-1.5">
                <Home className="size-3.5" />
                Cửa hàng: ecomshop.site
              </p>
              <span className="flex items-center gap-1">
                <MapPinHouse className="size-3.5" />
                <address>Địa chỉ: 123A, đường ABC, TP. Hồ Chí Minh</address>
              </span>
              <p className="flex items-center gap-1">
                <Mail className="size-3.5" />
                ecomshop.site@gmail.com
              </p>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-xl mb-2 mt-4 md:mt-2 lg:mt-0">Chính sách & pháp lý</h3>
            <div className="text-sm flex flex-col gap-1.5 pl-5 md:pl-2">
              <p>Chính sách bảo hành</p>
              <p>Chính sách đổi trả</p>
              <p>Chính sách thanh toán</p>
              <p>Chính sách vận chuyển</p>
              <p>Chính sách bảo mật</p>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-xl mb-2 mt-4 md:mt-2 lg:mt-0">Danh mục chính</h3>
            <div className="text-sm flex flex-col gap-1.5 pl-5 md:pl-2">
              <Link href="/products?category=ban-phim" title="Xem các loại bàn phím">
                Bàn phím
              </Link>
              <Link href="/products?category=the-thao" title="Xem những sản phẩm thể thao">
                Thể thao
              </Link>
              <Link href="/products?category=dien-thoai" title="Xem các loại điện thoại">
                Điện thoại
              </Link>
              <Link href="/products?category=tai-nghe" title="Xem các loại tai nghe">
                Tai nghe
              </Link>
              <Link href="/products?category=cong-nghe" title="Xem những đồ dùng công nghệ">
                Công nghệ
              </Link>
              <Link href="/products?category=noi-that" title="Xem những sản phẩm nội thất">
                Nội thất
              </Link>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-xl mb-2 mt-4 md:mt-2 lg:mt-0">Thương hiệu nổi bật</h3>
            <div className="text-sm flex flex-col gap-1.5 pl-5 md:pl-2">
              <Link href="/products?brand=samsung">Samsung</Link>
              <Link href="/products?brand=apple">Apple</Link>
              <Link href="/products?brand=hp">HP</Link>
              <Link href="/products?brand=lenovo">Lenovo</Link>
              <Link href="/products?brand=aula">Aula</Link>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-xl mb-2 mt-4 md:mt-2 lg:mt-0">Thanh toán</h3>

            <div className="flex items-center gap-2 md:justify-start md:pl-2 justify-center">
              <Image src="/footer/visa.png" alt="Thanh toán qua VISA" width={50} height={50} className="w-12 h-12" />
              <Image src="/footer/jcb.png" alt="Thanh toán qua JCB" width={50} height={50} className="w-12 h-12" />
              <Image src="/footer/qr.png" alt="Thanh toán qua QR" width={50} height={50} className="w-10 h-10" />
            </div>
            <h3 className="font-semibold text-xl mb-2 md:mt-2 lg:mt-0 mt-6">Kết nối với chúng tôi</h3>
            <div className="flex items-center gap-2 md:justify-start md:pl-2 justify-center">
              <Link href="https://www.youtube.com" rel="noopener noreferrer" target="_blank">
                <Image
                  src="/footer/youtube.png"
                  alt="Youtube"
                  width={50}
                  height={50}
                  loading="lazy"
                  className="w-9 h-9"
                />
              </Link>
              <Link href="https://www.facebook.com" rel="noopener noreferrer" target="_blank">
                <Image
                  src="/footer/facebook.png"
                  alt="Facebook"
                  width={50}
                  height={50}
                  loading="lazy"
                  className="w-9 h-9"
                />
              </Link>
              <Link href="https://www.tiktok.com" rel="noopener noreferrer" target="_blank">
                <Image
                  src="/footer/tiktok.png"
                  alt="Tiktok"
                  width={50}
                  height={50}
                  loading="lazy"
                  className="w-8 h-8"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
