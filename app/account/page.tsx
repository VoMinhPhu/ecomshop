import NavAccount from '@/components/account/NavAccount';

const page = () => {
  return (
    <div className="mt-31">
      <div className="max-w-300 w-full mx-auto grid grid-cols-5 gap-2">
        <NavAccount />
        <div className="col-span-4">content</div>
      </div>
    </div>
  );
};

export default page;
