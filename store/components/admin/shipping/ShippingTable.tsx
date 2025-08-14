import { useAuth } from "@/context/AuthContext"; // اضافه شد

export default function ShippingTable({
  methods,
  page,
  totalCount,
  onPageChange,
  onRequestDelete,
}: ShippingTableProps) {
  const { hasPermission } = useAuth(); // استفاده از هوک
  const totalPages = Math.ceil(totalCount / 10);

  return (
    <div className="overflow-x-auto">
      <table className="table w-full border-separate border-spacing-y-2">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="px-4 py-2">نام</th>
            <th className="px-4 py-2">توضیحات</th>
            <th className="px-4 py-2">هزینه</th>
            <th className="px-4 py-2">زمان تحویل</th>
            <th className="px-4 py-2">وضعیت</th>
            <th className="px-4 py-2">عملیات</th>
          </tr>
        </thead>
        <tbody>
          {methods.length > 0 ? (
            methods.map((method) => (
              <tr key={method.id} className="bg-white border hover:bg-gray-50">
                <td className="px-4 py-2">{method.name}</td>
                <td className="px-4 py-2">{method.description || "-"}</td>
                <td className="px-4 py-2">
                  {Number(method.cost).toLocaleString()} تومان
                </td>
                <td className="px-4 py-2">
                  {method.min_estimated_days} تا {method.max_estimated_days} روز
                </td>
                <td className="px-4 py-2">
                  {method.active ? "فعال" : "غیرفعال"}
                </td>
                <td className="px-4 py-2">
                  <div className="flex gap-2">
                    {hasPermission("shippingmethod", "update") && (
                      <Link
                        href={`/admin/shipping-methods/${method.id}/edit`}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <PencilSquareIcon className="w-5 h-5" />
                      </Link>
                    )}
                    {hasPermission("shippingmethod", "delete") && (
                      <button
                        className="text-red-600 hover:text-red-800"
                        onClick={() => onRequestDelete(method.id)}
                      >
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="text-center py-4">
                موردی یافت نشد.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="flex justify-center mt-6">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            className={`mx-1 px-3 py-1 rounded border ${
              page === i + 1
                ? "bg-blue-500 text-white"
                : "bg-white text-gray-700 border-gray-300"
            }`}
            onClick={() => onPageChange(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
