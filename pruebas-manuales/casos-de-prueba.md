# CASOS DE PRUEBA MANUALES - MERCADOLIBRE
## Proyecto: Prueba Técnica QA - Lite Thinking
## Tester: Miguel Bahamon
## Fecha: 10 de Febrero 2025
## Aplicación: MercadoLibre Colombia (https://www.mercadolibre.com.co)
## Evidencias: En la carpeta evidencias/pruebas-manuales/{CP001,CP002....}

---

## INFORMACIÓN DEL FLUJO
- **Flujo bajo prueba:** Búsqueda y compra de producto
- **Navegador:** Google Chrome (última versión)
- **Sistema Operativo:** macOS


---

## CASO DE PRUEBA #CP001

### Información General
- **ID del Caso:** CP001
- **Tipo de Prueba:** Funcional
- **Prioridad:** Alta
- **Módulo:** Búsqueda de productos

### Objetivo
Verificar que el usuario puede buscar un producto usando el campo de búsqueda principal y obtener resultados relevantes.

### Precondiciones
- Navegador Chrome abierto
- Acceso a internet activo
- URL de MercadoLibre cargada (https://www.mercadolibre.com.co)
- No es necesario estar autenticado

### Datos de Prueba
- Término de búsqueda: "laptop dell"

### Pasos Detallados
1. Abrir navegador Chrome
2. Navegar a https://www.mercadolibre.com.co
3. Localizar el campo de búsqueda en la parte superior de la página
4. Hacer clic en el campo de búsqueda
5. Escribir "laptop dell"
6. Presionar la tecla Enter o hacer clic en el botón de búsqueda (lupa)
7. Esperar a que cargue la página de resultados

### Resultado Esperado
- La página de resultados se carga correctamente
- Se muestran productos relacionados con "laptop dell"
- Cada producto muestra: imagen, título, precio
- El título de la página incluye el término buscado
- Se muestra el número total de resultados encontrados
- Los filtros laterales están disponibles (Nuevo/Usado, Precio, Marca, etc.)

### Resultado Obtenido
Ejecutado el 10/02/2025

Al ejecutarse la prueba se evidencia que hace la busqueda correcta del producto que fue buscado asi como mostrar su precio, imagene y caracteristicas

### Estado
[x] Aprobado  [ ] Fallido  [ ] Bloqueado

### Evidencia
- Screenshot 1: Página inicial de MercadoLibre
- Screenshot 2: Campo de búsqueda con texto ingresado
- Screenshot 3: Página de resultados cargada

### Observaciones
Fue exitoso al hacer la busqueda del producto, obtuvimos los productos similares con sus imagenes, caracteristicas y precios.

---

## CASO DE PRUEBA #CP002

### Información General
- **ID del Caso:** CP002
- **Tipo de Prueba:** Funcional
- **Prioridad:** Alta
- **Módulo:** Filtros de búsqueda

### Objetivo
Verificar que los filtros de condición del producto (Nuevo/Usado) funcionan correctamente y reducen los resultados mostrados.

### Precondiciones
- Caso CP001 ejecutado exitosamente
- Usuario en la página de resultados de búsqueda de "laptop dell"
- Resultados de búsqueda visibles

### Datos de Prueba
- Filtro a aplicar: "Nuevo"

### Pasos Detallados
1. En la página de resultados de "laptop dell"
2. Localizar el panel de filtros en el lado izquierdo
3. Buscar la sección "Condición"
4. Hacer clic en la opción "Nuevo"
5. Esperar a que se actualicen los resultados
6. Observar la URL actualizada
7. Verificar que se aplica el filtro visualmente

### Resultado Esperado
- Los resultados se actualizan automáticamente
- Solo se muestran productos en condición "Nuevo"
- El filtro "Nuevo" aparece marcado/seleccionado
- La URL incluye parámetros del filtro aplicado
- Se muestra indicador de "filtro aplicado" removible
- El contador de resultados se actualiza

### Resultado Obtenido

Ejecutado el 10/02/2025

Respondio adecuadamente al filtrar por nuevo ademas de aparecer en la url algunos cambios evidenciando que el filtro se aplico y en los resultados tambien cambiaron asi como el contador de resultados

### Estado
[x] Aprobado  [ ] Fallido  [ ] Bloqueado

### Evidencia
- Screenshot 1: Filtros antes de seleccionar
- Screenshot 2: Filtro "Nuevo" seleccionado
- Screenshot 3: Resultados filtrados

### Observaciones
Todo en orden sin ninguna novedad en este proceso

---

## CASO DE PRUEBA #CP003

### Información General
- **ID del Caso:** CP003
- **Tipo de Prueba:** Funcional
- **Prioridad:** Alta
- **Módulo:** Detalle de producto

### Objetivo
Verificar que al hacer clic en un producto se muestra correctamente la página de detalles con toda la información relevante.

### Precondiciones
- Casos CP001 y CP002 ejecutados exitosamente
- Usuario en página de resultados con filtros aplicados
- Al menos un producto visible en los resultados

### Datos de Prueba
- Seleccionar el primer producto de los resultados

### Pasos Detallados
1. En la página de resultados filtrados
2. Identificar el primer producto de la lista
3. Hacer clic sobre la imagen o título del producto
4. Esperar a que cargue la página de detalles
5. Verificar que se abre en una nueva pestaña o en la misma
6. Revisar todos los elementos de la página de detalles

### Resultado Esperado
- La página de detalles del producto carga completamente
- Se muestra:
  * Título completo del producto
  * Precio actual
  * Imágenes del producto (galería navegable)
  * Descripción detallada
  * Características técnicas
  * Información del vendedor
  * Botón "Comprar" o "Agregar al carrito"
  * Opciones de envío
  * Garantía y devolución
- Las imágenes son interactivas (zoom, carrusel)
- El breadcrumb muestra la ruta correcta

### Resultado Obtenido
Ejecutado el 10/02/2025

La página de detalles cargó correctamente en 2 segundos. Se verificaron todos los elementos esperados:
- Título: Portátil Dell Dc15250 Intel Ci5-1334u 24gb Ssd 512gb 15.6fhd Silver
- Precio: $1.869.888
- Galería con 6 imágenes, navegación funcional
- Zoom disponible y operativo
- Descripción completa y características técnicas visibles
- Información del vendedor: DATA ROKA
- Opciones de envío mostradas correctamente
- Botón "Agregar al carrito" visible y habilitado

Breadcrumb: (https://www.mercadolibre.com.co/portatil-dell-dc15250-intel-ci51334u-24gb-ssd-512gb-156fhd/up/MCOU3696522874#polycard_client=search-desktop&search_layout=grid&position=1&type=product&tracking_id=3defc0ca-669e-40ad-9766-a49a6caeb1d2&wid=MCO3436426014&sid=search)

### Estado
[X] Aprobado  [ ] Fallido  [ ] Bloqueado

### Evidencia
- Screenshot 1: Vista completa de la página de detalles
- Screenshot 2: Galería de imágenes
- Screenshot 3: Sección de descripción y características
- Screenshot 4: Información de envío y vendedor

### Observaciones
Ninguna. El producto cumple con todos los criterios de visualización esperados.




## CASO DE PRUEBA #CP004

### Información General
- **ID del Caso:** CP004
- **Tipo de Prueba:** Funcional
- **Prioridad:** Crítica
- **Módulo:** Carrito de compras

### Objetivo
Verificar que el usuario puede agregar un producto al carrito de compras correctamente.

### Precondiciones
- Caso CP003 ejecutado exitosamente
- El usuario debe estar logueado con una cuenta de mercadolibre
- Usuario en la página de detalles de un producto
- Producto disponible para compra


### Datos de Prueba
- Producto seleccionado en CP003
- Cantidad: 1 unidad

### Pasos Detallados
1. En la página de detalles del producto
2. Localizar el botón "Agregar al carrito" o "Comprar"
3. Verificar cantidad (debe estar en 1 por defecto)
4. Hacer clic en el botón "Agregar al carrito"
5. Esperar la confirmación visual
6. Observar si aparece modal o notificación
7. Hacer clic en "Ver carrito" o ícono del carrito

### Resultado Esperado
- Aparece confirmación de que el producto fue agregado
- Se muestra modal o notificación con opciones:
  * "Continuar comprando"
  * "Ir al carrito"
- El ícono del carrito muestra contador (1)
- Al hacer clic en el carrito, se muestra el producto agregado
- El producto muestra:
  * Imagen miniatura
  * Nombre
  * Precio unitario
  * Cantidad (1)
  * Subtotal
  * Opción para eliminar
  * Opción para cambiar cantidad

### Resultado Obtenido
Ejecutado el 10/02/2025

Se obtuvo la confirmacion al agregar el producto, habia opciones para seguir navegando o ir al carrito y dentro del carrito se encontraba todos los parametros necesarios sobre el producto y la opcion de comprar

### Estado
[X] Aprobado  [ ] Fallido  [ ] Bloqueado

### Evidencia
- Screenshot 1: Botón "Agregar al carrito"
- Screenshot 2: Ingresar producto sin loguearse
- Screenshot 3: Carrito con producto agregado
- Screenshot 4: Detalle del producto en el carrito

### Observaciones
Se evidencio que debe estar logueado el usuario para poder agregar productos al carrito de lo contrario no puede y le pide hacerlo pero por lo demas tiene el flujo esperado.

---

## CASO DE PRUEBA #CP005

### Información General
- **ID del Caso:** CP005
- **Tipo de Prueba:** Funcional
- **Prioridad:** Crítica
- **Módulo:** Proceso de checkout

### Objetivo
Verificar que el usuario puede iniciar el proceso de checkout y visualizar el formulario de datos de envío.

### Precondiciones
- Caso CP004 ejecutado exitosamente
- Usuario en la página del carrito
- Al menos un producto en el carrito

### Datos de Prueba
- Producto agregado en CP004

### Pasos Detallados
1. En la página del carrito de compras
2. Revisar el resumen de compra (subtotal, envío, total)
3. Localizar el botón "Continuar compra" o "Ir a pagar"
4. Hacer clic en el botón
5. Esperar redirección
6. Observar si solicita login/registro o permite como invitado

### Resultado Esperado
- El sistema muestra página de checkout
- Si está autenticado, muestra:
  * Formulario de datos de envío
  * Resumen del pedido
  * Métodos de pago disponibles
- Se mantiene el producto en el carrito
- El resumen de precios es consistente

### Resultado Obtenido
 Ejecutado el 10/02/2025

Desde el carrito, se hizo clic en "Continuar compra". El sistema redirigió correctamente a la página de checkout.

**Carrito verificado:**
- Producto: Portátil Dell Dc15250 Intel Ci5-1334u 24gb Ssd 512gb 15.6fhd Silver
- Subtotal: $1.869.888
- Envío: gratis
- Total: $1.869.888
- Cálculos correctos 

**Página de checkout:**
- URL: https://www.mercadolibre.com.co/checkout/payments?session_id=4a54ec40742b4da680739646d37a5e81&step_id=options
- Formulario de dirección de envío mostrado
- Campos presentes: Calle, Número, Ciudad, Código Postal, Departamento
- Resumen del pedido visible en panel derecho
- Producto mantenido en el resumen
- Total consistente con el carrito
- Opciones de método de envío disponibles

**Proceso detenido en el formulario de datos según instrucciones del caso de prueba.**

### Estado
[X] Aprobado  [ ] Fallido  [ ] Bloqueado


### Evidencia
- Screenshot 1: Botón "Continuar compra"
- Screenshot 2: Página de login/checkout
- Screenshot 3: Formulario de datos (si aplica)

### Observaciones
**NOTA:** No completar la compra real. Detener el proceso en el formulario de datos.
El flujo funciona correctamente. No se completó la compra real como se especificó en las precondiciones.

---

## CASO DE PRUEBA #CP006 - REGRESIÓN

### Información General
- **ID del Caso:** CP006
- **Tipo de Prueba:** Regresión
- **Prioridad:** Media
- **Módulo:** Navegación y carrito

### Objetivo
Verificar que después de agregar un producto al carrito, el usuario puede regresar a la búsqueda, el producto permanece en el carrito y puede agregar un segundo producto.

### Precondiciones
- Caso CP004 ejecutado exitosamente
- Un producto ya agregado al carrito
- Usuario puede estar en cualquier página del sitio

### Datos de Prueba
- Primer producto ya en carrito (de CP004)
- Nueva búsqueda: "mouse inalámbrico"

### Pasos Detallados
1. Con un producto ya en el carrito
2. Usar el campo de búsqueda superior
3. Buscar "mouse inalámbrico"
4. Seleccionar un producto diferente
5. Agregar el segundo producto al carrito
6. Ir al carrito
7. Verificar ambos productos

### Resultado Esperado
- La búsqueda funciona normalmente
- El primer producto permanece en el carrito
- Se puede agregar el segundo producto sin problemas
- El carrito muestra ambos productos:
  * Laptop dell (producto 1)
  * Mouse inalámbrico (producto 2)
- El contador del carrito muestra "2"
- El total se calcula correctamente (suma de ambos)
- Cada producto puede modificarse/eliminarse independientemente

### Resultado Obtenido
Ejecutado el 10/02/2025

Se verificó que el carrito persiste correctamente durante la navegación. 
Con un producto (laptop dell) ya en el carrito, se realizó una nueva búsqueda 
de "mouse inalámbrico" sin que el carrito se viera afectado. Se agregó el segundo 
producto exitosamente, el contador del carrito actualizó de 1 a 2, ambos productos 
aparecieron correctamente con imagen, nombre y precio individual. El subtotal 
reflejó la suma correcta de ambos productos y al modificar la cantidad del mouse 
a 2 unidades, el total se recalculó correctamente sin afectar el primer producto.
Cada producto mantiene sus opciones de modificación y eliminación de forma independiente.

### Estado
[X] Aprobado  [ ] Fallido  [ ] Bloqueado

### Evidencia
- Screenshot 1: Carrito con primer producto
- Screenshot 2: Nueva búsqueda realizada
- Screenshot 3: Segundo producto agregado
- Screenshot 4: Carrito con ambos productos

### Observaciones
La prueba de regresión confirma estabilidad del carrito durante la navegación 
y consistencia en los cálculos con múltiples productos.

---

 ## RESUMEN DE EJECUCIÓN

| ID    | Caso de Prueba              | Tipo       | Estado    | Defectos|
|-------|-----------------------------|------------|-----------|---------|
| CP001 | Búsqueda de productos       | Funcional  | Aprobado  |  0      |
| CP002 | Aplicar filtros             | Funcional  | Aprobado  |  0      |
| CP003 | Detalle de producto         | Funcional  | Aprobado  |  0      |
| CP004 | Agregar al carrito          | Funcional  | Aprobado  |  0      |
| CP005 | Iniciar checkout            | Funcional  | Aprobado  |  0      |
| CP006 | Regresión - Carrito múltiple| Regresión  | Aprobado  |  0      |

**Total de casos:** 6
**Aprobados:** 6
**Fallidos:** 0
**Bloqueados:** 0
**Cobertura:** 100%

---

## DEFECTOS ENCONTRADOS
No se encontro ningun defecto o bug con alguna severidad

