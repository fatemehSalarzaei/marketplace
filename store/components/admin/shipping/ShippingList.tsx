"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  getShippingMethods,
  deleteShippingMethod,
} from "@/services/admin/shipping/shippingService";
import ShippingTable from "./ShippingTable";
import DeleteShippingModal from "./DeleteShippingModal";
import ShippingFilters from "./ShippingFilters";

export default function ShippingList() {
  const [methods, setMethods] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selected, setSelected] = useState(null);
  const router = useRouter();
  const [totalCount, setTotalCount] = useState(0);
  const [filters, setFilters] = useState({ search: "", is_active: "" });

  const fetchData = useCallback(
    async (page = 1, activeFilters = filters) => {
      setLoading(true);
      try {
        const data = await getShippingMethods({ page, ...activeFilters });
        setTotalCount(data.count || 0);
        setTotalPages(Math.ceil((data.count || 1) / 10));
        setMethods(data.results || []);
      } catch (error) {
        console.error("خطا در دریافت روش‌های ارسال", error);
      } finally {
        setLoading(false);
      }
    },
    [filters]
  );

  useEffect(() => {
    fetchData(currentPage, filters);
  }, [currentPage, filters, fetchData]);

  const handleDelete = async () => {
    if (selected) {
      await deleteShippingMethod(selected.id);
      setSelected(null);
      fetchData(currentPage, filters);
    }
  };

  // مهم: استفاده از useCallback برای جلوگیری از تغییر رفرنس تابع
  const handleFilterChange = useCallback(
    (newFilters) => {
      setFilters(newFilters);
      setCurrentPage(1);
    },
    []
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">روش‌های ارسال</h1>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={() => router.push("/admin/shipping-methods/create")}
        >
          ایجاد روش جدید
        </button>
      </div>

      <ShippingFilters onFilterChange={handleFilterChange} />

      {loading ? (
        <p>در حال بارگذاری...</p>
      ) : (
        <ShippingTable
          methods={methods}
          page={currentPage}
          totalCount={totalCount}
          onPageChange={setCurrentPage}
          onRequestDelete={(id) =>
            setSelected(methods.find((m) => m.id === id) || null)
          }
        />
      )}

      {selected && (
        <DeleteShippingModal
          method={selected}
          onCancel={() => setSelected(null)}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
}
