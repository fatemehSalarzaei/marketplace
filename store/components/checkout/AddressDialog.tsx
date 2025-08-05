// AddressDialog.tsx
"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AddressForm from "../user/address/AddressForm";
import { Address } from "@/types/address/address";
import { createAddress } from "@/services/user/address/createAddress";
import { toast } from "react-toastify";

interface AddressDialogProps {
  onSuccess: (address: Address) => void;
}

export default function AddressDialog({ onSuccess }: AddressDialogProps) {
  const [open, setOpen] = useState(false);

  const handleSubmit = async (data: Partial<Address>) => {
    try {
      const res = await createAddress(data);
      toast.success("آدرس با موفقیت ثبت شد");
      onSuccess(res.data);
      setOpen(false);
    } catch (error) {
      toast.error("خطا در ثبت آدرس");
      console.error(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="text-blue-600 text-sm underline hover:text-blue-800">
          + افزودن آدرس جدید
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* <DialogHeader>
          <DialogTitle>افزودن آدرس</DialogTitle>
        </DialogHeader> */}
        <AddressForm onSubmit={handleSubmit} />
      </DialogContent>
    </Dialog>
  );
}
