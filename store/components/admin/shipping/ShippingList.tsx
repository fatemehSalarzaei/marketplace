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
import { useAuth } from "@/context/AuthContext"; // اضافه شد

export default function ShippingList() {
  const { hasPermission } = useAuth(); // استفاده از هوک
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
      if (!hasPermission("shippingmethod", "read")) return; // بررسی مجوز خواندن
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
    [filters, hasPermission]
  );

  useEffect(() => {
    fetchData(currentPage, filters);
  }, [currentPage, filters, fetchData]);

  const handleDelete = async () => {
    if (!hasPermission("shippingmethod", "delete")) return; // بررسی مجوز حذف
    if (selected) {
      await deleteShippingMethod(selected.id);
      setSelected(null);
      fetchData(currentPage, filters);
    }
  };

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
        {hasPermission("shippingmethod", "create") && ( // بررسی مجوز ایجاد
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded"
            onClick={() => router.push("/admin/shipping-methods/create")}
          >
            ایجاد روش جدید
          </button>
        )}
      </div>

      {hasPermission("shippingmethod", "read") ? (
        <>
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
        </>
      ) : (
        <p className="text-center py-10 text-red-600">
          دسترسی به این بخش مجاز نیست.
        </p>
      )}
    </div>
  );
}
