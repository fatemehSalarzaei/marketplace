'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import ElementForm from './ElementForm';
import { Element } from '@/types/pageBuilder/pageBuilder';
import { createElement } from '@/services/admin/pageBuilder/pageBuilderService';

export default function ElementCreate() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(data: Partial<Element>) {
    setLoading(true);
    setError(null);
    try {
      await createElement(data);
      router.push('/admin/page-builder/elements');
    } catch (err: any) {
      setError(err.message || 'خطا');
      setLoading(false);
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>افزودن المان جدید</h1>

      {error && <div style={{ color: 'red', marginBottom: 10 }}>{error}</div>}

      <ElementForm onSubmit={handleSubmit} />

      {loading && <div>در حال ذخیره...</div>}
    </div>
  );
}
