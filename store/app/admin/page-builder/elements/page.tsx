'use client';

import React, { useState } from 'react';
import ElementList from '@/components/admin/page-builder/elements/ElementList';
import { Element } from '@/types/pageBuilder/pageBuilder';
import { useRouter } from 'next/navigation';

export default function ElementsPage() {
  const router = useRouter();
  const [editingElement, setEditingElement] = useState<Element | null>(null);

  function handleEdit(element: Element) {
    router.push(`/admin/page-builder/elements/${element.id}`);
  }

  function handleCreateNew() {
    router.push(`/admin/page-builder/elements/new`);
  }

  return (
    <div style={{ maxWidth: 900, margin: 'auto' }}>
      <h1>مدیریت المان‌ها</h1>
      <ElementList onEdit={handleEdit} onCreateNew={handleCreateNew} />
    </div>
  );
}
