import type {
  Product,
  TiendaNubeApiConfig,
  ApiError,
} from "../types/tiendanube";

export class TiendaNubeService {
  private config: TiendaNubeApiConfig;
  private baseUrl: string;

  constructor(config: TiendaNubeApiConfig) {
    this.config = config;
    this.baseUrl = config.baseUrl || "https://api.tiendanube.com/2025-03";
  }

  /**
   * Valida que la configuración tenga los valores necesarios
   */
  private validateConfig(): void {
    if (!this.config.storeId) {
      throw new Error(
        "Store ID no está configurado. Configura TIENDA_NUBE_STORE_ID en tu archivo .env"
      );
    }

    if (!this.config.accessToken) {
      throw new Error(
        "Access Token no está configurado. Configura TIENDA_NUBE_ACCESS_TOKEN en tu archivo .env"
      );
    }

    if (!this.config.userAgent) {
      throw new Error(
        "User-Agent no está configurado. Configura TIENDA_NUBE_USER_AGENT en tu archivo .env"
      );
    }
  }

  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    // Validar configuración antes de hacer el request
    this.validateConfig();

    const url = `${this.baseUrl}/${this.config.storeId}${endpoint}`;

    const headers = {
      Authentication: `bearer ${this.config.accessToken}`,
      "User-Agent": this.config.userAgent,
      "Content-Type": "application/json",
      ...options.headers,
    };

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      if (!response.ok) {
        const errorText = await response.text();
        let errorDetails;
        try {
          errorDetails = JSON.parse(errorText);
        } catch {
          errorDetails = errorText;
        }

        const error: ApiError = {
          message: `API request failed: ${response.status} ${response.statusText}`,
          status: response.status,
          details: errorDetails,
        };

        // Proporcionar mensajes más específicos para errores comunes
        if (response.status === 401) {
          error.message =
            "Token de acceso inválido o expirado. Verifica tus credenciales.";
        } else if (response.status === 403) {
          error.message =
            "Sin permisos para acceder a este recurso. Verifica los alcances de tu aplicación.";
        } else if (response.status === 404) {
          error.message =
            "Recurso no encontrado. Verifica el Store ID y la URL.";
        } else if (response.status === 429) {
          error.message =
            "Límite de requests excedido. Espera unos segundos antes de intentar de nuevo.";
        }

        throw error;
      }

      return await response.json();
    } catch (error) {
      if (error instanceof Error && "status" in error) {
        throw error;
      }

      const apiError: ApiError = {
        message: `Network error: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
        status: 0,
        details: error,
      };
      throw apiError;
    }
  }

  async getProducts(page = 1, perPage = 50): Promise<Product[]> {
    const params = new URLSearchParams({
      page: page.toString(),
      per_page: perPage.toString(),
    });

    try {
      const response = await this.makeRequest<Product[]>(`/products?${params}`);
      // La API puede devolver directamente un array de productos o un objeto con una propiedad products
      return Array.isArray(response) ? response : [];
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  }

  async getProduct(productId: number): Promise<Product> {
    return this.makeRequest<Product>(`/products/${productId}`);
  }

  /**
   * Método para probar la conectividad con la API
   */
  async testConnection(): Promise<{
    success: boolean;
    message: string;
    storeInfo?: any;
  }> {
    try {
      this.validateConfig();

      // Intentar obtener información básica de la tienda
      const storeInfo = await this.makeRequest<any>("/");

      return {
        success: true,
        message: "Conexión exitosa con la API de Tienda Nube",
        storeInfo,
      };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : "Error desconocido",
      };
    }
  }
}
