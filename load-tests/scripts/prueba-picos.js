
// ESCENARIO REAL: Lanzamiento de oferta especial
// en MercadoLibre donde miles de usuarios entran
// simultáneamente en cuestión de segundos.
// ============================================

import http from 'k6/http';
import { check, sleep, group } from 'k6';
import { Counter, Rate, Trend } from 'k6/metrics';


const peticionesExitosas = new Counter('peticiones_exitosas_pico');
const tasaErroresPico = new Rate('tasa_errores_pico');
const tiempoRespuestaPico = new Trend('tiempo_respuesta_pico_ms');
const tiempoRecuperacion = new Trend('tiempo_recuperacion_ms');


export const options = {
  stages: [
    
    { duration: '30s', target: 10 },
    { duration: '10s', target: 300 },
    { duration: '1m', target: 300 },
    { duration: '10s', target: 10 },
    { duration: '30s', target: 10 },
    { duration: '10s', target: 0 },
  ],

  thresholds: {
    'http_req_failed': ['rate<0.15'],
    'http_req_duration': ['p(95)<10000'],

   
    'tasa_errores_pico': ['rate<0.15'],
    'tiempo_respuesta_pico_ms': ['p(90)<8000'],
  },
};

const BASE_URL = 'https://www.mercadolibre.com.co';

const headers = {
  'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
  'Accept-Language': 'es-CO,es;q=0.9,en;q=0.8',
  'Connection': 'keep-alive',
};


export default function () {


  // ==========================================
  // GRUPO 1: HOME DURANTE EL PICO
  // ==========================================
  group('01 - Home bajo pico de tráfico', () => {
    const inicio = Date.now();

    const response = http.get(BASE_URL, {
      headers,
     
      timeout: '15s',
    });

    const duracion = Date.now() - inicio;
    tiempoRespuestaPico.add(duracion);
    const exito = check(response, {
      'Pico - Home responde': (r) =>
        r.status === 200 ||
        r.status === 429 ||
        r.status === 503,

     
      'Pico - Sin timeout completo': (r) =>
        r.timings.duration < 15000,

     
      'Pico - Respuesta exitosa 200': (r) =>
        r.status === 200,
    });

    tasaErroresPico.add(!exito);
    if (exito) peticionesExitosas.add(1);

   
    sleep(0.3);
  });

  // ==========================================
  // GRUPO 2: BÚSQUEDA DURANTE EL PICO
  // ==========================================
  group('02 - Búsqueda bajo pico de tráfico', () => {
    const inicio = Date.now();

    const response = http.get(
      `${BASE_URL}/jm/search?as_word=laptop+dell`,
      {
        headers,
        timeout: '15s',
      }
    );

    const duracion = Date.now() - inicio;
    tiempoRespuestaPico.add(duracion);

    const exito = check(response, {
      'Pico - Búsqueda responde': (r) =>
        r.status === 200 ||
        r.status === 429 ||
        r.status === 503,

      'Pico - Búsqueda sin timeout': (r) =>
        r.timings.duration < 15000,
    });

    tasaErroresPico.add(!exito);

    sleep(0.3);
  });

  // ==========================================
  // GRUPO 3: MEDIR RECUPERACIÓN
  // Después del pico medimos si el sistema
  // vuelve a tiempos normales de respuesta
  // ==========================================
  group('03 - Verificar recuperación post-pico', () => {
    const inicio = Date.now();

    const response = http.get(BASE_URL, { headers });

    const duracionRecuperacion = Date.now() - inicio;
    tiempoRecuperacion.add(duracionRecuperacion);

    check(response, {
      'Recuperación - Sistema responde': (r) => r.status === 200,
      // Después del pico esperamos recuperación en 5s
      'Recuperación - Tiempo normal < 5s': (r) =>
        r.timings.duration < 5000,
    });

    sleep(1);
  });
}


export function handleSummary(data) {
  const metricas = data.metrics;

  const resumen = {
    prueba: 'Spike Test - MercadoLibre',
    fecha: new Date().toISOString(),
    configuracion: {
      usuariosMaximos: 300,
      duracionTotal: '~3 minutos',
      tipoPrueba: 'Spike Test',
    },
    resultados: {
      totalPeticiones: metricas.http_reqs?.values?.count || 0,
      peticionesPorSegundo: (metricas.http_reqs?.values?.rate || 0).toFixed(2),
      tasaErrores: `${((metricas.http_req_failed?.values?.rate || 0) * 100).toFixed(2)}%`,
      tiempoPromedioRespuesta: `${(metricas.http_req_duration?.values?.avg || 0).toFixed(2)}ms`,
      percentil95: `${(metricas.http_req_duration?.values?.['p(95)'] || 0).toFixed(2)}ms`,
      percentil99: `${(metricas.http_req_duration?.values?.['p(99)'] || 0).toFixed(2)}ms`,
      tiempoMaximo: `${(metricas.http_req_duration?.values?.max || 0).toFixed(2)}ms`,
    },
    thresholds: {
      estado: 'Ver consola para detalles',
    },
  };

  console.log('\n' + '═'.repeat(60));
  console.log('  RESUMEN SPIKE TEST');
  console.log('═'.repeat(60));
  console.log(`  Total Peticiones:     ${resumen.resultados.totalPeticiones}`);
  console.log(`  Peticiones/segundo:   ${resumen.resultados.peticionesPorSegundo}`);
  console.log(`  Tasa de Errores:      ${resumen.resultados.tasaErrores}`);
  console.log(`  Tiempo Promedio:      ${resumen.resultados.tiempoPromedioRespuesta}`);
  console.log(`  Percentil 95:         ${resumen.resultados.percentil95}`);
  console.log(`  Percentil 99:         ${resumen.resultados.percentil99}`);
  console.log(`  Tiempo Máximo:        ${resumen.resultados.tiempoMaximo}`);
  console.log('═'.repeat(60));

  return {
    'load-tests/resultados/resultado-picos.json': JSON.stringify(data, null, 2),
    stdout: JSON.stringify(resumen, null, 2),
  };
}