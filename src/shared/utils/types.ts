export type AccountType = "legal" | "natural";

export interface MySelf {
  id: string;
  name: string;
  email: string;
  address: string;
  username: string;
  client_id: number;
  scopes: string[];
  created_at: string;
  updated_at: string;
  mobile: string;
  is_disabled: boolean;
  image?: any;
  national_number?: any;
  company?: any;
  postalcode?: any;
  telephone?: any;
  national_identity?: any;
  financial_code?: any;
  account_type: AccountType;
  is_hardcoded: boolean;
  max_projects_count: number;
  last_login: string;
  expiration_time?: any;
  start_time?: any;
  is_mobile_verified: boolean;
  is_email_verified: boolean;
  alerts: any[];
  roles: Role[];
  my_app?: any;
  action_areas: any[];
  action_time: any[];
}
interface Role {
  id: number;
  name: string;
  scope?: string;
  title?: string;
  user_count: number;
  pivot: Pivot;
  permissions: Permission[];
}
interface Pivot {
  user_id: string;
  role_id: number;
}

interface Permission {
  id: number;
  domain?: string | string;
  action: string;
  access: string;
  subdomain?: string;
  description?: string;
  service: string;
  identifier?: any;
  title?: (null | string)[];
  pivot: Pivot2;
}

interface Pivot2 {
  role_id: number;
  permission_id: number;
}
