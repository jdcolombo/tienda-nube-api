# Tienda Nube Products - Landing Page con Carrito

Una landing page moderna desarrollada con **Astro.js** y **TypeScript** que muestra productos de la API pública de Tienda Nube, incluyendo funcionalidades completas de carrito de compras y detalle de productos.

## 🚀 Características

- ✅ **Astro.js** con TypeScript para máximo rendimiento
- ✅ **Integración completa** con la API de Tienda Nube (versión 2025-03)
- ✅ **Diseño responsive** y moderno
- ✅ **Modo demo** con productos de ejemplo
- ✅ **Navegación intuitiva** con contador de carrito en tiempo real
- ✅ **Página de detalle** de productos con selector de cantidad
- ✅ **Carrito de compras** funcional con gestión de cantidades
- ✅ **Persistencia del carrito** en localStorage
- ✅ **Manejo de errores** robusto
- ✅ **ISR (Incremental Static Regeneration)** para auto-actualización
- ✅ **Optimización SEO** automática
- ✅ **Accesibilidad** implementada
- ✅ **Carga rápida** y performance optimizado

## 🛒 Funcionalidades del Carrito

- **Navegación global**: Barra de navegación con enlace al carrito y contador de productos
- **Detalle de producto**: Página individual para cada producto con selector de cantidad
- **Agregar al carrito**: Botón para añadir productos con cantidad seleccionada
- **Gestión del carrito**: Editar cantidades, eliminar productos y ver resumen
- **Persistencia**: El carrito se mantiene entre sesiones usando localStorage
- **Checkout**: Preparado para integración con pasarela de pagos de Tienda Nube

## 📋 Requisitos

- Node.js 18+
- npm o yarn
- Cuenta de desarrollador en Tienda Nube (para uso con API real)

## 🛠️ Instalación

1. **Clona o descarga** este repositorio
2. **Instala las dependencias**:

   ```bash
   npm install
   ```

3. **Configura las variables de entorno** (opcional):

   ```bash
   cp .env.example .env
   ```

   Edita el archivo `.env` con tus credenciales de Tienda Nube:

   ```env
   TIENDA_NUBE_STORE_ID=tu-store-id
   TIENDA_NUBE_ACCESS_TOKEN=tu-access-token
   TIENDA_NUBE_USER_AGENT=TuApp (tu-email@ejemplo.com)
   ```

4. **Inicia el servidor de desarrollo**:
   ```bash
   npm run dev
   ```

## 🎯 Navegación y Uso

### Página Principal

- Visualiza productos en una grilla responsive
- Haz clic en cualquier producto para ver su detalle

### Detalle de Producto

- Accede desde `/products/{id}` o haciendo clic en un producto
- Visualiza imágenes, descripción y precio
- Selecciona cantidad y agrega al carrito
- Vuelve a la página principal con el botón "Volver"

### Carrito de Compras

- Accede desde `/cart` o usando el enlace en la navegación
- Ve todos los productos agregados con sus cantidades
- Edita cantidades con los botones +/-
- Elimina productos individuales
- Ve el resumen total y procede al checkout

### Navegación Global

- **Contador del carrito**: Se actualiza automáticamente en tiempo real
- **Enlaces principales**: Productos, Carrito
- **Responsive**: Se adapta a dispositivos móviles

## 🔑 Configuración de la API de Tienda Nube

### Para usar con tu tienda real:

