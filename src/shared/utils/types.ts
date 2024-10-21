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
export interface Invoice {
  id: number;
  client_id: number;
  client: Client;
  details: Details;
  from_date: string;
  to_date: string;
  is_paid: boolean;
  created_at: string;
  updated_at: string;
  cost: string;
  type: string;
  invoice_number?: any;
  cost_in_string: string;
  status: string;
  final_price: number;
  balance: number;
  plan: Plan;
  discount_id: number;
  discount_value: number;
}

export interface Plan {
  id: number;
  name: string;
  cost_per_month: number;
  request_per_day: number;
  cost_per_year: Costperyear;
}

interface Costperyear {
  en: number;
  fa: string;
}

interface Details {
  plan_id: number;
  month: string;
  tax_percent: number;
  tax: number;
}
export interface Client {
  id: number;
  name: string;
  personal_access_client: boolean;
  password_access_client: boolean;
  created_at: string;
  updated_at: string;
  ip: null;
  domain: null;
  to_date: string;
  is_disabled: boolean;
  balance: number;
  plan_id: number;
  preferred_plan_id: number;
  redirect_uri: string;
  total_count: number;
  rate: number;
  logo: null;
  is_disabled_admin: boolean;
  user: User;
}

export interface User {
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
  national_number?: string;
  company?: any;
  postalcode?: any;
  telephone?: any;
  national_identity?: string;
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
  roles: any[];
  my_app?: any;
  action_areas: any[];
  action_time: any[];
}
export interface Plans {
  class: number;
  cost_per_day: number;
  cost_per_month: number;
  cost_per_year: CostPerYear;
  created_at: string;
  description: string;
  details: Details;
  id: number;
  is_disabled: boolean;
  item_order: number;
  max_projects_count: number;
  name: string;
  request_per_day: number;
  scope: any;
  updated_at: string;
  _count: number;
}
interface CostPerYear {
  en: number;
  fa: string;
}
