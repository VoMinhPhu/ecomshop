'use client';

import {
  Stepper,
  StepperDescription,
  StepperIndicator,
  StepperItem,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from '@/components/ui/stepper';
import { useState } from 'react';

const steps = [
  {
    step: 1,
    title: 'Xác nhận đơn hàng',
    description: 'Xác nhận số lượng, ghi chú sản phẩm',
  },
  {
    step: 2,
    title: 'Thanh toán',
    description: 'Thực hiện thanh toán (online)',
  },
  {
    step: 3,
    title: 'Hoàn tất',
    description: 'Đặt hàng thành công',
  },
];

export default function StepperOrder() {
  const [step, setStep] = useState<number>(1);

  return (
    <div className="space-y-8 text-center">
      <Stepper value={step}>
        {steps.map(({ step, title, description }) => (
          <StepperItem className="relative flex-1 flex-col!" key={step} step={step}>
            <StepperTrigger className="flex-col gap-3 rounded">
              <StepperIndicator />
              <div className="space-y-0.5 px-2">
                <StepperTitle>{title}</StepperTitle>
                <StepperDescription className="max-sm:hidden">{description}</StepperDescription>
              </div>
            </StepperTrigger>
            {step < steps.length && (
              <StepperSeparator className="-order-1 -translate-y-1/2 absolute inset-x-0 top-3 left-[calc(50%+0.75rem+0.125rem)] m-0 group-data-[orientation=horizontal]/stepper:w-[calc(100%-1.5rem-0.25rem)] group-data-[orientation=horizontal]/stepper:flex-none" />
            )}
          </StepperItem>
        ))}
      </Stepper>
      {/* <div>
        <button
          onClick={() => {
            if (step > 1) setStep(step - 1);
          }}
        >
          Previous
        </button>
        <button onClick={() => setStep(step + 1)}>Next</button>
      </div> */}
    </div>
  );
}
