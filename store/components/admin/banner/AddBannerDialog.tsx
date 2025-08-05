"use client";

import React, { useState } from "react";
import { createBanner } from "@/services/admin/banner/bannerService";

interface AddBannerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AddBannerDialog: React.FC<AddBannerDialogProps> = ({ open, onOpenChange }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageFile) {
      setError("لطفا یک تصویر انتخاب کنید.");
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("image", imageFile);

      await createBanner(formData);
      onOpenChange(false);
    } catch (err) {
      setError("خطا در ایجاد بنر.");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div
      style={{
        background: "#fff",
        padding: 20,
        border: "1px solid #ccc",
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 9999,
        width: "90%",
        maxWidth: 400,
        borderRadius: 8,
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
      }}
    >
      <h2 style={{ marginBottom: 20 }}>افزودن بنر جدید</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: "block", marginBottom: 6, fontWeight: "bold" }}>عنوان</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="عنوان بنر را وارد کنید"
            style={{
              width: "100%",
              padding: "8px 12px",
              boxSizing: "border-box",
              border: "1px solid #ccc",
              borderRadius: 4,
              backgroundColor: "#fafafa",
              outline: "none",
              transition: "border-color 0.2s",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#007bff")}
            onBlur={(e) => (e.target.style.borderColor = "#ccc")}
          />
        </div>
        {/* <div style={{ marginBottom: 16 }}>
          <label style={{ display: "block", marginBottom: 6, fontWeight: "bold" }}>توضیحات</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="توضیحات بنر را وارد کنید"
            style={{
              width: "100%",
              minHeight: 80,
              padding: "8px 12px",
              boxSizing: "border-box",
              border: "1px solid #ccc",
              borderRadius: 4,
              backgroundColor: "#fafafa",
              resize: "vertical",
              outline: "none",
              transition: "border-color 0.2s",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#007bff")}
            onBlur={(e) => (e.target.style.borderColor = "#ccc")}
          />
        </div> */}
        <div style={{ marginBottom: 20 }}>
          <label style={{ display: "block", marginBottom: 6, fontWeight: "bold" }}>انتخاب تصویر</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setImageFile(e.target.files ? e.target.files[0] : null)
            }
            required
            style={{
              width: "100%",
              padding: "6px 8px",
              boxSizing: "border-box",
              border: "1px solid #ccc",
              borderRadius: 4,
              backgroundColor: "#fafafa",
              cursor: "pointer",
              outline: "none",
              transition: "border-color 0.2s",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#007bff")}
            onBlur={(e) => (e.target.style.borderColor = "#ccc")}
          />
        </div>

        {error && <p style={{ color: "red", marginBottom: 12 }}>{error}</p>}

        <div style={{ display: "flex", justifyContent: "flex-start", gap: 12 }}>
          <button
            type="submit"
            disabled={loading}
            style={{
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              padding: "10px 16px",
              borderRadius: 5,
              cursor: loading ? "not-allowed" : "pointer",
              transition: "background-color 0.3s",
            }}
            onMouseEnter={e => {
              if(!loading) (e.currentTarget.style.backgroundColor = "#0056b3");
            }}
            onMouseLeave={e => {
              if(!loading) (e.currentTarget.style.backgroundColor = "#007bff");
            }}
          >
            {loading ? "در حال ارسال..." : "ارسال"}
          </button>
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            disabled={loading}
            style={{
              backgroundColor: "#6c757d",
              color: "#fff",
              border: "none",
              padding: "10px 16px",
              borderRadius: 5,
              cursor: loading ? "not-allowed" : "pointer",
              transition: "background-color 0.3s",
            }}
            onMouseEnter={e => {
              if(!loading) (e.currentTarget.style.backgroundColor = "#5a6268");
            }}
            onMouseLeave={e => {
              if(!loading) (e.currentTarget.style.backgroundColor = "#6c757d");
            }}
          >
            انصراف
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBannerDialog;
