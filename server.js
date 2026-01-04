// Importar el módulo HTTP nativo de Node.js
// Este módulo permite crear servidores HTTP sin dependencias externas
// El prefijo 'node:' indica explícitamente que es un módulo nativo de Node.js
const http = require('node:http');

// Configuración del servidor
// PORT: Lee el puerto desde las variables de entorno o usa 3000 por defecto
// HOST: Dirección donde escuchará el servidor (localhost para desarrollo local)
const PORT = process.env.PORT || 3000;
const HOST = 'localhost';

// Crear el servidor HTTP
// La función callback se ejecuta cada vez que llega una petición (request) al servidor
// req: Objeto con información de la petición (método, URL, headers, etc.)
// res: Objeto para construir y enviar la respuesta al cliente
const server = http.createServer((req, res) => {
  // Configurar CORS (Cross-Origin Resource Sharing)
  // Permite que el servidor acepte peticiones desde cualquier origen (*)
  // Útil para desarrollo y para APIs públicas
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Sistema de enrutamiento básico
  // Verifica el método HTTP (GET, POST, etc.) y la URL de la petición
  // Responde según la ruta solicitada
  
  // Ruta principal (Home)
  // GET / - Muestra información de bienvenida y lista de endpoints disponibles
  if (req.method === 'GET' && req.url === '/') {
    res.statusCode = 200; // Código HTTP 200: Petición exitosa
    res.setHeader('Content-Type', 'application/json'); // Indicar que la respuesta es JSON
    res.end(JSON.stringify({
      message: 'Bienvenido a la API de Node.js',
      endpoints: {
        '/': 'GET - Home',
        '/api/status': 'GET - Estado del servidor',
        '/api/data': 'GET - Datos de ejemplo'
      }
    }));
  } 
  // Ruta de estado del servidor
  // GET /api/status - Devuelve información sobre el estado del servidor
  else if (req.method === 'GET' && req.url === '/api/status') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({
      status: 'OK', // Estado del servidor
      timestamp: new Date().toISOString(), // Fecha y hora actual en formato ISO
      uptime: process.uptime() // Tiempo en segundos que el servidor lleva activo
    }));
  } 
  // Ruta de datos de ejemplo
  // GET /api/data - Devuelve un array de datos de ejemplo
  else if (req.method === 'GET' && req.url === '/api/data') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({
      data: [
        { id: 1, name: 'Item 1' },
        { id: 2, name: 'Item 2' },
        { id: 3, name: 'Item 3' }
      ]
    }));
  } 
  // Manejo de rutas no encontradas
  // Si la petición no coincide con ninguna ruta definida, devuelve error 404
  else {
    res.statusCode = 404; // Código HTTP 404: Recurso no encontrado
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({
      error: 'Endpoint no encontrado'
    }));
  }
});

// Iniciar el servidor y hacerlo escuchar en el puerto y host especificados
// El callback se ejecuta cuando el servidor está listo para recibir peticiones
server.listen(PORT, HOST, () => {
  console.log(`🚀 Servidor corriendo en http://${HOST}:${PORT}`);
  console.log(`📝 Endpoints disponibles:`);
  console.log(`   - http://${HOST}:${PORT}/`);
  console.log(`   - http://${HOST}:${PORT}/api/status`);
  console.log(`   - http://${HOST}:${PORT}/api/data`);
});

// Manejo de errores del servidor
// Escucha el evento 'error' que se emite cuando ocurre un problema
// Por ejemplo: puerto ya en uso, permisos insuficientes, etc.
server.on('error', (error) => {
  console.error('❌ Error en el servidor:', error);
});
