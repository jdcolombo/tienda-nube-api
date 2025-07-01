/**
 * Cliente-side cart store para manejar el carrito en el navegador
 * Funciona con localStorage para persistencia
 */

// Envolver en IIFE para evitar conflictos
(function () {
  "use strict";

  class CartStore {
    constructor() {
      this.storageKey = "tiendanube-cart";
      this.cart = {
        items: [],
        total: 0,
        itemCount: 0,
      };
      this.loadFromStorage();
    }

    /**
     * Cargar carrito desde localStorage
     */
    loadFromStorage() {
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
    saveToStorage() {
      try {
        localStorage.setItem(this.storageKey, JSON.stringify(this.cart));
      } catch (error) {
        console.error("Error saving cart to storage:", error);
      }
    }

    /**
     * Calcular totales del carrito
     */
    calculateTotals() {
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
     * Agregar item al carrito
     */
    addItem(productId, variant, productName, productImage, quantity = 1) {
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
        const newItem = {
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

      // Disparar evento personalizado
      window.dispatchEvent(
        new CustomEvent("cartUpdated", {
          detail: this.cart,
        })
      );
    }

    /**
     * Actualizar cantidad de un item
     */
    updateQuantity(variantId, quantity) {
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

          // Disparar evento personalizado
          window.dispatchEvent(
            new CustomEvent("cartUpdated", {
              detail: this.cart,
            })
          );
        }
      }
    }

    /**
     * Remover item del carrito
     */
    removeItem(variantId) {
      this.cart.items = this.cart.items.filter(
        (item) => item.variantId !== variantId
      );
      this.calculateTotals();
      this.saveToStorage();

      // Disparar evento personalizado
      window.dispatchEvent(
        new CustomEvent("cartUpdated", {
          detail: this.cart,
        })
      );
    }

    /**
     * Limpiar carrito
     */
    clear() {
      this.cart = { items: [], total: 0, itemCount: 0 };
      this.saveToStorage();

      // Disparar evento personalizado
      window.dispatchEvent(
        new CustomEvent("cartUpdated", {
          detail: this.cart,
        })
      );
    }

    /**
     * Obtener carrito actual
     */
    getCart() {
      return { ...this.cart };
    }

    /**
     * Obtener cantidad de items para un variant específico
     */
    getItemQuantity(variantId) {
      const item = this.cart.items.find((item) => item.variantId === variantId);
      return item ? item.quantity : 0;
    }

    /**
     * Verificar si un variant está en el carrito
     */
    hasItem(variantId) {
      return this.cart.items.some((item) => item.variantId === variantId);
    }
  }

  // Inicializar el cart store cuando el DOM esté listo o inmediatamente si ya está listo
  function initCartStore() {
    try {
      console.log("Inicializando cart store...");
      window.cartStore = new CartStore();
      console.log("Cart store inicializado correctamente:", window.cartStore);
    } catch (error) {
      console.error("Error inicializando cart store:", error);
    }
  }

  // Verificar si el documento ya está cargado
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initCartStore);
  } else {
    // El DOM ya está listo
    initCartStore();
  }
})();
