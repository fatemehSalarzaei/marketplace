export function translateStatus(status: string): string {
  const map: Record<string, string> = {
    pending: 'در انتظار پرداخت',
    paid: 'پرداخت‌شده',
    processing: 'در حال پردازش',
    shipped: 'ارسال‌شده',
    delivered: 'تحویل داده شده',
    canceled: 'لغو شده',
  };
  return map[status] || status;
}
