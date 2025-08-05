// AttributeGroupTable.tsx
"use client";

import { AttributeGroup } from "@/types/admin/attribute/attributeGroup";
import { Button } from "@/components/ui/button";

interface AttributeGroupTableProps {
  groups: AttributeGroup[];
  onEdit: (group: AttributeGroup) => void;
  onDelete: (group: AttributeGroup) => void;
}

const AttributeGroupTable = ({ groups, onEdit, onDelete }: AttributeGroupTableProps) => {
  return (
    <div className="border rounded-lg overflow-hidden">
      <table className="w-full text-right">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3">شناسه</th>
            <th className="p-3">نام گروه</th>
            <th className="p-3">عملیات</th>
          </tr>
        </thead>
        <tbody>
          {groups.map((group) => (
            <tr key={group.id} className="border-t">
              <td className="p-3">{group.id}</td>
              <td className="p-3">{group.name}</td>
              <td className="p-3 space-x-2 space-x-reverse">
                <Button size="sm" onClick={() => onEdit(group)}>
                  ویرایش
                </Button>
                <Button size="sm" variant="destructive" onClick={() => onDelete(group)}>
                  حذف
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttributeGroupTable;
