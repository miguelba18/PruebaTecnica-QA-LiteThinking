# ANÁLISIS DE MICROSERVICIOS - MERCADOLIBRE
## Fecha: 12/02/2025

---

## ARQUITECTURA IDENTIFICADA

MercadoLibre implementa una arquitectura de microservicios distribuida
donde cada funcionalidad es manejada por un servicio independiente.
Esto se evidenció analizando las peticiones HTTP en Chrome DevTools
durante la ejecución del flujo de búsqueda y compra.

---

## MICROSERVICIOS IDENTIFICADOS

### 1. Servicio de Búsqueda
- **Endpoint:** api.mercadolibre.com/search
- **Método:** GET
- **Responsabilidad:** Procesar búsquedas y retornar resultados
- **Formato respuesta:** JSON
- **Tiempo de respuesta observado:** ~300-800ms

### 2. Servicio de Catálogo/Productos  
- **Endpoint:** api.mercadolibre.com/items/{id}
- **Método:** GET
- **Responsabilidad:** Información detallada de productos
- **Formato respuesta:** JSON
- **Tiempo de respuesta observado:** ~200-500ms

### 3. Servicio de Imágenes (CDN)
- **Endpoint:** http2.mlstatic.com
- **Método:** GET
- **Responsabilidad:** Servir imágenes de productos optimizadas
- **Formato respuesta:** Binario (JPG/WebP)
- **Tiempo de respuesta observado:** ~100-300ms

### 4. Servicio de Usuarios/Autenticación
- **Endpoint:** api.mercadolibre.com/users
- **Método:** GET/POST
- **Responsabilidad:** Gestión de sesiones y perfiles
- **Formato respuesta:** JSON

### 5. Servicio de Tracking/Analytics
- **Endpoint:** mla-s2-p.mlstatic.com
- **Método:** POST
- **Responsabilidad:** Tracking de comportamiento del usuario
- **Formato respuesta:** 200 OK vacío

---

## COMUNICACIÓN ENTRE SERVICIOS

Durante el flujo de búsqueda se observaron las siguientes
interacciones entre servicios:

1. Usuario hace búsqueda
   → Frontend llama al Servicio de Búsqueda
   → Servicio de Búsqueda retorna IDs de productos
   → Frontend llama al Servicio de Catálogo para cada producto
   → Servicio de Imágenes sirve las fotos en paralelo
   → Servicio de Tracking registra la búsqueda

2. Usuario selecciona producto
   → Frontend llama al Servicio de Catálogo con ID específico
   → Se cargan datos del vendedor en paralelo
   → Servicio de Imágenes carga galería de fotos
   → Servicio de Tracking registra la vista

---
## CONCLUSIONES

1. La arquitectura de microservicios permite que cada servicio
   escale independientemente según la demanda
2. El CDN de imágenes responde más rápido que los servicios
   de negocio, lo cual es correcto
3. Los servicios se comunican de forma asíncrona en algunos
   casos mejorando el rendimiento percibido
4. El manejo de errores es robusto, los fallos de servicios
   secundarios no afectan la funcionalidad principal