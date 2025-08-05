"use client";

import { useEffect, useState } from "react";
import { Address } from "@/types/address/address";
import { getMyAddresses } from "@/services/user/address/getAddresses";
import { createAddress } from "@/services/user/address/createAddress";
import { deleteAddress } from "@/services/user/address/deleteAddress";
import { updateAddress } from "@/services/user/address/updateAddress";
import AddressCard from "@/components/user/address/AddressCard";
import { Button } from "@/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import AddressForm from "@/components/user/address/AddressForm";

export default function AddressPage() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [editing, setEditing] = useState<Address | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const loadAddresses = async () => {
    const { data } = await getMyAddresses();
    setAddresses(data.results);
  };

  const handleDelete = async (id: number) => {
    await deleteAddress(id);
    loadAddresses();
  };

  const handleSave = async (data: Partial<Address>) => {
    if (editing) {
      await updateAddress(editing.id, data);
    } else {
      await createAddress(data as any);
    }
    setEditing(null);
    setDialogOpen(false);
    loadAddresses();
  };

  useEffect(() => {
    loadAddresses();
  }, []);

  return (
    <div
      className="max-w-7xl mx-auto py-6 px-10 sm:px-12 font-iranyekan"
      dir="rtl"
    >
      <div className="mr-6 sm:mr-0 flex justify-between items-center mb-4 flex-wrap gap-2">
        <h1 className="text-2xl font-bold">آدرس‌های من</h1>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditing(null)}>افزودن آدرس جدید</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle className="text-lg font-bold mt-6 mb-4">
              {editing ? "ویرایش آدرس" : "افزودن آدرس جدید"}
            </DialogTitle>
            <AddressForm address={editing} onSubmit={handleSave} />
          </DialogContent>
        </Dialog>
      </div>
      <div className="space-y-4">
        {addresses.length === 0 ? (
          <p>آدرسی موجود نیست.</p>
        ) : (
          addresses.map((addr) => (
            <div key={addr.id}>
              <AddressCard
                address={addr}
                onEdit={(a) => {
                  setEditing(a);
                  setDialogOpen(true);
                }}
                onDelete={handleDelete}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
