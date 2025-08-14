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
import { useAuth } from "@/context/AuthContext";

const PAGE_SIZE = 10;

export default function AttributeList() {
  const { hasPermission } = useAuth();
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
    if (!hasPermission("attribute", "read")) return;
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
  }, [currentPage, filters, hasPermission]);

  const handleFilterChange = (newFilters: { search?: string }) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleDelete = async () => {
    if (!selectedAttribute || !hasPermission("attribute", "delete")) return;
    try {
      await deleteAttribute(selectedAttribute.id);
      setDeleteDialogOpen(false);
      setSelectedAttribute(null);
      fetchData(currentPage, filters);
    } catch {
      alert("خطا در حذف خصوصیت");
    }
  };

  if (!hasPermission("attribute", "read")) {
    return <p>شما دسترسی مشاهده خصوصیات را ندارید.</p>;
  }

  return (
    <div dir="rtl" className="p-4">
      <div className="flex justify-end items-center mb-4 ">
        {hasPermission("attribute", "create") && (
          <Button
            onClick={() => {
              setSelectedAttribute(null);
              setOpenForm(true);
            }}
          >
            افزودن خصوصیت
          </Button>
        )}
      </div>

      <AttributeFilters onFilterChange={handleFilterChange} />

      {loading ? (
        <p>در حال بارگذاری...</p>
      ) : (
        <>
          <AttributeTable
            attributes={attributes}
            onEdit={(attr) => {
              if (hasPermission("attribute", "update")) {
                router.push(`/admin/product-attributes/${attr.id}`);
              }
            }}
            onRequestDelete={(attr) => {
              if (hasPermission("attribute", "delete")) {
                setSelectedAttribute(attr);
                setDeleteDialogOpen(true);
              }
            }}
          />
          {totalPages > 1 && (
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
          )}
        </>
      )}

      {openForm && (hasPermission("attribute", "create") || hasPermission("attribute", "update")) && (
        <AttributeForm
          attribute={selectedAttribute}
          onClose={() => {
            setOpenForm(false);
            fetchData(currentPage, filters);
          }}
        />
      )}

      {deleteDialogOpen && selectedAttribute && hasPermission("attribute", "delete") && (
        <DeleteAttributeModal
          attribute={selectedAttribute}
          onCancel={() => setDeleteDialogOpen(false)}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
}
