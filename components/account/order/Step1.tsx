'use client';

import Image from 'next/image';
import { useEffect } from 'react';

import { Loader, PackageOpenIcon } from 'lucide-react';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import AddNewAddressBtn from '../address/AddNewAddressBtn';

import { cn } from '@/lib/utils';
import useUserStore from '@/stores/user.store';
import { formatCurrency } from '@/utils/number.utils';

import { useGetAllAddress } from '@/hooks/api/address.hook';
import { useConfirmOrder, useGetDetailOrder } from '@/hooks/api/order.hook';

import { confirmOrderSchema, ConfirmOrderSchemaType } from '@/schemas/order.schema';

type Props = {
  id: string;
};

const Step1 = ({ id }: Props) => {
  const { data, isLoading } = useGetDetailOrder(id);
  const { data: address, isLoading: addressLoading } = useGetAllAddress();
  const user = useUserStore((s) => s.user);
  const { mutate: confirmOrderMutate, isPending } = useConfirmOrder();

  const form = useForm<ConfirmOrderSchemaType>({
    resolver: zodResolver(confirmOrderSchema),
    defaultValues: {
      id: '',
      shippingAddress: '',
      phone: '',
      note: '',
      paymentMethod: 'COD',
    },
  });

  useEffect(() => {
    if (data) {
      form.setValue('id', data.id);
      form.setValue('shippingAddress', data.shippingAddress);
      if (data.note) form.setValue('note', data.note);
    }

    if (user?.phone) form.setValue('phone', user.phone);

    if (address?.length) {
      const defaultAddr = address.find((a) => a.default);
      if (defaultAddr) {
        form.setValue('shippingAddress', defaultAddr.address);
      }
    }
  }, [data, user, address?.length]);

  function onSubmit(values: ConfirmOrderSchemaType) {
    confirmOrderMutate(values);
  }

  if (isLoading || addressLoading)
    return (
      <div className="md:p-10 p-4 pt-0">
        <p className="font-semibold">THÔNG TIN ĐƠN HÀNG</p>
        <div className="flex flex-col gap-2 items-center justify-center py-10">
          <Loader className="animate-spin text-primary size-8" />
          Đang tải thông tin đơn hàng
        </div>
      </div>
    );
  if (!data)
    return (
      <div className="md:p-10 p-4 pt-0">
        <p className="font-semibold">THÔNG TIN ĐƠN HÀNG</p>
        <div className="flex flex-col gap-2 items-center justify-center py-10">
          <PackageOpenIcon className="size-20 text-zinc-400" strokeWidth={1.35} />
          Đơn hàng không tồn tại
        </div>
      </div>
    );

  return (
    <div className="md:px-10 px-4 pb-16">
      <p className="font-semibold">THÔNG TIN ĐƠN HÀNG</p>
      <div className="mt-2">
        <p className="font-semibold">
          Mã đơn hàng:
          <span className="text-primary ml-1">{data.orderCode}</span>
        </p>
        <p className="font-semibold mt-3">Sản phẩm</p>
        <div className="mt-1">
          {data.items.map((i) => (
            <div key={i.id} className="border rounded-md p-4 flex mb-2 h-28">
              <Image
                src={i.product.thumbnail}
                alt={i.product.name}
                width={75}
                height={75}
                className="object-contain mr-3"
              />
              <div>
                <p className="font-semibold">{i.product.name}</p>
                <div className="mt-3">
                  {formatCurrency(i.unitPrice)} x {i.quantity} =
                  <span className="text-red-500 ml-1 font-semibold"> {formatCurrency(i.unitPrice * i.quantity)} đ</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
          <div className="mt-4">
            <FormField
              control={form.control}
              name="shippingAddress"
              render={({ field }) => (
                <FormItem className="gap-0">
                  <div className="font-semibold mb-1 flex gap-2">
                    Địa chỉ nhận hàng
                    <Label className="text-primary text-sm border-l-[2px] px-2 cursor-pointer">
                      Thêm điạ chỉ mới
                      <div className="hidden">
                        <AddNewAddressBtn />
                      </div>
                    </Label>
                  </div>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger className="w-full max-w-[calc(100vw-32px)] [&>span]:!block [&>span]:truncate text-left">
                        <SelectValue placeholder="Chọn địa chỉ nhận hàng" />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent className="max-w-[calc(100vw-32px)]">
                      {address?.map((item) => (
                        <SelectItem key={item.id} value={item.address}>
                          {item.address} {item.default && <span className="text-zinc-400 text-sm">(Mặc định)</span>}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="mt-4">
                  <div>
                    <span className="font-semibold mr-1">
                      Số điện thoại:
                      <span className="font-normal ml-2 text-zinc-500 text-sm">(Số điện thoại nhận hàng)</span>
                    </span>
                    <FormControl>
                      <Input {...field} className="mt-1.5" placeholder="Số điện thoại" />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="note"
              render={({ field }) => (
                <FormItem className="mt-4">
                  <div>
                    <p className="font-semibold">Ghi chú</p>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Ghi chú..."
                        className="min-h-25 bg-zinc-50 mt-1"
                        spellCheck={false}
                        maxLength={255}
                      />
                    </FormControl>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="paymentMethod"
              render={({ field }) => (
                <FormItem className="mt-4">
                  <p className="font-semibold">
                    Phương thức thanh toán <span className="text-red-400">*</span>
                  </p>

                  <RadioGroup value={field.value} onValueChange={field.onChange} className="mt-2 space-y-2">
                    <Label
                      className={cn(
                        'flex cursor-pointer items-start gap-3 rounded-md border p-4',
                        field.value === 'COD' && 'border-primary',
                      )}
                    >
                      <RadioGroupItem value="COD" />
                      <Image src="/icons/money.png" width={32} height={32} alt="Money" />
                      <div>
                        <p className="font-medium">Thanh toán bằng tiền mặt</p>
                        <p className="text-xs text-muted-foreground">Thanh toán khi nhận hàng</p>
                      </div>
                    </Label>

                    <Label
                      className={cn(
                        'flex cursor-pointer items-start gap-3 rounded-md border p-4',
                        field.value === 'VISA' && 'border-primary',
                      )}
                    >
                      <RadioGroupItem value="VISA" />
                      <Image src="/icons/visa.png" width={36} height={36} alt="Visa" />
                      <div>
                        <p className="font-medium">Thanh toán qua thẻ Visa</p>
                        <p className="text-xs text-muted-foreground">Sử dụng thẻ Visa để thanh toán trực tuyến</p>
                      </div>
                    </Label>
                    <Label
                      className={cn(
                        'flex cursor-pointer items-start gap-3 rounded-md border p-4',
                        field.value === 'VNPAY' && 'border-primary',
                      )}
                    >
                      <RadioGroupItem value="VNPAY" />
                      <Image src="/icons/vnpay.webp" width={36} height={36} alt="VNPAY" />
                      <div>
                        <p className="font-medium">Thanh toán qua VNPAY</p>
                        <p className="text-xs text-muted-foreground">Sử dụng VNPAY để thanh toán nhanh chóng</p>
                      </div>
                    </Label>
                  </RadioGroup>

                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center justify-between mt-8">
              <span className="font-semibold mr-1">Tổng thanh toán:</span>
              <span className="font-semibold text-red-500 text-lg">{formatCurrency(data.totalAmount)} đ</span>
            </div>
            <div className="mt-8 flex justify-end">
              <Button type="submit" size="lg" className="w-40" disabled={isPending}>
                <Loader className={cn('hidden', isPending && 'block animate-spin')} />
                Đặt hàng
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Step1;
