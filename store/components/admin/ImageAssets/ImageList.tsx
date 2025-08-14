'use client';

import React, { useEffect, useState, useRef } from 'react';
import { ImageAsset, ImageAssetPaginatedResponse } from '@/types/admin/media/imageAsset';
import { getImages } from '@/services/admin/imageAsset/imageAssetService';
import AddImageDialog from './AddImageDialog';
import { useAuth } from '@/context/AuthContext';

const ImageList = () => {
  const { hasPermission, loadingPermissions } = useAuth();
  const [images, setImages] = useState<ImageAsset[]>([]);
  const [loading, setLoading] = useState(false);
  const [showAddDialog, setShowAddDialog] = useState(false);

  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const fetchImages = async (isNewSearch = false) => {
    if (loading) return;
    setLoading(true);

    try {
      const data: ImageAssetPaginatedResponse = await getImages({
        search,
        page,
        pageSize: 12,
      });

      if (isNewSearch) {
        setImages(data.results);
      } else {
        setImages((prev) => [...prev, ...data.results]);
      }

      setHasNextPage(data.results.length > 0);
    } finally {
      setLoading(false);
    }
  };

  // بارگذاری داده‌ها فقط در صورت داشتن مجوز read
  useEffect(() => {
    if (hasPermission('imageasset', 'read')) {
      setPage(1);
      fetchImages(true);
    }
  }, [loadingPermissions, search]);

  useEffect(() => {
    if (page > 1 && hasPermission('imageasset', 'read')) fetchImages();
  }, [page]);

  // Infinite Scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || loading || !hasNextPage) return;

      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
      if (scrollTop + clientHeight >= scrollHeight - 100) {
        setPage((prev) => prev + 1);
      }
    };

    const container = containerRef.current;
    if (container) container.addEventListener('scroll', handleScroll);
    return () => {
      if (container) container.removeEventListener('scroll', handleScroll);
    };
  }, [loading, hasNextPage]);

  if (!hasPermission('imageasset', 'read')) {
    return <p className="text-center text-red-600 mt-10">شما دسترسی لازم برای مشاهده تصاویر را ندارید.</p>;
  }

  return (
    <div style={{ padding: '24px' }}>
      {/* Header: Title & Add Button */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px',
        }}
      >
        <h1 style={{ margin: 0 }}>مدیریت تصاویر</h1>
        {hasPermission('imageasset', 'create') && (
          <button
            onClick={() => setShowAddDialog(true)}
            style={{
              backgroundColor: '#007bff',
              color: '#fff',
              padding: '8px 16px',
              borderRadius: '6px',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            افزودن تصویر جدید
          </button>
        )}
      </div>

      {/* Search Input */}
      <div style={{ marginBottom: 16 }}>
        <input
          type="text"
          placeholder="جستجوی تصویر..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: '6px',
            border: '1px solid #ccc',
            fontSize: '1rem',
          }}
        />
      </div>

      {/* Scrollable Image List */}
      <div
        ref={containerRef}
        style={{
          maxHeight: '70vh',
          overflowY: 'auto',
          paddingRight: '8px',
        }}
      >
        {images.length === 0 && !loading ? (
          <p>هیچ تصویری یافت نشد.</p>
        ) : (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
            {images.map((img) => (
              <div
                key={img.id}
                style={{
                  border: '1px solid #ccc',
                  padding: 8,
                  width: 200,
                  borderRadius: 6,
                  boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
                }}
              >
                <img
                  src={img.image}
                  alt={img.title}
                  style={{
                    maxWidth: '100%',
                    height: '150px',
                    objectFit: 'cover',
                    marginBottom: 8,
                    borderRadius: 4,
                  }}
                />
                <h3 style={{ fontSize: '1rem', marginBottom: 4 }}>{img.title}</h3>
              </div>
            ))}
          </div>
        )}
        {loading && <p style={{ marginTop: 16 }}>در حال بارگذاری...</p>}
      </div>

      {showAddDialog && hasPermission('imageasset', 'create') && (
        <AddImageDialog
          onClose={() => {
            setShowAddDialog(false);
            setPage(1);
            fetchImages(true);
          }}
        />
      )}
    </div>
  );
};

export default ImageList;
