"use client";

import React, { useState } from 'react';
import { addImage } from '@/services/admin/imageAsset/imageAssetService';

interface AddImageDialogProps {
  onClose: () => void;
}

const AddImageDialog: React.FC<AddImageDialogProps> = ({ onClose }) => {
  const [title, setTitle] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [longDescription, setLongDescription] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageFile) {
      setError('لطفا یک تصویر انتخاب کنید.');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('short_description', shortDescription);
    formData.append('long_description', longDescription);
    formData.append('image', imageFile);

    setLoading(true);
    setError(null);
    try {
      await addImage(formData);
      onClose();
    } catch (err) {
      setError('خطا در بارگذاری تصویر.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: '#fff', padding: 20, border: '1px solid #ccc' }}>
      <h2>افزودن تصویر جدید</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>عنوان</label>
          <input value={title} onChange={e => setTitle(e.target.value)} required />
        </div>
        <div>
          <label>توضیح کوتاه</label>
          <input value={shortDescription} onChange={e => setShortDescription(e.target.value)} />
        </div>
        <div>
          <label>توضیح بلند</label>
          <textarea value={longDescription} onChange={e => setLongDescription(e.target.value)} />
        </div>
        <div>
          <label>انتخاب تصویر</label>
          <input type="file" accept="image/*" onChange={e => setImageFile(e.target.files ? e.target.files[0] : null)} required />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit" disabled={loading}>{loading ? 'در حال ارسال...' : 'ارسال'}</button>
        <button type="button" onClick={onClose} disabled={loading}>انصراف</button>
      </form>
    </div>
  );
};

export default AddImageDialog;
