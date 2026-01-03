import Step1 from '@/components/account/order/Step1';
import StepperOrder from '@/components/order/StepperOrder';

type PageProps = {
  params: {
    id: string;
  };
};

const Page = async ({ params }: PageProps) => {
  const { id } = await params;

  if (!id) return;

  return (
    <div className="bg-zinc-100 pb-10 pt-4">
      <div className="max-w-298 mx-auto bg-white">
        <div className="py-6 px-10">
          <StepperOrder step={1} />
        </div>
        <div>
          <Step1 id={id} />
        </div>
      </div>
    </div>
  );
};

export default Page;
