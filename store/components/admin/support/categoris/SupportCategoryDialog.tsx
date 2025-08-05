'use client';
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';
import { useEffect, useState } from 'react';
import { SupportCategory } from '@/types/admin/support/supportCategory';

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: (data: Omit<SupportCategory, 'id'>, id?: number) => void;
  initialData?: SupportCategory | null;
}

export default function SupportCategoryDialog({ open, onClose, onSave, initialData }: Props) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setDescription(initialData.description);
    } else {
      setName('');
      setDescription('');
    }
  }, [initialData]);

  const handleSubmit = () => {
    onSave({ name, description }, initialData?.id);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>ویرایش یا افزودن دسته پشتیبانی</DialogHeader>
        <div className="space-y-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="نام"
            className="input"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="توضیحات"
            className="textarea"
          />
          <button onClick={handleSubmit} className="btn-primary w-full">
            ذخیره
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

