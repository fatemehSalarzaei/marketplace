export default function ProductSortBox({
  onChange,
}: {
  onChange: (val: string) => void;
}) {
  return (
    <div className="flex justify-end mb-4">
      <select
        onChange={(e) => onChange(e.target.value)}
        className="border p-2 rounded"
      >
        <option value="-created_at">جدیدترین</option>
        <option value="created_at">قدیمی‌ترین</option>
        <option value="name">نام (A-Z)</option>
        <option value="-name">نام (Z-A)</option>
        <option value="min_price">ارزان‌ترین</option>
        <option value="-min_price">گران‌ترین</option>
        <option value="-total_sales">پرفروش‌ترین</option>
        <option value="-popularity">محبوب‌ترین</option>
      </select>
    </div>
  );
}
