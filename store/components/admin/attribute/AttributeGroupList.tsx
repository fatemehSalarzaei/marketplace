"use client";

import { useEffect, useState } from "react";
import { AttributeGroup, Attribute } from "@/types/admin/attribute/attribute";
import {
  getAttributeGroups,
  getAttributes,
  deleteAttributeGroup,
} from "@/services/admin/attribute/attributeService";
import { Button } from "@/components/ui/Button";
import AttributeGroupForm from "./AttributeGroupForm";
import AttributeGroupTable from "./AttributeGroupTable";
import DeleteAttributeGroupModal from "./DeleteAttributeGroupModal";
import AttributeFilters from "./AttributeFilters";  // فقط این خط اضافه می‌شود

export default function AttributeGroupList() {
  const [groups, setGroups] = useState<AttributeGroup[]>([]);
  const [attributes, setAttributes] = useState<Attribute[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<AttributeGroup | null>(null);
  const [openForm, setOpenForm] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<{ search?: string }>({});
  const perPage = 10;

  const fetchGroups = async (page = 1, activeFilters = filters) => {
    const res = await getAttributeGroups(page, activeFilters.search);
    setGroups(res.data.results);
    setTotalCount(res.data.count);
  };

  const fetchAttributes = async () => {
    const res = await getAttributes();
    setAttributes(res.data.results);
  };

  useEffect(() => {
    fetchGroups(currentPage, filters);
    fetchAttributes();
  }, [currentPage, filters]);

  const handleDelete = async () => {
    if (!selectedGroup) return;
    await deleteAttributeGroup(selectedGroup.id);
    setDeleteDialogOpen(false);
    setSelectedGroup(null);
    fetchGroups(currentPage, filters);
  };

  const handleFilterChange = (newFilters: { search?: string }) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(totalCount / perPage);

  return (
    <div dir="rtl" className="p-4 space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">گروه‌های خصوصیات</h1>
        <Button
          onClick={() => {
            setSelectedGroup(null);
            setOpenForm(true);
          }}
        >
          افزودن گروه
        </Button>
      </div>

      {/* اینجا فقط از کامپوننت فیلتر استفاده می‌کنیم */}
      <AttributeFilters onFilterChange={handleFilterChange} />

      <AttributeGroupTable
        groups={groups}
        onEdit={(group) => {
          setSelectedGroup(group);
          setOpenForm(true);
        }}
        onDelete={(group) => {
          setSelectedGroup(group);
          setDeleteDialogOpen(true);
        }}
      />

      {totalPages > 1 && (
        <div className="flex gap-2 justify-center mt-4">
          {Array.from({ length: totalPages }).map((_, idx) => {
            const pageNum = idx + 1;
            return (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={`px-3 py-1 border rounded ${
                  pageNum === currentPage ? "bg-blue-600 text-white" : "bg-white"
                }`}
              >
                {pageNum}
              </button>
            );
          })}
        </div>
      )}

      <AttributeGroupForm
        open={openForm}
        onOpenChange={(open) => {
          setOpenForm(open);
          if (!open) {
            setSelectedGroup(null);
            fetchGroups(currentPage, filters);
          }
        }}
        editData={selectedGroup}
        onSuccess={() => {
          fetchGroups(currentPage, filters);
        }}
      />

      {deleteDialogOpen && selectedGroup && (
        <DeleteAttributeGroupModal
          group={selectedGroup}
          open={deleteDialogOpen}
          onClose={() => setDeleteDialogOpen(false)}
          onDeleted={handleDelete}
        />
      )}
    </div>
  );
}
