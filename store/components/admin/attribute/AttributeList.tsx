"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Attribute } from "@/types/admin/attribute/attribute";
import { getAttributes, deleteAttribute } from "@/services/admin/attribute/attributeService";
import { Button } from "@/components/ui/Button";
import AttributeFilters from "./AttributeFilters";
import AttributeTable from "./AttributeTable";
import DeleteAttributeModal from "./DeleteAttributeModal ";
import AttributeForm from "./AttributeForm";

const PAGE_SIZE = 10;

export default function AttributeList() {
  const router = useRouter();
  const [attributes, setAttributes] = useState<Attribute[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState<{ search?: string }>({});
  const [selectedAttribute, setSelectedAttribute] = useState<Attribute | null>(null);
  const [openForm, setOpenForm] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const fetchData = async (page = 1, activeFilters = filters) => {
    setLoading(true);
    try {
      const response = await getAttributes(page, activeFilters.search);
      setAttributes(response.data.results || []);
      setTotalPages(Math.ceil((response.data.count || 0) / PAGE_SIZE));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(currentPage, filters);
  }, [currentPage, filters]);

  const handleFilterChange = (newFilters: { search?: string }) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleDelete = async () => {
    if (!selectedAttribute) return;
    try {
      await deleteAttribute(selectedAttribute.id);
      setDeleteDialogOpen(false);
      setSelectedAttribute(null);
      fetchData(currentPage, filters);
    } catch {
      alert("خطا در حذف خصوصیت");
    }
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;
    return (
      <div className="flex justify-center mt-4 gap-2 flex-wrap">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-3 py-1 rounded border text-sm ${
              page === currentPage ? "bg-blue-600 text-white" : "bg-white hover:bg-gray-100"
            }`}
          >
            {page}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div dir="rtl" className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">لیست خصوصیات</h1>
        <Button
          onClick={() => {
            setSelectedAttribute(null);
            setOpenForm(true);
          }}
        >
          افزودن خصوصیت
        </Button>
      </div>

      <AttributeFilters onFilterChange={handleFilterChange} />

      {loading ? (
        <p>در حال بارگذاری...</p>
      ) : (
        <>
          <AttributeTable
            attributes={attributes}
            onEdit={(attr) => {
              // 👉 هدایت به صفحه ویرایش
              router.push(`/admin/product-attributes/${attr.id}`);
            }}
            onRequestDelete={(attr) => {
              setSelectedAttribute(attr);
              setDeleteDialogOpen(true);
            }}
          />
          {renderPagination()}
        </>
      )}

      {openForm && (
        <AttributeForm
          attribute={selectedAttribute}
          onClose={() => {
            setOpenForm(false);
            fetchData(currentPage, filters);
          }}
        />
      )}

      {deleteDialogOpen && selectedAttribute && (
        <DeleteAttributeModal
          attribute={selectedAttribute}
          onCancel={() => setDeleteDialogOpen(false)}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
}
