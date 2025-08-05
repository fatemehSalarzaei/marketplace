"use client";

import { useEffect, useState } from "react";
import { Attribute } from "@/types/admin/attribute/attribute";
import { Input } from "@/components/ui/Input";
import { Checkbox } from "@/components/ui/Checkbox";
import { Button } from "@/components/ui/Button";
import { toast } from "sonner";
import { updateAttribute } from "@/services/admin/attribute/attributeService";

interface Props {
  attribute: Attribute;
  onSuccess: () => void;
}

const EditAttributeForm = ({ attribute, onSuccess }: Props) => {
  const [form, setForm] = useState({
    name: "",
    slug: "",
    use_predefined_values: false,
    for_variant: false,
  });

  useEffect(() => {
    if (attribute) {
      setForm({
        name: attribute.name,
        slug: attribute.slug,
        use_predefined_values: attribute.use_predefined_values,
        for_variant: attribute.for_variant,
      });
    }
  }, [attribute]);

  const handleSubmit = async () => {
    try {
      await updateAttribute(attribute.id, form);
      toast.success("خصوصیت با موفقیت ویرایش شد");
      onSuccess();
    } catch {
      toast.error("خطا در ذخیره‌سازی اطلاعات");
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow space-y-4" dir="rtl">
      <div>
        <label className="block mb-1 font-medium text-gray-700">نام</label>
        <Input
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="نام"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium text-gray-700">نامک</label>
        <Input
          value={form.slug}
          onChange={(e) => setForm({ ...form, slug: e.target.value })}
          placeholder="نامک"
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <label className="flex items-center gap-2">
          <Checkbox
            checked={form.use_predefined_values}
            onCheckedChange={(v) =>
              setForm({ ...form, use_predefined_values: !!v })
            }
          />
          استفاده از مقادیر از پیش تعریف‌شده
        </label>
        <label className="flex items-center gap-2">
          <Checkbox
            checked={form.for_variant}
            onCheckedChange={(v) =>
              setForm({ ...form, for_variant: !!v })
            }
          />
          قابل استفاده برای متغیر
        </label>
      </div>

      <Button onClick={handleSubmit}>ذخیره</Button>
    </div>
  );
};

export default EditAttributeForm;
