"use client";

import { useEffect, useState } from "react";
import {
  fetchSupportCategories,
  createSupportCategory,
  updateSupportCategory,
  deleteSupportCategory,
} from "@/services/admin/support/supportCategoryService";
import { SupportCategory } from "@/types/admin/support/supportCategory";
import SupportCategoryFilters from "./SupportCategoryFilters";
import SupportCategoryTable from "./SupportCategoryTable";
import DeleteSupportCategoryModal from "./DeleteSupportCategoryModal";
import SupportCategoryDialog from "./SupportCategoryDialog";

export default function AdminSupportCategoryPageContent() {
  const [categories, setCategories] = useState<SupportCategory[]>([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [filters, setFilters] = useState<{ search: string }>({ search: "" });
  const [selected, setSelected] = useState<SupportCategory | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

  const loadData = async (p = page, f = filters) => {
    const res = await fetchSupportCategories(p, f);
    setCategories(res.data.results);
    setCount(res.data.count);
  };

  useEffect(() => {
    loadData();
  }, [page]);

  const handleSave = async (data: Omit<SupportCategory, "id">, id?: number) => {
    id ? await updateSupportCategory(id, data) : await createSupportCategory(data);
    setDialogOpen(false);
    setSelected(null);
    loadData();
  };

  const handleDelete = async () => {
    if (selected) {
      await deleteSupportCategory(selected.id);
      setDeleteConfirmOpen(false);
      setSelected(null);
      loadData();
    }
  };

  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">دسته‌بندی‌های پشتیبانی</h1>
        <button onClick={() => setDialogOpen(true)} className="btn-primary">
          افزودن
        </button>
      </div>

      <SupportCategoryFilters
        onFilterChange={(newFilters) => {
          setFilters(newFilters);
          setPage(1);
          loadData(1, newFilters);
        }}
      />

      <SupportCategoryTable
        data={categories}
        page={page}
        totalCount={count}
        onPageChange={setPage}
        onRequestEdit={(item) => {
          setSelected(item);
          setDialogOpen(true);
        }}
        onRequestDelete={(item) => {
          setSelected(item);
          setDeleteConfirmOpen(true);
        }}
      />

      <SupportCategoryDialog
        open={dialogOpen}
        onClose={() => {
          setDialogOpen(false);
          setSelected(null);
        }}
        onSave={handleSave}
        initialData={selected}
      />

      <DeleteSupportCategoryModal
        open={deleteConfirmOpen}
        onCancel={() => setDeleteConfirmOpen(false)}
        onConfirm={handleDelete}
        category={selected}
      />
    </div>
  );
}
