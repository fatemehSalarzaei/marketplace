export interface AttributeValue {
  id: number;
  value: string;
  attribute: number;  // اضافه شده، شناسه‌ی attribute مربوطه
}

export interface Attribute {
  id: number;
  name: string;
  slug: string;
  use_predefined_values: boolean;
  for_variant: boolean;
  values: AttributeValue[];
}

export interface AttributeGroup {
  id: number;
  name: string;
  slug: string;
  description: string;
  attributes: Attribute[];
  attribute_ids: number[];
}
