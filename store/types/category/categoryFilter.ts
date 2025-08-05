export interface FilterOption {
  slug?: string; // اضافه شده چون ممکن است نباشد
  title: string;
  values:
    | string[]
    | {
        id: number;
        name: string;
      }[]
    | {
        min: number;
        max: number;
      }
    | string[]; // برای وضعیت موجودی که آرایه رشته‌ای است مثل ["موجود", "ناموجود"]
}
