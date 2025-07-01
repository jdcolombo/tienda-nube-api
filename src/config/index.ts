export const config = {
  // Configuración de la API de Tienda Nube
  tiendaNube: {
    storeId: import.meta.env.TIENDA_NUBE_STORE_ID,
    accessToken: import.meta.env.TIENDA_NUBE_ACCESS_TOKEN,
    userAgent: import.meta.env.TIENDA_NUBE_USER_AGENT,
    baseUrl:
      import.meta.env.TIENDA_NUBE_BASE_URL ||
      "https://api.tiendanube.com/2025-03",
  },

  // Configuración de la aplicación
  app: {
    title: "Tienda Test",
    subtitle: "Descubre nuestra colección de productos",
    productsPerPage: 20,
  },
};

// Validar configuración
export function validateConfig() {
  const errors: string[] = [];

  if (!config.tiendaNube.storeId) {
    errors.push("TIENDA_NUBE_STORE_ID no está configurado");
  }

  if (!config.tiendaNube.accessToken) {
    errors.push("TIENDA_NUBE_ACCESS_TOKEN no está configurado");
  }

  if (!config.tiendaNube.userAgent) {
    errors.push("TIENDA_NUBE_USER_AGENT no está configurado");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}
