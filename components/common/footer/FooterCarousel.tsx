import Image from 'next/image';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';

const footers = [
  {
    title: 'Giao hàng Siêu Tốc 2 - 4H',
    desc: 'Giao hàng trong nội thành HCM & Hà Nội nhanh chóng từ 2 - 4H.',
    imgUrl: '/footer/footer1.png',
  },
  {
    title: '7 ngày đổi trả',
    desc: 'Yên tâm mua sắm với chính sách đổi trả trong vòng 7 ngày',
    imgUrl: '/footer/footer2.png',
  },
  {
    title: '100% chính hãng',
    desc: 'Cam kết chất lượng sản phẩm chính hãng 100%',
    imgUrl: '/footer/footer3.png',
  },
  {
    title: 'Thanh toán dễ dàng',
    desc: 'Đa dạng phương thức như COD, chuyển khoản, quẹt thẻ trả góp',
    imgUrl: '/footer/footer4.png',
  },
];
const FooterCarousel = () => {
  return (
    <div className="mt-20 my-5 bg-stone-100 py-8">
      <Carousel
        opts={{
          dragFree: true,
        }}
        className="w-full max-w-300 mx-auto"
      >
        <CarouselContent className="-ml-1">
          {footers.map((item, i) => (
            <CarouselItem key={i} className="pl-4 md:basis-1/2 lg:basis-1/4">
              <div className="flex gap-4">
                <Image src={item.imgUrl} width={60} height={60} alt={item.title} className="w-16 h-16" />
                <div className="w-60">
                  <p className="text-primary font-medium">{item.title}</p>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default FooterCarousel;
