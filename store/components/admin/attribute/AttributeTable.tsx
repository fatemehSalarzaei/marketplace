import { Attribute } from "@/types/admin/attribute/attribute";
import { FaEdit, FaTrash } from "react-icons/fa";

interface Props {
  attributes: Attribute[];
  onEdit: (attr: Attribute) => void;
  onRequestDelete: (attr: Attribute) => void;
}

export default function AttributeTable({ attributes, onEdit, onRequestDelete }: Props) {
  if (attributes.length === 0) {
    return (
      <p className="text-center py-4">داده‌ای وجود ندارد</p>
    );
  }

  return (
    <div className="overflow-x-auto shadow border border-gray-200 rounded-md">
      <table className="min-w-full bg-white text-sm">
        <thead className="bg-gray-100 border-b text-right">
          <tr>
            <th className="px-4 py-2">نام</th>
            <th className="px-4 py-2">Slug</th>
            <th className="px-4 py-2">مقادیر</th>
            <th className="px-4 py-2">عملیات</th>
          </tr>
        </thead>
        <tbody>
          {attributes.map((attr) => (
            <tr key={attr.id} className="hover:bg-gray-50 border-b">
              <td className="px-4 py-2 cursor-pointer" onClick={() => onEdit(attr)}>{attr.name}</td>
              <td className="px-4 py-2">{attr.slug}</td>
              <td className="px-4 py-2">
                {Array.isArray(attr.values) && attr.values.length > 0
                  ? attr.values.map((v) => v.value).join("، ")
                  : "-"}
              </td>
              <td className="px-4 py-2 flex gap-4 justify-center">
                <button
                  onClick={() => onEdit(attr)}
                  title="ویرایش"
                  className="text-blue-600 hover:text-blue-800"
                  aria-label="ویرایش"
                >
                  <FaEdit size={18} />
                </button>
                <button
                  onClick={() => onRequestDelete(attr)}
                  title="حذف"
                  className="text-red-600 hover:text-red-800"
                  aria-label="حذف"
                >
                  <FaTrash size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
