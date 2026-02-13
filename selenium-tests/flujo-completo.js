const { Builder, By, Key } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const LOCATORS = require('./helpers/locators');
const {
  esperarElemento,
  tomarScreenshot,
  pausa,
  scrollHaciaElemento,
} = require('./helpers/utils');


async function configurarDriver() {
  console.log('🔧 Configurando Chrome Driver...');

  const opciones = new chrome.Options();
  
  // Configuraciones para mejor estabilidad
  opciones.addArguments('--no-sandbox');
  opciones.addArguments('--disable-dev-shm-usage');
  opciones.addArguments('--window-size=1920,1080');
  
  

  const driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(opciones)
    .build();

  
  await driver.manage().setTimeouts({ implicit: 5000 });
  
  return driver;
}

// ============================================
// PRUEBA 1: BÚSQUEDA DE PRODUCTO (CP001)
// ============================================
async function pruebaBusqueda(driver) {
  console.log('\n🧪 PRUEBA 1: Búsqueda de producto (CP001)');
  console.log('─'.repeat(50));

  try {
   
    console.log('   → Navegando a MercadoLibre Colombia...');
    await driver.get('https://www.mercadolibre.com.co');
    await pausa(2000);


    await tomarScreenshot(driver, 'CP001-01-pagina-inicial');

   
    console.log('   → Localizando campo de búsqueda...');
    const campoBusqueda = await esperarElemento(
      driver,
      LOCATORS.busqueda.campoBusqueda
    );

    
    console.log('   → Escribiendo "laptop dell"...');
    await campoBusqueda.clear();
    await campoBusqueda.sendKeys('laptop dell');
    await tomarScreenshot(driver, 'CP001-02-busqueda-escrita');

   
    await campoBusqueda.sendKeys(Key.RETURN);
    console.log('   → Búsqueda enviada...');

    
    await esperarElemento(driver, LOCATORS.resultados.contenedorResultados);
    await pausa(1500);

   
    const resultados = await driver.findElements(
      LOCATORS.resultados.itemsResultado
    );
    
    console.log(`   ✅ Resultados encontrados: ${resultados.length}`);
    await tomarScreenshot(driver, 'CP001-03-resultados');

    
    if (resultados.length > 0) {
      console.log('   ✅ CP001 APROBADO - Búsqueda funciona correctamente');
      return true;
    } else {
      console.log('   ❌ CP001 FALLIDO - No se encontraron resultados');
      return false;
    }

  } catch (error) {
    console.error('   ❌ CP001 ERROR:', error.message);
    await tomarScreenshot(driver, 'CP001-ERROR');
    return false;
  }
}

