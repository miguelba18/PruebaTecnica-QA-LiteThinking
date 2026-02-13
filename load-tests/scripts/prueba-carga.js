
// ESCENARIO: 50 usuarios durante 1 minuto
// accediendo al flujo de búsqueda de productos
// en MercadoLibre Colombia

import http from 'k6/http';
import { check, sleep, group } from 'k6';
import { Counter, Rate, Trend } from 'k6/metrics';


const busquedasExitosas = new Counter('busquedas_exitosas');


const tasaErrores = new Rate('tasa_errores');


const tiempoBusqueda = new Trend('tiempo_busqueda_ms');
const tiempoDetalle = new Trend('tiempo_detalle_ms');
const tiempoHome = new Trend('tiempo_home_ms');


export const options = {
 
  stages: [
    
    { duration: '30s', target: 25 },
    { duration: '1m', target: 50 },
    { duration: '30s', target: 0 },
  ],

 
  thresholds: {
    
    'http_req_duration': ['p(95)<3000'],
    'http_req_failed': ['rate<0.05'],
    'tiempo_busqueda_ms': ['p(95)<4000'],
    'tiempo_home_ms': ['p(90)<2000'],
  },
};


const terminosBusqueda = [
  'laptop dell',
  'laptop hp',
  'computador portatil',
  'laptop gaming',
  'macbook',
];

const BASE_URL = 'https://www.mercadolibre.com.co';


const headers = {
  'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
  'Accept-Language': 'es-CO,es;q=0.9,en;q=0.8',
  'Accept-Encoding': 'gzip, deflate, br',
  'Connection': 'keep-alive',
};


export default function () {

  
  const termino = terminosBusqueda[
    Math.floor(Math.random() * terminosBusqueda.length)
  ];

  // ==========================================
  // GRUPO 1: PÁGINA PRINCIPAL
  // ==========================================
  group('01 - Página Principal', () => {
    const inicio = Date.now();
    
    const response = http.get(BASE_URL, { headers });
  
    tiempoHome.add(Date.now() - inicio);

    
    const exito = check(response, {
      
      'Home - Status 200': (r) => r.status === 200,
      
      'Home - Tiempo < 3s': (r) => r.timings.duration < 3000,
     
      'Home - Tiene contenido': (r) => r.body.length > 0,
    });

    tasaErrores.add(!exito);

   
    sleep(Math.random() * 2 + 1);
  });

  // ==========================================
  // GRUPO 2: BÚSQUEDA DE PRODUCTOS
  // ==========================================
  group('02 - Búsqueda de Productos', () => {
    const inicio = Date.now();
    
    const urlBusqueda = `${BASE_URL}/jm/search?as_word=${encodeURIComponent(termino)}`;
    const response = http.get(urlBusqueda, { headers });
    

    tiempoBusqueda.add(Date.now() - inicio);

    const exito = check(response, {
      'Búsqueda - Status 200': (r) => r.status === 200,
      'Búsqueda - Tiempo < 4s': (r) => r.timings.duration < 4000,
      'Búsqueda - Tiene resultados': (r) => r.body.includes('ui-search'),
    });

    if (exito) busquedasExitosas.add(1);
    tasaErrores.add(!exito);

    sleep(Math.random() * 2 + 1);
  });

  // ==========================================
  // GRUPO 3: DETALLE DE PRODUCTO
  // ==========================================
  group('03 - Detalle de Producto', () => {
    
    const urlProducto = `${BASE_URL}/MCO-laptop-dell`;
    const inicio = Date.now();

    const response = http.get(urlProducto, { headers });

    tiempoDetalle.add(Date.now() - inicio);

    check(response, {
      'Detalle - Status 200 o 301': (r) => 
        r.status === 200 || r.status === 301 || r.status === 302,
      'Detalle - Tiempo < 5s': (r) => r.timings.duration < 5000,
    });

    sleep(Math.random() * 3 + 2);
  });
}

export function handleSummary(data) {
  const resumen = {
    'Prueba de Carga - MercadoLibre': {
      'Fecha': new Date().toISOString(),
      'Duración total': '2 minutos',
      'Usuarios máximos': 50,
      'Total peticiones': data.metrics.http_reqs?.values?.count || 0,
      'Tasa de errores': `${((data.metrics.http_req_failed?.values?.rate || 0) * 100).toFixed(2)}%`,
      'Tiempo promedio respuesta': `${(data.metrics.http_req_duration?.values?.avg || 0).toFixed(2)}ms`,
      'Percentil 95': `${(data.metrics.http_req_duration?.values?.['p(95)'] || 0).toFixed(2)}ms`,
      'Peticiones por segundo': `${(data.metrics.http_reqs?.values?.rate || 0).toFixed(2)}`,
    }
  };

  console.log('\n' + '═'.repeat(60));
  console.log('  RESUMEN PRUEBA DE CARGA');
  console.log('═'.repeat(60));
  Object.entries(resumen['Prueba de Carga - MercadoLibre']).forEach(([key, value]) => {
    console.log(`  ${key}: ${value}`);
  });
  console.log('═'.repeat(60));

 
  return {
    'load-tests/resultados/resultado-carga.json': JSON.stringify(data, null, 2),
    stdout: JSON.stringify(resumen, null, 2),
  };
}