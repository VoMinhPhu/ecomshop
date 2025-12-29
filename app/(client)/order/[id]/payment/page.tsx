import ShowPayment from '@/components/account/order/ShowPayment';
import StepperOrder from '@/components/order/StepperOrder';

type PageProps = {
  params: {
    id: string;
  };
  searchParams: {
    method: string;
  };
};

const page = async ({ searchParams, params }: PageProps) => {
  const { id } = await params;
  const { method } = await searchParams;

  return (
    <div className="bg-zinc-100 pb-10 pt-4">
      <div className="max-w-298 mx-auto bg-white">
        <div className="py-6 px-10">
          <StepperOrder step={2} />
        </div>
        <ShowPayment orderCode={id} paymentMethod={method} />
      </div>
    </div>
  );
};
export default page;
