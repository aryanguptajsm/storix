export interface UserProfile {
  id: string;
  username: string;
  store_name: string;
  store_description?: string;
  theme?: string;
  created_at: string;
}

export interface Product {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  price?: string;
  original_price?: string;
  discount_percentage?: string;
  image_url?: string;
  platform: string;
  original_url: string;
  created_at: string;
}

export interface Click {
  id: string;
  product_id: string;
  user_id?: string;
  ip_address?: string;
  user_agent?: string;
  referrer?: string;
  created_at: string;
}
