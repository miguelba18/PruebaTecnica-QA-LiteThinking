import http from 'k6/http';
import { check, sleep, group } from 'k6';
import { Rate, Trend } from 'k6/metrics';

const tasaErrores = new Rate('tasa_errores_estres');
const tiempoRespuesta = new Trend('tiempo_respuesta_estres');

export const options = {
  stages: [
    
    { duration: '1m', target: 100 },
    { duration: '2m', target: 100 },
    { duration: '1m', target: 200 },
    { duration: '1m', target: 0 },
  ],

  thresholds: { 
    'http_req_failed': ['rate<0.10'],
    'http_req_duration': ['p(95)<8000'],
  },
};

const BASE_URL = 'https://www.mercadolibre.com.co';

const headers = {
  'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
  'Accept': 'text/html,application/xhtml+xml',
  'Accept-Language': 'es-CO,es;q=0.9',
};

export default function () {
  group('Estrés - Búsqueda masiva', () => {
    const inicio = Date.now();
    const response = http.get(
      `${BASE_URL}/jm/search?as_word=laptop`,
      { headers }
    );

    tiempoRespuesta.add(Date.now() - inicio);

    const exito = check(response, {
      'Estrés - Respuesta válida': (r) =>
        r.status === 200 || r.status === 429 || r.status === 503,
      'Estrés - Sin timeout': (r) => r.timings.duration < 10000,
    });

    tasaErrores.add(!exito);

    
    sleep(0.5);
  });
}

export function handleSummary(data) {
  return {
    'load-tests/resultados/resultado-estres.json': JSON.stringify(data, null, 2),
  };
}