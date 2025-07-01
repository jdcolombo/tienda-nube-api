# 🧪 Test del Carrito de Compras - Guía Rápida

## ✅ Pasos para Probar el Carrito Completo

### 1. 🏠 Página Principal

- **URL**: http://localhost:4324/
- **Probar**:
  - ✅ Ver productos en grilla
  - ✅ Navegación responsive
  - ✅ Contador de carrito (debe mostrar 0)

### 2. 🔍 Detalle de Producto

- **URL**: http://localhost:4324/products/15324601
- **Probar**:
  - ✅ Cambiar cantidad con botones +/-
  - ✅ Hacer clic en "Agregar al carrito"
  - ✅ Ver notificación de confirmación
  - ✅ Verificar que el contador en la navegación se actualice

### 3. 🛒 Carrito de Compras

- **URL**: http://localhost:4324/cart
- **Probar**:
  - ✅ Ver productos agregados
  - ✅ Cambiar cantidades con +/-
  - ✅ Eliminar productos
  - ✅ Ver total actualizado
  - ✅ Botón de checkout (muestra alert)

### 4. 🔄 Persistencia

- **Probar**:
  - ✅ Agregar productos al carrito
  - ✅ Refrescar la página (F5)
  - ✅ Verificar que los productos siguen en el carrito
  - ✅ Cerrar y abrir nueva pestaña
  - ✅ El carrito debe mantener los productos

### 5. 📱 Responsive

- **Probar**:
  - ✅ Redimensionar ventana del navegador
  - ✅ Usar herramientas de desarrollo (F12) → Device simulation
  - ✅ Probar en móvil: navegación, carrito, detalle

## 🐛 Funciones JavaScript Disponibles Globalmente

En la consola del navegador (F12) puedes probar:

```javascript
// Ver estado actual del carrito
cartStore.getCart();

// Agregar producto manualmente
cartStore.addItem(
  15324601,
  { id: 101, price: "799999.00" },
  "Test Product",
  null,
  2
);

// Ver contador
cartStore.getCart().itemCount;

// Limpiar carrito
cartStore.clear();

// En página de detalle, probar:
addToCart();
increaseQuantity();
decreaseQuantity();
```

## 🎯 Errores Comunes Solucionados

### ❌ "addToCart is not defined"

- **Solución**: ✅ Funciones ahora son globales (`window.addToCart`)

### ❌ "cartStore is not available"

- **Solución**: ✅ Import dinámico en páginas que lo necesitan

### ❌ Contador no se actualiza

- **Solución**: ✅ Polling cada segundo + eventos de storage

### ❌ Carrito no persiste

- **Solución**: ✅ LocalStorage automático en cada cambio

## 🚀 Estado: ¡TOTALMENTE FUNCIONAL!

Todas las funcionalidades del carrito están operativas:

- ✅ Agregar productos
- ✅ Modificar cantidades
- ✅ Eliminar productos
- ✅ Persistencia cross-tab
- ✅ Navegación integrada
- ✅ UI responsive
- ✅ Manejo de errores
