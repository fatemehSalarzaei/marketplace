"use client";

import { useEffect, useState } from "react";
import { getAttributeById } from "@/services/admin/attribute/attributeService";
import { Attribute } from "@/types/admin/attribute/attribute";
import EditAttributeForm from "./EditAttributeForm";
import AttributeValueEditor from "./AttributeValueEditor";
import { useParams } from "next/navigation";

const EditAttributePageContent = () => {
  const params = useParams();
  const [attribute, setAttribute] = useState<Attribute | null>(null);

  const fetchAttribute = async () => {
    const res = await getAttributeById(Number(params.id));
    setAttribute(res.data);
  };

  useEffect(() => {
    fetchAttribute();
  }, [params.id]);

  if (!attribute) return <p className="p-4">در حال بارگذاری...</p>;

  return (
    <div className="mr-10" dir="rtl">
    <h1 className="text-2xl font-bold text-right pt-4">ویرایش خصوصیت</h1>
    <div  className="max-w-2xl mx-auto space-y-6 mb-10" >
        <EditAttributeForm attribute={attribute} onSuccess={fetchAttribute} />

        {attribute.use_predefined_values && (
            <AttributeValueEditor attributeId={attribute.id} />
        )}
    </div>
     
    </div>
  );
};

export default EditAttributePageContent;