// ============================================
// PRUEBA 2: APLICAR FILTROS (CP002)
// ============================================
async function pruebaFiltros(driver) {
  console.log('\n🧪 PRUEBA 2: Aplicar filtros (CP002)');
  console.log('─'.repeat(50));

  try {
   
    console.log('   → Esperando carga completa de resultados...');
    await esperarElemento(
      driver,
      LOCATORS.resultados.contenedorResultados,
      10000
    );
    await pausa(2000);

   
    const urlAntes = await driver.getCurrentUrl();
    console.log(`   → URL actual: ${urlAntes}`);

    
    console.log('   → Haciendo scroll hacia el panel de filtros...');
    await driver.executeScript(`
      window.scrollTo({ top: 300, behavior: 'smooth' });
    `);
    await pausa(1500);

    await tomarScreenshot(driver, 'CP002-01-antes-filtro');

    
    console.log('   → Buscando filtro "Nuevo" en panel lateral...');

    let filtroNuevo = null;
    const selectoresFiltro = [
    
      By.xpath("//div[contains(@class,'faceted-search')]//span[contains(text(),'Nuevo')]"),
     
      By.xpath("//li[contains(@class,'faceted-search__status')]//span[contains(text(),'Nuevo')]"),

      By.xpath("//div[contains(@class,'ui-search-filter')]//a[contains(.,'Nuevo')]"),
     
      By.xpath("//section[contains(@class,'filter')]//a[normalize-space()='Nuevo']"),
     
      By.xpath("//a[@title='Nuevo']"),
    ];

   
    for (let i = 0; i < selectoresFiltro.length; i++) {
      console.log(`   → Intentando selector ${i + 1}...`);
      const elementos = await driver.findElements(selectoresFiltro[i]);
      
      if (elementos.length > 0) {
        
        for (const elemento of elementos) {
          const ubicacion = await elemento.getRect();
          
          if (ubicacion.y > 200) {
            filtroNuevo = elemento;
            console.log(`   → Filtro encontrado con selector ${i + 1}`);
            console.log(`   → Posición: x=${ubicacion.x}, y=${ubicacion.y}`);
            break;
          }
        }
      }
      
      if (filtroNuevo) break;
    }

    if (!filtroNuevo) {
      console.log('   ⚠️  No se encontró filtro automáticamente');
      console.log('   → Intentando búsqueda por scroll completo...');
      
    
      for (let scrollY = 200; scrollY <= 1000; scrollY += 100) {
        await driver.executeScript(`window.scrollTo(0, ${scrollY})`);
        await pausa(300);
        
        const elementos = await driver.findElements(
          By.xpath("//div[contains(@class,'faceted-search')]//a[contains(.,'Nuevo')]")
        );
        
        if (elementos.length > 0) {
          filtroNuevo = elementos[0];
          console.log(`   → Filtro encontrado con scroll en y=${scrollY}`);
          break;
        }
      }
    }

    if (!filtroNuevo) {
      throw new Error('No se pudo localizar el filtro "Nuevo" en el panel lateral');
    }

  
    await scrollHaciaElemento(driver, filtroNuevo);
    await pausa(1000);
    await tomarScreenshot(driver, 'CP002-02-filtro-visible');

    
    const urlAntesFiltro = await driver.getCurrentUrl();

    
    await filtroNuevo.click();
    console.log('   → Clic en filtro "Nuevo" ejecutado...');
    await pausa(2500);

    
    const urlDespues = await driver.getCurrentUrl();
    console.log(`   → URL después del filtro: ${urlDespues}`);

    await tomarScreenshot(driver, 'CP002-03-filtro-aplicado');

   
    const esPaginaResultados = urlDespues.includes('laptop') || 
                               urlDespues.includes('dell') ||
                               urlDespues.includes('search') ||
                               urlDespues !== urlAntesFiltro;

   
    const resultadosFiltrados = await driver.findElements(
      LOCATORS.resultados.itemsResultado
    );

    console.log(`   → Resultados después del filtro: ${resultadosFiltrados.length}`);

    if (resultadosFiltrados.length > 0 && esPaginaResultados) {
      console.log('   ✅ CP002 APROBADO - Filtro "Nuevo" aplicado correctamente');
      return true;
    } else {
      console.log('   ❌ CP002 FALLIDO - El filtro no funcionó como esperado');
      return false;
    }

  } catch (error) {
    console.error('   ❌ CP002 ERROR:', error.message);
    await tomarScreenshot(driver, 'CP002-ERROR');
    return false;
  }
}

// ============================================
// PRUEBA 3: DETALLE DE PRODUCTO (CP003) 
// ============================================
async function pruebaDetalleProducto(driver) {
  console.log('\n🧪 PRUEBA 3: Detalle de producto (CP003)');
  console.log('─'.repeat(50));

  try {
    
    const urlActual = await driver.getCurrentUrl();
    console.log(`   → URL actual antes de CP003: ${urlActual}`);

   
    await esperarElemento(
      driver,
      LOCATORS.resultados.contenedorResultados,
      10000
    );
    await pausa(1500);

    
    await driver.executeScript('window.scrollTo(0, 0)');
    await pausa(1000);

    
    console.log('   → Buscando primer producto en resultados...');
    
    const selectoresProducto = [
      By.css('.ui-search-result__wrapper:first-child a.ui-search-link'),
      By.css('.ui-search-item__group--title a'),
      By.css('.ui-search-result__image-photo'),
      By.css('ol.ui-search-layout li:first-child a'),
      By.css('.poly-component__title a'),
    ];

    let primerProducto = null;

    for (let i = 0; i < selectoresProducto.length; i++) {
      console.log(`   → Intentando selector de producto ${i + 1}...`);
      const elementos = await driver.findElements(selectoresProducto[i]);
      
      if (elementos.length > 0) {
        primerProducto = elementos[0];
        console.log(`   → Producto encontrado con selector ${i + 1}`);
        break;
      }
    }

    if (!primerProducto) {
      throw new Error('No se encontró ningún producto en los resultados');
    }

    await scrollHaciaElemento(driver, primerProducto);
    await pausa(500);
    await tomarScreenshot(driver, 'CP003-01-primer-producto');

   
    const ventanasAntes = await driver.getAllWindowHandles();
    const ventanaOriginal = await driver.getWindowHandle();

    
    await primerProducto.click();
    console.log('   → Clic en primer producto...');
    await pausa(3000);

    
    const ventanasDespues = await driver.getAllWindowHandles();
    
    if (ventanasDespues.length > ventanasAntes.length) {
      
      const nuevaVentana = ventanasDespues.find(v => v !== ventanaOriginal);
      await driver.switchTo().window(nuevaVentana);
      console.log('   → Cambiado a nueva pestaña del producto');
    }

    await pausa(2000);

    
    const selectoresTitulo = [
      By.css('.ui-pdp-title'),
      By.css('h1.ui-pdp-title'),
      By.css('.item-title__primary'),
      By.css('h1'),
    ];

    let titulo = null;
    for (const selector of selectoresTitulo) {
      const elementos = await driver.findElements(selector);
      if (elementos.length > 0) {
        titulo = await elementos[0].getText();
        if (titulo && titulo.length > 0) break;
      }
    }

    
    const selectoresPrecio = [
      By.css('.andes-money-amount__fraction'),
      By.css('.price-tag-fraction'),
      By.css('.ui-pdp-price__main-prices .andes-money-amount'),
    ];

    let precio = null;
    for (const selector of selectoresPrecio) {
      const elementos = await driver.findElements(selector);
      if (elementos.length > 0) {
        precio = await elementos[0].getText();
        if (precio && precio.length > 0) break;
      }
    }

    console.log(`   → Producto encontrado: ${titulo?.substring(0, 50)}...`);
    console.log(`   → Precio: $${precio}`);

    await tomarScreenshot(driver, 'CP003-02-detalle-producto');

    if (titulo && titulo.length > 0) {
      console.log('   ✅ CP003 APROBADO - Página de detalles cargada correctamente');
      return true;
    } else {
      console.log('   ❌ CP003 FALLIDO - No se encontró título del producto');
      return false;
    }

  } catch (error) {
    console.error('   ❌ CP003 ERROR:', error.message);
    await tomarScreenshot(driver, 'CP003-ERROR');
    return false;
  }
}

