

const { By, until } = require('selenium-webdriver');
const fs = require('fs');
const path = require('path');


async function esperarElemento(driver, locator, timeout = 10000) {
  return await driver.wait(
    until.elementLocated(locator),
    timeout,
    `Elemento no encontrado después de ${timeout}ms`
  );
}



async function tomarScreenshot(driver, nombre) {
  const carpeta = path.join(__dirname, '../../evidencias/pruebas-automatizadas/selenium');
  

  if (!fs.existsSync(carpeta)) {
    fs.mkdirSync(carpeta, { recursive: true });
  }
  
  const screenshot = await driver.takeScreenshot();
  const rutaArchivo = path.join(carpeta, `${nombre}.png`);
  fs.writeFileSync(rutaArchivo, screenshot, 'base64');
  console.log(`📸 Screenshot guardado: ${nombre}.png`);
}


async function pausa(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


async function scrollHaciaElemento(driver, elemento) {
  await driver.executeScript(
    'arguments[0].scrollIntoView({ behavior: "smooth", block: "center" });',
    elemento
  );
  await pausa(500);
}


module.exports = {
  esperarElemento,
  tomarScreenshot,
  pausa,
  scrollHaciaElemento
};