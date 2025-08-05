// ================= components/admin/media/ =================
("use client");

interface Props {
  title: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function DeleteImageModal({
  title,
  onConfirm,
  onCancel,
}: Props) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow w-80">
        <h2 className="text-lg font-semibold mb-4">حذف تصویر</h2>
        <p className="mb-4">
          آیا از حذف تصویر <strong>{title}</strong> مطمئن هستید؟
        </p>
        <div className="flex justify-end gap-2">
          <button className="bg-gray-200 px-4 py-2 rounded" onClick={onCancel}>
            انصراف
          </button>
          <button
            className="bg-red-600 text-white px-4 py-2 rounded"
            onClick={onConfirm}
          >
            حذف
          </button>
        </div>
      </div>
    </div>
  );
}
