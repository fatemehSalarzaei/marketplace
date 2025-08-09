"use client";

import { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { sendTicketMessage } from "@/services/support/ticketDetailService";

interface Props {
  ticketId: number;
  onMessageSent: () => void;
}

export default function TicketMessageForm({ ticketId, onMessageSent }: Props) {
  const [message, setMessage] = useState("");
  const [attachment, setAttachment] = useState<File | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!message.trim()) return;
    setLoading(true);
    try {
      await sendTicketMessage({ ticket: ticketId, message, attachment });
      setMessage("");
      setAttachment(undefined);
      onMessageSent();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md mt-6">
      <h3 className="text-lg font-bold mb-4">ارسال پیام</h3>
      <Editor
        apiKey="dc9gjuwjvvsyo64h1jo64n90l8w9bnzwyq03z1ae2r7aysn2"
        value={message}
        init={{
          height: 220,
          menubar: false,
          directionality: "rtl",
          plugins: ["link", "lists", "image", "code"],
          toolbar:
            "undo redo | bold italic underline | alignright aligncenter alignleft alignjustify | bullist numlist | link image | code",
          content_style: "body { font-family: Vazir, Tahoma, sans-serif; font-size:14px; direction: rtl; }",
          skin: "oxide",
          content_css: "default",
        }}
        onEditorChange={(content) => setMessage(content)}
      />
      <input
        type="file"
        className="mt-4"
        onChange={(e) => setAttachment(e.target.files?.[0])}
      />
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="mt-4 px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50"
      >
        {loading ? "در حال ارسال..." : "ارسال"}
      </button>
    </div>
  );
}
