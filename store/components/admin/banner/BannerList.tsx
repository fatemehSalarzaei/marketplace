"use client";

import React, { useEffect, useState, useRef } from "react";
import { Banner, BannerPaginatedResponse } from "@/types/admin/banner/banner";
import { getBanners } from "@/services/admin/banner/bannerService";
import BannerCard from "./BannerCard";
import AddBannerDialog from "./AddBannerDialog";

const BannerList = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(false);
  const [showAddDialog, setShowAddDialog] = useState(false);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const fetchBanners = async (isNewSearch = false) => {
    if (loading) return;
    setLoading(true);

    try {
      const data: BannerPaginatedResponse = await getBanners({
        search,
        page,
        pageSize: 12,
      });

      if (isNewSearch) {
        setBanners(data.results);
      } else {
        setBanners((prev) => [...prev, ...data.results]);
      }

      setHasNextPage(data.results.length > 0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPage(1);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      fetchBanners(true);
    }, 500);
  }, [search]);

  useEffect(() => {
    if (page > 1) fetchBanners();
  }, [page]);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || loading || !hasNextPage) return;

      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
      if (scrollTop + clientHeight >= scrollHeight - 100) {
        setPage((prev) => prev + 1);
      }
    };

    const container = containerRef.current;
    container?.addEventListener("scroll", handleScroll);
    return () => container?.removeEventListener("scroll", handleScroll);
  }, [loading, hasNextPage]);

  return (
    <div style={{ padding: "24px" }}>
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
        }}
      >
        <h1 style={{ margin: 0 }}>مدیریت بنرها</h1>
        <button
          onClick={() => setShowAddDialog(true)}
          style={{
            backgroundColor: "#007bff",
            color: "#fff",
            padding: "8px 16px",
            borderRadius: "6px",
            border: "none",
            cursor: "pointer",
          }}
        >
          افزودن بنر جدید
        </button>
      </div>

      {/* Search */}
      <div style={{ marginBottom: 16 }}>
        <input
          type="text"
          placeholder="جستجوی بنر..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            fontSize: "1rem",
          }}
        />
      </div>

      {/* Banner List */}
      <div
        ref={containerRef}
        style={{
          maxHeight: "70vh",
          overflowY: "auto",
          overflowX: "hidden",
          paddingRight: "8px",
        }}
      >
        {banners.length === 0 && !loading ? (
          <p>هیچ بنری یافت نشد.</p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              gap: 16,
            }}
          >
            {banners.map((banner) => (
              <BannerCard key={banner.id} banner={banner} />
            ))}
          </div>
        )}
        {loading && <p style={{ marginTop: 16 }}>در حال بارگذاری...</p>}
      </div>

      {showAddDialog && (
        <AddBannerDialog
          open={showAddDialog}
          onOpenChange={(open) => {
            setShowAddDialog(open);
            if (!open) {
              setPage(1);
              fetchBanners(true);
            }
          }}
        />
      )}
    </div>
  );
};

export default BannerList;
