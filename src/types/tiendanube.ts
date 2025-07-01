// Tipos para la API de Tienda Nube

export interface ProductImage {
  id: number;
  product_id: number;
  src: string;
  position: number;
  alt: string | null;
  created_at: string;
  updated_at: string;
}

export interface ProductVariant {
  id: number;
  product_id: number;
  position: number;
  price: string;
  compare_at_price?: string;
  promotional_price?: string;
  stock_management: boolean;
  stock: number | null;
  weight: string;
  width: string;
  height: string;
  depth: string;
  sku: string;
  values: Array<{
    [key: string]: string;
  }>;
  barcode: string;
  mpn: string;
  age_group: string;
  gender: string;
  created_at: string;
  updated_at: string;
}

export interface ProductAttributes {
  [key: string]: string;
}

export interface Product {
  id: number;
  name:
    | {
        es?: string;
        pt?: string;
        en?: string;
      }
    | string;
  description:
    | {
        es?: string;
        pt?: string;
        en?: string;
      }
    | string;
  handle:
    | {
        es?: string;
        pt?: string;
        en?: string;
      }
    | string;
  attributes: ProductAttributes[];
  published: boolean;
  free_shipping: boolean;
  requires_shipping: boolean;
  canonical_url: string;
  video_url: string;
  seo_title:
    | {
        es?: string;
        pt?: string;
        en?: string;
      }
    | string;
  seo_description:
    | {
        es?: string;
        pt?: string;
        en?: string;
      }
    | string;
  brand: string;
  created_at: string;
  updated_at: string;
  variants: ProductVariant[];
  tags: string;
  images: ProductImage[];
}

export interface ProductsApiResponse {
  products?: Product[];
  // La respuesta puede variar según la versión de la API
}

export interface TiendaNubeApiConfig {
  storeId: string;
  accessToken: string;
  userAgent: string;
  baseUrl?: string;
}

export interface ApiError {
  message: string;
  status: number;
  details?: any;
  headers?: Record<string, string>;
}

// Tipos para el carrito de compras
export interface CartItem {
  id: string;
  productId: number;
  variantId: number;
  name: string;
  image?: string;
  price: number;
  comparePrice?: number;
  quantity: number;
  variant: ProductVariant;
}

export interface Cart {
  items: CartItem[];
  total: number;
  itemCount: number;
}

// Tipos para el formulario de compra
export interface CheckoutForm {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  notes?: string;
}
