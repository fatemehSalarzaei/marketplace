"use client";
import React from 'react';

interface DeleteDialogProps {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteDialog: React.FC<DeleteDialogProps> = ({ title, message, onConfirm, onCancel }) => {
  return (
    <div style={{ background: '#fff', padding: 20, border: '1px solid #ccc' }}>
      <h3>{title}</h3>
      <p>{message}</p>
      <button onClick={onConfirm}>بله</button>
      <button onClick={onCancel}>خیر</button>
    </div>
  );
};

export default DeleteDialog;
