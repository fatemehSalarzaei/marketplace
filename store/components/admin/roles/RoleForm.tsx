"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { modelTranslations } from "@/constants/modelTranslations";
import { createRole, updateRole } from "@/services/admin/roles/roleService";
import { getModelAccessPermissions } from "@/services/admin/roles/permissionService";

interface Permission {
  id: number;
  name: string;
  code: string;
}

interface RoleFormData {
  name: string;
  permissions: {
    [key: string]: {
      view: boolean;
      add: boolean;
      change: boolean;
      delete: boolean;
    };
  };
}

interface Props {
  initialData?: {
    name: string;
    permissions: Array<{
      model_id: number;
      can_create: boolean;
      can_read: boolean;
      can_update: boolean;
      can_delete: boolean;
      model: Permission;
    }>;
  };
  isEdit?: boolean;
  roleId?: number;
  onSuccess?: () => void;
}

export default function RoleForm({ initialData, isEdit = false, roleId, onSuccess }: Props) {
  const { hasPermission, loadingPermissions } = useAuth();
  const router = useRouter();

  const [formData, setFormData] = useState<RoleFormData>({ name: "", permissions: {} });
  const [models, setModels] = useState<Permission[]>([]);
  const [loading, setLoading] = useState(false);

  // بررسی مجوز دسترسی
  useEffect(() => {
    if (!loadingPermissions) {
      const permission = isEdit ? "update" : "create";
      if (!hasPermission("role", permission)) {
        router.push("/admin/403");
      }
    }
  }, [hasPermission, isEdit, loadingPermissions, router]);

  useEffect(() => {
    getModelAccessPermissions()
      .then((res) => {
        const filteredModels = res.data.filter((model: Permission) =>
          modelTranslations.hasOwnProperty(model.code)
        );
        setModels(filteredModels);
      })
      .catch((error) => console.error("خطا در دریافت مدل‌ها:", error));
  }, []);

  useEffect(() => {
    if (models.length === 0) return;

    const defaultPermissions = models.reduce((acc: any, model: Permission) => {
      acc[model.code] = { view: false, add: false, change: false, delete: false };
      return acc;
    }, {});

    let permissionsFromInitial: RoleFormData["permissions"] = {};
    if (initialData?.permissions?.length > 0) {
      permissionsFromInitial = initialData.permissions.reduce((acc: any, perm) => {
        if (!perm.model?.code) return acc;
        acc[perm.model.code] = {
          view: perm.can_read,
          add: perm.can_create,
          change: perm.can_update,
          delete: perm.can_delete,
        };
        return acc;
      }, {});
    }

    setFormData({
      name: initialData?.name || "",
      permissions: { ...defaultPermissions, ...permissionsFromInitial },
    });
  }, [models, initialData]);

  const handleCheckboxChange = (modelCode: string, action: string) => {
    setFormData((prev) => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [modelCode]: { ...prev.permissions[modelCode], [action]: !prev.permissions[modelCode][action] },
      },
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    const model_permissions = Object.entries(formData.permissions).map(([modelCode, perms]) => {
      const model = models.find((m) => m.code === modelCode);
      return {
        model_id: model?.id,
        can_create: perms.add,
        can_read: perms.view,
        can_update: perms.change,
        can_delete: perms.delete,
      };
    });

    const payload = { name: formData.name, model_permissions };

    try {
      if (isEdit && roleId) {
        await updateRole(roleId, payload);
      } else {
        await createRole(payload);
      }
      onSuccess?.();
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  if (loadingPermissions) return <p>در حال بررسی مجوزها...</p>;

  return (
    <div className="space-y-6">
      <Input placeholder="نام نقش" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />

      <table className="w-full text-right border border-gray-200 text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">مدل</th>
            <th className="p-2 border">مشاهده</th>
            <th className="p-2 border">ایجاد</th>
            <th className="p-2 border">ویرایش</th>
            <th className="p-2 border">حذف</th>
          </tr>
        </thead>
        <tbody>
          {models.map((model) => (
            <tr key={model.id}>
              <td className="border p-2">{modelTranslations[model.code] || model.name}</td>
              {["view", "add", "change", "delete"].map((action) => (
                <td key={action} className="border text-center">
                  <Checkbox
                    checked={formData.permissions[model.code]?.[action] || false}
                    onCheckedChange={() => handleCheckboxChange(model.code, action)}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <Button onClick={handleSubmit} disabled={loading}>
        {loading ? (isEdit ? "در حال ویرایش..." : "در حال ارسال...") : isEdit ? "ویرایش نقش" : "ایجاد نقش"}
      </Button>
    </div>
  );
}
