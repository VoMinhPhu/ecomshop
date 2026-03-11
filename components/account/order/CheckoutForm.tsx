'use client';

import { useParams, useRouter } from 'next/navigation';
import { stripePromise } from '@/configs/stripe.config';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

import { toast } from 'sonner';

import { Button } from '@/components/ui/button';

import { usePaymentIntent } from '@/hooks/api/payment';

const CheckoutForm: React.FC<{ amount: number; orderCode: string }> = ({ amount, orderCode }) => {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const { id } = useParams();

  const { mutate: paymentIntentMutate, isPending } = usePaymentIntent();

  const handlePay = () => {
    if (!stripe || !elements) return;

    paymentIntentMutate(
      { amount, orderCode },
      {
        onSuccess: async (data) => {
          const result = await stripe.confirmCardPayment(data.clientSecret, {
            payment_method: {
              card: elements.getElement(CardElement)!,
            },
          });

          if (result.error) {
            toast.error('Thanh toán thất bại', {
              description: result.error.message,
              duration: 3000,
            });
          } else {
            router.push('/order/' + id + '/status?payment=true');
          }
        },
      },
    );
  };

  return (
    <div className="pb-16">
      <p className="font-semibold mb-3">Thanh toán bằng thẻ VISA</p>
      <CardElement className="p-4 border rounded-md" options={{ hidePostalCode: true }} />

      <Button onClick={handlePay} className="mt-6 w-full" size="lg" disabled={isPending}>
        {isPending ? 'Đang xử lý...' : 'Thanh toán'}
      </Button>
    </div>
  );
};

export const StripeCheckout: React.FC<{ amount: number; orderCode: string }> = ({ amount, orderCode }) => (
  <Elements stripe={stripePromise}>
    <CheckoutForm amount={amount} orderCode={orderCode} />
  </Elements>
);
