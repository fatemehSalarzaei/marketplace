"use client";

import { AttributeGroup, Attribute } from "@/types/admin/attribute/attribute";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { useForm } from "react-hook-form";
import { createAttributeGroup, updateAttributeGroup } from "@/services/admin/attribute/attributeService";
import { getAllAttributes } from "@/services/admin/attribute/attributeService";
import { toast } from "sonner";
import MultiSelect from "@/components/ui/multi-select";

interface AttributeGroupFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editData?: AttributeGroup | null;
  onSuccess: () => void;
}

export default function AttributeGroupForm({
  open,
  onOpenChange,
  editData,
  onSuccess,
}: AttributeGroupFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<AttributeGroup>();

  const [loading, setLoading] = useState(false);
  const [attributes, setAttributes] = useState<Attribute[]>([]);

  // در watch ویژگی‌ها را به آرایه id تبدیل می‌کنیم
  const selectedAttributes = watch("attributes") || [];
  // اگر selectedAttributes آرایه آبجکت است، فقط id ها را بگیر
  const selectedAttributeIds = Array.isArray(selectedAttributes) && selectedAttributes.length > 0 && typeof selectedAttributes[0] === "object"
    ? selectedAttributes.map((attr) => attr.id)
    : selectedAttributes;

  useEffect(() => {
    if (editData) {
      // مقداردهی اولیه فرم: name و attributes فقط آرایه id
      reset({
        ...editData,
        attributes: editData.attributes ?? [],
        name: editData.name, // مطمئن شو name است، نه title
      });
    } else {
      reset({
        name: "",
        description: "",
        slug: "",
        attributes: [],
      });
    }
  }, [editData, reset]);

  useEffect(() => {
    const fetchAllAttributes = async () => {
      try {
        const response = await getAllAttributes();
        setAttributes(response.data.results ?? []);
      } catch (err) {
        console.error("خطا در دریافت خصوصیت‌ها:", err);
      }
    };

    fetchAllAttributes();
  }, []);

  const onSubmit = async (data: AttributeGroup) => {
    setLoading(true);
    try {
      // فقط attribute_ids را ارسال کن، نه attributes کامل
      const payload = {
        name: data.name,
        description: data.description,
        slug: data.slug,
        attribute_ids: selectedAttributeIds,
      };

      if (editData) {
        await updateAttributeGroup(editData.id, payload);
        toast.success("گروه ویژگی با موفقیت ویرایش شد.");
      } else {
        await createAttributeGroup(payload);
        toast.success("گروه ویژگی با موفقیت ایجاد شد.");
      }
      onSuccess();
      onOpenChange(false);
      reset();
    } catch (err) {
      console.error(err);
      toast.error("خطایی در ثبت اطلاعات رخ داد.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{editData ? "ویرایش گروه ویژگی" : "افزودن گروه ویژگی"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label>نام گروه</Label>
            <Input {...register("name", { required: true })} />
            {errors.name && <span className="text-sm text-red-500">نام گروه الزامی است.</span>}
          </div>

          <div>
            <Label>توضیحات</Label>
            <Input {...register("description")} />
          </div>

          <div>
            <Label>اسلاگ</Label>
            <Input {...register("slug")} />
          </div>

          <div>
            <Label>ویژگی‌ها</Label>
            <MultiSelect
              options={attributes}
              selected={attributes.filter(attr => selectedAttributeIds.includes(attr.id))}
              onChange={(values) => setValue("attributes", values, { shouldValidate: true })}
              labelField="name"
              valueField="id"
            />
            {errors.attributes && (
              <span className="text-sm text-red-500">حداقل یک ویژگی را انتخاب کنید.</span>
            )}
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>
              انصراف
            </Button>
            <Button type="submit" disabled={loading}>
              {editData ? "ویرایش" : "افزودن"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
