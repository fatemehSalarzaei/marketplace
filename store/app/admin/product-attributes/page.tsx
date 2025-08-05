import AttributeTabs from "@/components/admin/attribute/AttributeTabs";

export default function AttributesPage() {
  return (
    <div dir="rtl" className="p-4">
      <h1 className="text-xl font-bold mb-4">مدیریت خصوصیات محصول</h1>
      <AttributeTabs />
    </div>
  );
}
