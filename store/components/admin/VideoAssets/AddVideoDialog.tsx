"use client";

import React, { useState } from 'react';
import { addVideo } from '@/services/admin/videoAsset/videoAssetService';

interface AddVideoDialogProps {
  onClose: () => void;
}

const AddVideoDialog: React.FC<AddVideoDialogProps> = ({ onClose }) => {
  const [title, setTitle] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [longDescription, setLongDescription] = useState('');
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoFile) {
      setError('لطفاً یک فایل ویدیو انتخاب کنید.');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('short_description', shortDescription);
    formData.append('long_description', longDescription);
    formData.append('video', videoFile);

    setLoading(true);
    setError(null);
    try {
      await addVideo(formData);
      onClose();
    } catch (err) {
      setError('خطا در بارگذاری ویدیو.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        background: '#fff',
        padding: '24px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        width: '400px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
        zIndex: 1000,
      }}
    >
      <h2 style={{ marginBottom: '16px' }}>افزودن ویدیوی جدید</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '12px' }}>
          <label style={{ display: 'block', marginBottom: '4px' }}>عنوان</label>
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              outline: 'none',
            }}
            onFocus={(e) => e.currentTarget.style.border = '1px solid #007bff'}
            onBlur={(e) => e.currentTarget.style.border = '1px solid #ccc'}
          />
        </div>

        <div style={{ marginBottom: '12px' }}>
          <label style={{ display: 'block', marginBottom: '4px' }}>توضیح کوتاه</label>
          <input
            value={shortDescription}
            onChange={e => setShortDescription(e.target.value)}
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              outline: 'none',
            }}
            onFocus={(e) => e.currentTarget.style.border = '1px solid #007bff'}
            onBlur={(e) => e.currentTarget.style.border = '1px solid #ccc'}
          />
        </div>

        <div style={{ marginBottom: '12px' }}>
          <label style={{ display: 'block', marginBottom: '4px' }}>توضیح بلند</label>
          <textarea
            value={longDescription}
            onChange={e => setLongDescription(e.target.value)}
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              outline: 'none',
              resize: 'vertical',
            }}
            rows={3}
            onFocus={(e) => e.currentTarget.style.border = '1px solid #007bff'}
            onBlur={(e) => e.currentTarget.style.border = '1px solid #ccc'}
          />
        </div>

        <div style={{ marginBottom: '12px' }}>
          <label style={{ display: 'block', marginBottom: '4px' }}>انتخاب ویدیو</label>
          <input
            type="file"
            accept="video/*"
            onChange={e => setVideoFile(e.target.files ? e.target.files[0] : null)}
            required
          />
        </div>

        {error && <p style={{ color: 'red', marginBottom: '12px' }}>{error}</p>}

        <div style={{ display: 'flex', justifyContent: 'flex-start', gap: '12px' }}>
          <button
            type="submit"
            disabled={loading}
            style={{
              backgroundColor: '#28a745',
              color: '#fff',
              padding: '8px 16px',
              borderRadius: '4px',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            {loading ? 'در حال ارسال...' : 'ارسال'}
          </button>
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            style={{
              backgroundColor: '#6c757d',
              color: '#fff',
              padding: '8px 16px',
              borderRadius: '4px',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            انصراف
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddVideoDialog;
