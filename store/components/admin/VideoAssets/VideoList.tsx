"use client";

import React, { useEffect, useState, useRef } from "react";
import { getVideos } from "@/services/admin/videoAsset/videoAssetService";
import { VideoAsset, VideoAssetPaginatedResponse } from "@/types/admin/videoAsset/videoAsset";
import AddVideoDialog from "./AddVideoDialog";

const VideoList = () => {
  const [videos, setVideos] = useState<VideoAsset[]>([]);
  const [loading, setLoading] = useState(false);
  const [showAddDialog, setShowAddDialog] = useState(false);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const fetchVideos = async (isNewSearch = false) => {
    if (loading) return;
    setLoading(true);

    try {
      const data: VideoAssetPaginatedResponse = await getVideos({
        search,
        page,
        pageSize: 12,
      });

      if (isNewSearch) {
        setVideos(data.results);
      } else {
        setVideos((prev) => [...prev, ...data.results]);
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
      fetchVideos(true);
    }, 500);
  }, [search]);

  useEffect(() => {
    if (page > 1) fetchVideos();
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
    if (container) container.addEventListener("scroll", handleScroll);
    return () => {
      if (container) container.removeEventListener("scroll", handleScroll);
    };
  }, [loading, hasNextPage]);

  return (
    <div style={{ padding: 24 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 24,
        }}
      >
        <h1>مدیریت ویدیوها</h1>
        <button
          onClick={() => setShowAddDialog(true)}
          style={{
            backgroundColor: "#1976d2",
            color: "#fff",
            border: "none",
            padding: "8px 16px",
            borderRadius: 4,
            cursor: "pointer",
          }}
        >
          افزودن ویدیو جدید
        </button>
      </div>

      {/* Search Input */}
      <div style={{ marginBottom: 16 }}>
        <input
          type="text"
          placeholder="جستجوی ویدیو..."
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

      {/* Scrollable Video List */}
      <div
        ref={containerRef}
        style={{
          maxHeight: "70vh",
          overflowY: "auto",
        }}
      >
        {videos.length === 0 && !loading && (
          <p style={{ textAlign: "center", marginTop: 50, color: "#888" }}>
            هیچ ویدیویی برای نمایش وجود ندارد.
          </p>
        )}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: "16px",
          }}
        >
          {videos.map((video) => (
            <div
              key={video.id}
              style={{
                border: "1px solid #ccc",
                borderRadius: 8,
                padding: 8,
                background: "#f9f9f9",
              }}
            >
              <video
                src={video.video}
                controls
                style={{ width: "100%", height: 150, objectFit: "cover", borderRadius: 4 }}
              />
              <h3 style={{ fontSize: 16, marginTop: 8 }}>{video.title}</h3>
              <p style={{ fontSize: 14, color: "#555" }}>{video.short_description}</p>
            </div>
          ))}
        </div>

        {loading && <p style={{ marginTop: 16 }}>در حال بارگذاری...</p>}
      </div>

      {showAddDialog && (
        <AddVideoDialog
          onClose={() => {
            setShowAddDialog(false);
            setPage(1);
            fetchVideos(true);
          }}
        />
      )}
    </div>
  );
};

export default VideoList;
