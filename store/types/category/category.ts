export interface CategoryBreadcrumb {
  id: number;
  name: string;
  slug: string;
  parent: CategoryBreadcrumb | null;
}
