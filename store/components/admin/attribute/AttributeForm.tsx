"use client";

import { useEffect, useState } from "react";
import { Attribute } from "@/types/admin/attribute/attribute";
import {
  createAttribute,
  updateAttribute,
} from "@/services/admin/attribute/attributeService";
import { Input } from "@/components/ui/Input";
import { Checkbox } from "@/components/ui/Checkbox";
import { Button } from "@/components/ui/Button";
import AttributeValueManager from "./AttributeValueManager";
import { toast } from "sonner";

interface Props {
  attribute: Attribute | null;
  onClose: () => void;
}

const AttributeForm: React.FC<Props> = ({ attribute, onClose }) => {
  const [form, setForm] = useState({
    name: "",
    slug: "",
    use_predefined_values: false,
    for_variant: false,
  });
  const [id, setId] = useState<number | null>(null);

  useEffect(() => {
    if (attribute) {
      setForm({
        name: attribute.name,
        slug: attribute.slug,
        use_predefined_values: attribute.use_predefined_values,
        for_variant: attribute.for_variant,
      });
      setId(attribute.id);
    }
  }, [attribute]);

  const handleSubmit = async () => {
    try {
      if (!form.name || !form.slug) {
        toast.error("لطفاً نام و نامک را وارد کنید");
        return;
      }

      if (id) {
        await updateAttribute(id, form);
        toast.success("خصوصیت با موفقیت ویرایش شد");
      } else {
        const res = await createAttribute(form);
        setId(res.data.id);
        toast.success("خصوصیت جدید ثبت شد");
      }
    } catch (err) {
      toast.error("خطا در ذخیره‌سازی خصوصیت");
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center">
      <div
        dir="rtl"
        className="p-6 border rounded-md bg-white max-w-xl w-full mx-4 shadow-lg"
      >
        <h3 className="font-semibold text-lg mb-4">
          {id ? "ویرایش" : "افزودن"} خصوصیت
        </h3>

        <div className="space-y-3">
          <Input
            placeholder="نام"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <Input
            placeholder="نامک (slug)"
            value={form.slug}
            onChange={(e) => setForm({ ...form, slug: e.target.value })}
          />

          <div className="flex flex-col sm:flex-row gap-4">
            <label className="flex items-center gap-2 text-sm">
              <Checkbox
                checked={form.use_predefined_values}
                onCheckedChange={(val) =>
                  setForm({ ...form, use_predefined_values: !!val })
                }
              />
              استفاده از مقدارهای از پیش تعریف‌شده
            </label>
            <label className="flex items-center gap-2 text-sm">
              <Checkbox
                checked={form.for_variant}
                onCheckedChange={(val) =>
                  setForm({ ...form, for_variant: !!val })
                }
              />
              برای متغیرها
            </label>
          </div>

          <div className="flex gap-2 mt-4">
            <Button onClick={handleSubmit}>ذخیره</Button>
            <Button variant="outline" onClick={onClose}>
              بستن
            </Button>
          </div>

          {id && form.use_predefined_values && (
            <div className="mt-6">
              <AttributeValueManager attributeId={id} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AttributeForm;