1. **Registrate como partner** en [Tienda Nube Partners](https://www.tiendanube.com/partners)
2. **Crea una aplicación** en el panel de partners
3. **Obtén las credenciales** de tu aplicación:

   - Store ID
   - Access Token
   - User-Agent personalizado

4. **Configura las variables** en el archivo `.env`:
   ```env
   TIENDA_NUBE_STORE_ID=123456
   TIENDA_NUBE_ACCESS_TOKEN=tu-token-de-acceso
   TIENDA_NUBE_USER_AGENT=MiApp (mi-email@ejemplo.com)
   TIENDA_NUBE_BASE_URL=https://api.tiendanube.com/2025-03
   ```

### Modo Demo (predeterminado):

Si no configuras las variables de entorno, la aplicación funcionará en modo demo con productos de ejemplo para que puedas ver la funcionalidad.

## 🏪 Usando una Tienda Demo Real de Tienda Nube

**¡Buenas noticias!** Tienda Nube proporciona **tiendas de prueba gratuitas** para desarrolladores. Sigue estos pasos para conectar tu aplicación con una tienda demo real:

### 📋 Pasos para obtener credenciales de tienda demo:

1. **Regístrate como partner** en [Tienda Nube Partners](https://www.tiendanube.com/partners)

2. **Crea una aplicación** en el panel de partners:

   - Ve a `Aplicaciones > Crear Aplicación`
   - Completa el nombre y selecciona "Para sus clientes"

3. **Configura los permisos** necesarios:

   - ✅ `read_products` (para leer productos)
   - ✅ `read_store` (para información de la tienda)

4. **Obtén tus credenciales**:

   - En "Datos Básicos" encontrarás tu `app_id` y `client_secret`
   - Selecciona tu **"tienda demo para pruebas"**

5. **Instala la aplicación** en tu tienda demo:

   - URL: `https://www.tiendanube.com/apps/{app_id}/authorize`
   - Obtendrás un código cURL temporal (válido 5 minutos)

6. **Genera el access_token**:

   ```bash
   curl -X POST "https://www.tiendanube.com/apps/authorize/token" \
   -d "client_id=tu_app_id" \
   -d "client_secret=tu_client_secret" \
   -d "code=codigo_temporal"
   ```

7. **Configura tu archivo .env**:
   ```env
   TIENDA_NUBE_STORE_ID=2093261  # user_id de la respuesta
   TIENDA_NUBE_ACCESS_TOKEN=88a2fdd17e10327ed96f4f2dc96b00bca60dfe60
   TIENDA_NUBE_USER_AGENT=MiApp (mi-email@ejemplo.com)
   ```

> **💡 Tip:** El `user_id` que recibes en la respuesta de autenticación es tu `STORE_ID`

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── Navigation.astro # Barra de navegación con carrito
│   ├── Header.astro     # Header decorativo
│   ├── ProductCard.astro # Tarjeta de producto con enlace
│   ├── ProductsGrid.astro # Grilla de productos
│   ├── ErrorMessage.astro # Componente de errores
│   └── LoadingSpinner.astro # Indicador de carga
├── layouts/             # Layouts compartidos
│   └── Layout.astro     # Layout principal del sitio
├── pages/               # Páginas de la aplicación
│   ├── index.astro      # Página principal con productos
│   ├── cart.astro       # Página del carrito de compras
│   └── products/        # Páginas dinámicas de productos
│       └── [id].astro   # Detalle de producto individual
├── stores/              # Gestión de estado
│   └── cartStore.ts     # Store del carrito con localStorage
├── services/            # Servicios de API
│   └── tiendanube.ts    # Cliente de la API de Tienda Nube
├── types/               # Definiciones de TypeScript
│   └── tiendanube.ts    # Tipos de productos, carrito, etc.
├── config/              # Configuración
│   └── index.ts         # Variables de entorno y validación
└── utils/               # Utilidades
```

## 🔧 Desarrollo y Extensión

### Agregar Nuevas Funcionalidades

**1. Checkout Real**

```typescript
// En src/services/checkout.ts
export class CheckoutService {
  async createCheckout(cartItems: CartItem[]) {
    // Implementar integración con API de checkout de Tienda Nube
  }
}
```

**2. Variantes de Producto**

```typescript
// Extender el detalle de producto para manejar múltiples variantes
// src/components/VariantSelector.astro
```

**3. Wishlist/Favoritos**

```typescript
// src/stores/wishlistStore.ts
// Similar al cartStore pero para productos favoritos
```

### Testing

```bash
# Ejecutar en modo desarrollo
npm run dev

# Testing con datos reales
# Configura .env con credenciales válidas
```

### Performance

- **ISR**: Auto-actualización cada 10 minutos en producción
- **Lazy Loading**: Imágenes y componentes cargados bajo demanda
- **Caching**: Respuestas de API cacheadas automáticamente
- **Bundle Splitting**: Código dividido automáticamente por Astro

## 🚀 Comandos Disponibles

| Comando             | Acción                                                        |
| :------------------ | :------------------------------------------------------------ |
| `npm install`       | Instala las dependencias                                      |
| `npm run dev`       | Inicia servidor de desarrollo en `localhost:4321`             |
| `npm run build`     | Construye el sitio para producción en `./dist/`               |
| `npm run preview`   | Vista previa del build local antes de deploy                  |
| `npm run astro ...` | Ejecuta comandos CLI de Astro como `astro add`, `astro check` |

## 🚀 Despliegue en Vercel (con Auto-actualización)

Este proyecto está configurado para desplegarse en Vercel con **Incremental Static Regeneration (ISR)**, lo que significa que:

✅ **Auto-actualización cada 10 minutos**: Los productos se actualizan automáticamente sin rebuilds manuales  
✅ **Performance óptima**: Páginas pre-generadas para máxima velocidad  
✅ **SEO friendly**: Contenido estático indexable por motores de búsqueda  
✅ **Costo-efectivo**: Menos llamadas a la API, más eficiencia

### 📦 Instrucciones de Despliegue:

1. **Conecta tu repositorio** a Vercel:

   ```bash
   # Opción 1: Desde Vercel Dashboard
   # Ve a vercel.com > New Project > Import tu repo de GitHub

   # Opción 2: Desde CLI
   npm i -g vercel
   vercel
   ```

2. **Configura las variables de entorno** en Vercel:

   - Ve a `Settings > Environment Variables`
   - Agrega todas las variables de tu archivo `.env`:
     ```
     TIENDA_NUBE_STORE_ID=tu-store-id
     TIENDA_NUBE_ACCESS_TOKEN=tu-access-token
     TIENDA_NUBE_USER_AGENT=MiApp (tu-email@ejemplo.com)
     ```

3. **Despliega automáticamente**:
   - Vercel detectará automáticamente que es un proyecto Astro
   - El build se ejecutará automáticamente
   - ISR se configurará automáticamente con el archivo `vercel.json`

### ⚡ Funcionamiento de la Auto-actualización:

- **Primera visita**: Se sirve la página estática pre-generada
- **Cada 10 minutos**: La página se marca como "stale"
- **Siguiente visita después de 10 min**: Se sirve la página actual + se regenera en background
- **Visitas posteriores**: Se sirve la nueva versión actualizada

### 🔧 Personalizar tiempo de actualización:

Edita el archivo `vercel.json`:

```json
{
  "functions": {
    "src/pages/index.astro": {
      "isr": {
        "expiration": 300 // Cambia a 5 minutos (300 segundos)
      }
    }
  }
}
```

### 🎯 URLs de ejemplo:

- **Producción**: `https://tu-proyecto.vercel.app`

## 📖 Recursos

- [Documentación de Astro](https://docs.astro.build)
- [API de Tienda Nube](https://dev.tiendanube.com/docs/developer-tools/nuvemshop-api)
- [Tienda Nube Partners](https://www.tiendanube.com/partners)
- [Documentación completa de la API](https://tiendanube.github.io/api-documentation/intro)

---

**Desarrollado con ❤️ usando Astro.js y la API de Tienda Nube**
