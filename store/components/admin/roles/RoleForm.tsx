"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { modelTranslations } from "@/constants/modelTranslations";
import { Checkbox } from "@/components/ui/Checkbox";
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
  onSuccess?: () => void;
  isEdit?: boolean;
  roleId?: number;
}

export default function RoleForm({
  initialData,
  onSuccess,
  isEdit = false,
  roleId,
}: Props) {
  const [formData, setFormData] = useState<RoleFormData>({
    name: "",
    permissions: {},
  });

  const [models, setModels] = useState<Permission[]>([]);
  const [loading, setLoading] = useState(false);

  // دریافت مدل‌ها یکبار
  useEffect(() => {
    getModelAccessPermissions()
      .then((res) => {
        const filteredModels = res.data.filter((model: Permission) =>
          modelTranslations.hasOwnProperty(model.code)
        );
        setModels(filteredModels);
      })
      .catch((error) => {
        console.error("خطا در دریافت مدل‌ها:", error);
      });
  }, []);

  // مقداردهی اولیه فرم بر اساس مدل‌ها و داده ویرایشی
  useEffect(() => {
    if (models.length === 0) return;

    // مجوزهای پیش‌فرض با false
    const defaultPermissions = models.reduce((acc: any, model: Permission) => {
      acc[model.code] = {
        view: false,
        add: false,
        change: false,
        delete: false,
      };
      return acc;
    }, {});

    // اگر داده ویرایشی داریم، مجوزها را تبدیل به فرم مناسب می‌کنیم
    let permissionsFromInitial: RoleFormData["permissions"] = {};

    if (initialData?.permissions && initialData.permissions.length > 0) {
      // هر مجوز را بر اساس مدل مربوطه تبدیل می‌کنیم
      permissionsFromInitial = initialData.permissions.reduce(
        (acc: any, perm) => {
          const model = perm.model;
          if (!model || !model.code) return acc;
          acc[model.code] = {
            view: perm.can_read,
            add: perm.can_create,
            change: perm.can_update,
            delete: perm.can_delete,
          };
          return acc;
        },
        {}
      );
    }

    // ادغام مجوزهای اولیه با پیش‌فرض (تا همه مدل‌ها حتما باشند)
    const mergedPermissions = {
      ...defaultPermissions,
      ...permissionsFromInitial,
    };

    setFormData({
      name: initialData?.name || "",
      permissions: mergedPermissions,
    });
  }, [models, initialData]);

  const handleCheckboxChange = (modelCode: string, action: string) => {
    setFormData((prev) => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [modelCode]: {
          ...prev.permissions[modelCode],
          [action]: !prev.permissions[modelCode][action],
        },
      },
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);

    // تبدیل permissions به آرایه model_permissions برای API
    const model_permissions = Object.entries(formData.permissions).map(
      ([modelCode, perms]) => {
        const model = models.find((m) => m.code === modelCode);
        return {
          model_id: model?.id,
          can_create: perms.add,
          can_read: perms.view,
          can_update: perms.change,
          can_delete: perms.delete,
        };
      }
    );

    const payload = {
      name: formData.name,
      model_permissions,
    };

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

  return (
    <div className="space-y-6">
      <Input
        placeholder="نام نقش"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />

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
              <td className="border p-2">
                {modelTranslations[model.code] || model.name}
              </td>
              {["view", "add", "change", "delete"].map((action) => (
                <td key={action} className="border text-center">
                  <Checkbox
                    checked={
                      formData.permissions[model.code]?.[action] || false
                    }
                    onCheckedChange={() =>
                      handleCheckboxChange(model.code, action)
                    }
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <Button onClick={handleSubmit} disabled={loading}>
        {loading
          ? isEdit
            ? "در حال ویرایش..."
            : "در حال ارسال..."
          : isEdit
          ? "ویرایش نقش"
          : "ایجاد نقش"}
      </Button>
    </div>
  );
}
