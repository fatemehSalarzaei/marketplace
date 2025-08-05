"use client";

import { useEffect, useState } from "react";
import {
  getAttributeValues,
  createAttributeValue,
  updateAttributeValue,
  deleteAttributeValue,
} from "@/services/admin/attribute/attributeService";
import { AttributeValue } from "@/types/admin/attribute/attribute";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { toast } from "sonner";

interface Props {
  attributeId: number;
}

const AttributeValueEditor = ({ attributeId }: Props) => {
  const [values, setValues] = useState<AttributeValue[]>([]);
  const [newValue, setNewValue] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingValue, setEditingValue] = useState("");

  const fetchValues = async () => {
    try {
      const res = await getAttributeValues(attributeId);
      setValues(Array.isArray(res.data.results) ? res.data.results : []);
    } catch (error) {
      setValues([]);
    }
  };

  useEffect(() => {
    fetchValues();
    setEditingId(null);
    setEditingValue("");
  }, [attributeId]);

  const handleAdd = async () => {
    if (!newValue.trim()) return;
    try {
      await createAttributeValue({ value: newValue, attribute: attributeId });
      setNewValue("");
      toast.success("مقدار جدید اضافه شد");
      fetchValues();
    } catch {
      toast.error("خطا در افزودن مقدار جدید");
    }
  };

  const startEditing = (id: number, currentValue: string) => {
    setEditingId(id);
    setEditingValue(currentValue);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditingValue("");
  };

  const saveEdit = async () => {
    if (editingId === null) return;
    if (!editingValue.trim()) {
      toast.error("مقدار نمی‌تواند خالی باشد");
      return;
    }
    try {
      await updateAttributeValue(editingId, { value: editingValue, attribute: attributeId });
      toast.success("مقدار ویرایش شد");
      setEditingId(null);
      setEditingValue("");
      fetchValues();
    } catch {
      toast.error("خطا در به‌روزرسانی مقدار");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteAttributeValue(id);
      toast.success("مقدار حذف شد");
      fetchValues();
    } catch {
      toast.error("خطا در حذف مقدار");
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow space-y-4" dir="rtl">
      <h4 className="text-lg font-semibold">مقادیر خصوصیت</h4>

      <div className="flex gap-2">
        <Input
          value={newValue}
          onChange={(e) => setNewValue(e.target.value)}
          placeholder="مقدار جدید"
        />
        <Button onClick={handleAdd}>افزودن</Button>
      </div>

      {values.length === 0 && (
        <p className="text-sm text-gray-500">هیچ مقداری وجود ندارد.</p>
      )}

      {values.map((val) => (
        <div key={val.id} className="flex gap-2 items-center">
          {editingId === val.id ? (
            <>
              <Input
                value={editingValue}
                onChange={(e) => setEditingValue(e.target.value)}
              />
              <Button onClick={saveEdit}>ذخیره</Button>
              <Button variant="secondary" onClick={cancelEditing}>
                لغو
              </Button>
            </>
          ) : (
            <>
              <span className="flex-1">{val.value}</span>
              <Button onClick={() => startEditing(val.id, val.value)}>ویرایش</Button>
              <Button variant="destructive" onClick={() => handleDelete(val.id)}>
                حذف
              </Button>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default AttributeValueEditor;
