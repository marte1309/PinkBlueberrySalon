import { apiService } from './api';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  salePrice?: number;
  image: string;
  images: string[];
  category: 'hair-care' | 'styling' | 'color' | 'accessories';
  brand: string;
  inStock: boolean;
  stockQuantity: number;
  rating: number;
  reviewCount: number;
  ingredients?: string[];
  features: string[];
  usage?: string;
  tags: string[];
}

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface Order {
  id: string;
  customerId: string;
  items: (CartItem & { product: Product })[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  trackingNumber?: string;
  createdAt: string;
  updatedAt: string;
}

class ProductService {
  async getProducts(
    category?: string,
    brand?: string,
    minPrice?: number,
    maxPrice?: number,
    inStock?: boolean
  ): Promise<Product[]> {
    const params = new URLSearchParams();
    if (category) params.append('category', category);
    if (brand) params.append('brand', brand);
    if (minPrice) params.append('minPrice', minPrice.toString());
    if (maxPrice) params.append('maxPrice', maxPrice.toString());
    if (inStock !== undefined) params.append('inStock', inStock.toString());

    const query = params.toString();
    return apiService.get<Product[]>(`/products${query ? `?${query}` : ''}`);
  }

  async getProductById(id: string): Promise<Product> {
    return apiService.get<Product>(`/products/${id}`);
  }

  async getFeaturedProducts(): Promise<Product[]> {
    return apiService.get<Product[]>('/products/featured');
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return apiService.get<Product[]>(`/products/category/${category}`);
  }

  async searchProducts(query: string): Promise<Product[]> {
    return apiService.get<Product[]>(`/products/search?q=${encodeURIComponent(query)}`);
  }

  async getRecommendedProducts(productId?: string): Promise<Product[]> {
    const endpoint = productId 
      ? `/products/${productId}/recommendations`
      : '/products/recommended';
    return apiService.get<Product[]>(endpoint);
  }

  async createOrder(orderData: {
    items: CartItem[];
    shippingAddress: Order['shippingAddress'];
  }): Promise<Order> {
    return apiService.post<Order>('/orders', orderData);
  }

  async getOrders(customerId?: string): Promise<Order[]> {
    const endpoint = customerId 
      ? `/orders?customerId=${customerId}`
      : '/orders';
    return apiService.get<Order[]>(endpoint);
  }

  async getOrderById(id: string): Promise<Order> {
    return apiService.get<Order>(`/orders/${id}`);
  }

  async updateOrderStatus(id: string, status: Order['status']): Promise<Order> {
    return apiService.put<Order>(`/orders/${id}/status`, { status });
  }

  async trackOrder(id: string): Promise<{ 
    status: Order['status']; 
    trackingNumber?: string;
    updates: { date: string; status: string; location: string; }[];
  }> {
    return apiService.get(`/orders/${id}/tracking`);
  }
}

export const productService = new ProductService();