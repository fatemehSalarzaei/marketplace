
// components/AttributeValueManager.tsx
"use client";
import { useEffect, useState } from "react";
import { AttributeValue } from "@/types/admin/attribute/attribute";
import { getAttributeValues, createAttributeValue, deleteAttributeValue } from "@/services/admin/attribute/attributeService";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

interface Props {
  attributeId: number;
}

const AttributeValueManager: React.FC<Props> = ({ attributeId }) => {
  const [values, setValues] = useState<AttributeValue[]>([]);
  const [newValue, setNewValue] = useState("");

  const fetchValues = async () => {
    const res = await getAttributeValues(attributeId);
    setValues(res.data);
  };

  useEffect(() => {
    fetchValues();
  }, [attributeId]);

  const handleAdd = async () => {
    if (!newValue) return;
    await createAttributeValue({ value: newValue, attribute: attributeId });
    setNewValue("");
    fetchValues();
  };

  const handleDelete = async (id: number) => {
    await deleteAttributeValue(id);
    fetchValues();
  };

  return (
    <div dir="rtl">
      <h4 className="font-medium">مدیریت مقادیر</h4>
      <div className="flex gap-2 my-2">
        <Input value={newValue} onChange={e => setNewValue(e.target.value)} placeholder="مقدار جدید" />
        <Button onClick={handleAdd}>افزودن</Button>
      </div>
      <ul className="space-y-1">
        {values.map(val => (
          <li key={val.id} className="flex justify-between items-center border p-2 rounded">
            {val.value}
            <Button variant="destructive" size="sm" onClick={() => handleDelete(val.id)}>حذف</Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AttributeValueManager;
