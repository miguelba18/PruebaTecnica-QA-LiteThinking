const { By } = require('selenium-webdriver');

const LOCATORS = {

  // ------------------------------------------
  // PÁGINA PRINCIPAL - BÚSQUEDA
  // ------------------------------------------
  busqueda: {
    
    campoBusqueda: By.css('input.nav-search-input'),
    botonBuscar: By.css('button.nav-search-btn'),
  },

  // ------------------------------------------
  // PÁGINA DE RESULTADOS
  // ------------------------------------------
  resultados: {
   
    contenedorResultados: By.css('.ui-search-results'),
    itemsResultado: By.css('.ui-search-result__wrapper'),
    primerResultado: By.css('.ui-search-result__wrapper:first-child a'),
    filtroNuevo: By.xpath("//div[contains(@class,'faceted-search')]//span[contains(text(),'Nuevo')]"),
    contadorResultados: By.css('.ui-search-search-result__quantity-results'),
  },

  // ------------------------------------------
  // PÁGINA DE DETALLE DEL PRODUCTO
  // ------------------------------------------
  detalle: {
  
    tituloproducto: By.css('.ui-pdp-title'),
    precioProducto: By.css('.andes-money-amount__fraction'),
    // Botón agregar al carrito
    botonAgregarCarrito: By.css('.ui-pdp-action--secondary'),
    // Botón comprar ahora
    botonComprar: By.css('.ui-pdp-action--primary'),
    // Galería de imágenes
    galeriaImagenes: By.css('.ui-pdp-gallery'),
    // Descripción del producto
    descripcion: By.css('.ui-pdp-description__content'),
  },

  // ------------------------------------------
  // CARRITO DE COMPRAS
  // ------------------------------------------
  carrito: {
    // Ícono del carrito en navbar
    iconoCarrito: By.css('.nav-cart'),
    // Contador del carrito
    contadorCarrito: By.css('.nav-cart__counter'),
    // Items dentro del carrito
    itemsCarrito: By.css('.cart-item'),
    // Botón continuar compra
    botonContinuar: By.css('.cart-buy-action button'),
    // Total del carrito
    totalCarrito: By.css('.price-tag-fraction'),
  },

};

module.exports = LOCATORS;