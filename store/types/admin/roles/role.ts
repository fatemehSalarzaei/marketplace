export interface ModelPermission {
  id?: number;
  model_id: number;
  model: {
    id: number;
    name: string;
    code: string;
  };
  can_create: boolean;
  can_read: boolean;
  can_update: boolean;
  can_delete: boolean;
}

export interface Role {
  id?: number;
  name: string;
  description: string;
  model_permissions: ModelPermission[];
}
