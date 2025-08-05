// DeleteAttributeGroupModal.tsx
"use client";

import { AttributeGroup } from "@/types/admin/attribute/attribute";
import { deleteAttributeGroup } from "@/services/admin/attribute/attributeService";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/Button";
import { toast } from "sonner";

interface Props {
  group: AttributeGroup | null;
  open: boolean;
  onClose: () => void;
  onDeleted: () => void; // فقط برای اطلاع دادن حذف موفق
}


const DeleteAttributeGroupModal = ({ group, open, onClose, onDeleted }: Props) => {
  const handleDelete = () => {
    if (!group) return;
    onDeleted(); // حذف را در والد انجام بده
    onClose();   // بستن دیالوگ
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent dir="rtl">
        <DialogHeader>
          <DialogTitle>حذف گروه ویژگی</DialogTitle>
        </DialogHeader>
        <p>آیا از حذف گروه "{group?.name}" مطمئن هستید؟</p>
        <Button variant="outline" onClick={onClose}>انصراف</Button>
        <Button variant="destructive" onClick={handleDelete}>حذف</Button>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteAttributeGroupModal;
