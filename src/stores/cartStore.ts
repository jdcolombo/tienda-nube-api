/**
 * Store para manejar el estado del carrito de compras
 * Usando localStorage para persistencia entre sesiones
 */

import type { Cart, CartItem, ProductVariant } from "../types/tiendanube";

class CartStore {
  private cart: Cart = {
    items: [],
    total: 0,
    itemCount: 0,
  };

  private storageKey = "tiendanube-cart";
  private listeners: Array<(cart: Cart) => void> = [];

  constructor() {
    if (typeof window !== "undefined") {
      this.loadFromStorage();
    }
  }

  /**
   * Cargar carrito desde localStorage
   */
  private loadFromStorage(): void {
    try {
      const stored = localStorage.getItem(this.storageKey);
      if (stored) {
        this.cart = JSON.parse(stored);
        this.calculateTotals();
      }
    } catch (error) {
      console.error("Error loading cart from storage:", error);
      this.cart = { items: [], total: 0, itemCount: 0 };
    }
  }

  /**
   * Guardar carrito en localStorage
   */
  private saveToStorage(): void {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.cart));
    } catch (error) {
      console.error("Error saving cart to storage:", error);
    }
  }

  /**
   * Calcular totales del carrito
   */
  private calculateTotals(): void {
    this.cart.itemCount = this.cart.items.reduce(
      (total, item) => total + item.quantity,
      0
    );
    this.cart.total = this.cart.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }

  /**
   * Notificar a los listeners sobre cambios
   */
  private notifyListeners(): void {
    this.listeners.forEach((listener) => listener(this.cart));
  }

  /**
   * Agregar item al carrito
   */
  addItem(
    productId: number,
    variant: ProductVariant,
    productName: string,
    productImage?: string,
    quantity: number = 1
  ): void {
    const existingItemIndex = this.cart.items.findIndex(
      (item) => item.variantId === variant.id
    );

    const price = variant.promotional_price
      ? parseFloat(variant.promotional_price)
      : parseFloat(variant.price);

    const comparePrice = variant.compare_at_price
      ? parseFloat(variant.compare_at_price)
      : undefined;

    if (existingItemIndex >= 0) {
      // Si el item ya existe, actualizar cantidad
      this.cart.items[existingItemIndex].quantity += quantity;
    } else {
      // Agregar nuevo item
      const newItem: CartItem = {
        id: `${productId}-${variant.id}`,
        productId,
        variantId: variant.id,
        name: productName,
        image: productImage,
        price,
        comparePrice,
        quantity,
        variant,
      };
      this.cart.items.push(newItem);
    }

    this.calculateTotals();
    this.saveToStorage();
    this.notifyListeners();
  }

  /**
   * Actualizar cantidad de un item
   */
  updateQuantity(variantId: number, quantity: number): void {
    const itemIndex = this.cart.items.findIndex(
      (item) => item.variantId === variantId
    );

    if (itemIndex >= 0) {
      if (quantity <= 0) {
        this.removeItem(variantId);
      } else {
        this.cart.items[itemIndex].quantity = quantity;
        this.calculateTotals();
        this.saveToStorage();
        this.notifyListeners();
      }
    }
  }

  /**
   * Remover item del carrito
   */
  removeItem(variantId: number): void {
    this.cart.items = this.cart.items.filter(
      (item) => item.variantId !== variantId
    );
    this.calculateTotals();
    this.saveToStorage();
    this.notifyListeners();
  }

  /**
   * Limpiar carrito
   */
  clear(): void {
    this.cart = { items: [], total: 0, itemCount: 0 };
    this.saveToStorage();
    this.notifyListeners();
  }

  /**
   * Obtener carrito actual
   */
  getCart(): Cart {
    return { ...this.cart };
  }

  /**
   * Obtener cantidad de items para un variant específico
   */
  getItemQuantity(variantId: number): number {
    const item = this.cart.items.find((item) => item.variantId === variantId);
    return item ? item.quantity : 0;
  }

  /**
   * Verificar si un variant está en el carrito
   */
  hasItem(variantId: number): boolean {
    return this.cart.items.some((item) => item.variantId === variantId);
  }

  /**
   * Suscribirse a cambios del carrito
   */
  subscribe(listener: (cart: Cart) => void): () => void {
    this.listeners.push(listener);

    // Retornar función para desuscribirse
    return () => {
      const index = this.listeners.indexOf(listener);
      if (index >= 0) {
        this.listeners.splice(index, 1);
      }
    };
  }
}

// Instancia global del carrito
export const cartStore = new CartStore();