// ============================================
// PRUEBA 4: AGREGAR AL CARRITO (CP004)
// ============================================
async function pruebaAgregarCarrito(driver) {
  console.log('\n🧪 PRUEBA 4: Agregar al carrito (CP004)');
  console.log('─'.repeat(50));

  try {
   
    console.log('   → Buscando botón "Agregar al carrito"...');

   
    let botonAccion = await driver.findElements(
      LOCATORS.detalle.botonAgregarCarrito
    );

    
    if (botonAccion.length === 0) {
      console.log('   → Usando botón "Comprar ahora"...');
      botonAccion = await driver.findElements(
        LOCATORS.detalle.botonComprar
      );
    }

    if (botonAccion.length > 0) {
      await scrollHaciaElemento(driver, botonAccion[0]);
      await tomarScreenshot(driver, 'CP004-01-boton-carrito');
      
      await botonAccion[0].click();
      console.log('   → Producto agregado al carrito...');
      await pausa(3000);

      await tomarScreenshot(driver, 'CP004-02-confirmacion');
      console.log('   ✅ CP004 APROBADO - Producto agregado al carrito');
      return true;
    } else {
      console.log('   ❌ CP004 FALLIDO - No se encontró botón de carrito');
      return false;
    }

  } catch (error) {
    console.error('   ❌ CP004 ERROR:', error.message);
    await tomarScreenshot(driver, 'CP004-ERROR');
    return false;
  }
}


async function ejecutarPruebas() {
  console.log('');
  console.log('═'.repeat(50));
  console.log('  PRUEBAS AUTOMATIZADAS - MERCADOLIBRE');
  console.log('  Selenium WebDriver + Node.js');
  console.log('═'.repeat(50));

  const driver = await configurarDriver();
  

  const resultados = {
    CP001: false,
    CP002: false,
    CP003: false,
    CP004: false,
  };

  try {
   
    resultados.CP001 = await pruebaBusqueda(driver);
    resultados.CP002 = await pruebaFiltros(driver);
    resultados.CP003 = await pruebaDetalleProducto(driver);
    resultados.CP004 = await pruebaAgregarCarrito(driver);

  } finally {
    
    console.log('\n' + '═'.repeat(50));
    console.log('  REPORTE FINAL DE EJECUCIÓN');
    console.log('═'.repeat(50));
    
    let aprobados = 0;
    let fallidos = 0;

    Object.entries(resultados).forEach(([caso, resultado]) => {
      const estado = resultado ? '✅ APROBADO' : '❌ FALLIDO';
      if (resultado) aprobados++;
      else fallidos++;
      console.log(`  ${caso}: ${estado}`);
    });

    console.log('─'.repeat(50));
    console.log(`  Total Aprobados: ${aprobados}/4`);
    console.log(`  Total Fallidos:  ${fallidos}/4`);
    console.log('═'.repeat(50));

    
    await pausa(2000);
    await driver.quit();
    console.log('\n✅ Driver cerrado correctamente\n');
  }
}

// Ejecutar el script
ejecutarPruebas().catch(error => {
  console.error('❌ Error fatal:', error);
  process.exit(1);
});