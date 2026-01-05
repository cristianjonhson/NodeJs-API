# NodeJs-API

API REST modular construida con Node.js utilizando únicamente el módulo HTTP nativo, sin dependencias externas. Implementa patrones de diseño y arquitectura limpia con separación de responsabilidades.

## 📋 Descripción

Este proyecto es una API REST desarrollada con Node.js puro, demostrando cómo crear un servidor HTTP funcional sin frameworks como Express, pero siguiendo principios de arquitectura limpia y patrones de diseño profesionales. 

**Características principales:**
- ✅ Separación de responsabilidades (SRP)
- ✅ Arquitectura modular escalable
- ✅ Middleware pattern para CORS
- ✅ Controller pattern para lógica de negocio
- ✅ Router pattern para enrutamiento
- ✅ Configuración centralizada
- ✅ Graceful shutdown
- ✅ Manejo robusto de errores

Es ideal para entender los fundamentos de Node.js, arquitectura de software y patrones de diseño a bajo nivel.

## 🚀 Tecnologías

- **Node.js** - Entorno de ejecución de JavaScript
- **HTTP Module** - Módulo nativo de Node.js para crear servidores HTTP

## 🏗️ Arquitectura

El proyecto sigue una arquitectura modular basada en separación de responsabilidades:

```
├── config/         → Configuración centralizada
├── middleware/     → Funciones intermedias (CORS, etc.)
├── controllers/    → Lógica de negocio por feature
└── routes/         → Sistema de enrutamiento
```

## 📁 Estructura del Proyecto

```
NodeJs-API/
├── server.js                             # Punto de entrada y orquestador
├── src/
│   ├── config/
│   │   └── server.config.js             # Configuración (PORT, HOST, CORS)
│   ├── middleware/
│   │   └── cors.middleware.js           # Middleware de CORS y OPTIONS
│   ├── controllers/
│   │   ├── home.controller.js           # Controlador del home
│   │   ├── status.controller.js         # Controlador de status
│   │   └── data.controller.js           # Controlador de datos
│   ├── routes/
│   │   └── index.js                     # Sistema de rutas centralizado
│   └── utils/
│       └── bodyParser.js                # Utilidad para parsear JSON body
├── package.json                          # Configuración de npm y scripts
├── NodeJs-API.postman_collection.json   # Colección de Postman
├── .gitignore                            # Archivos ignorados por Git
└── README.md                             # Documentación del proyecto
```

### 📂 Responsabilidades por Módulo

| Módulo | Responsabilidad |
|--------|----------------|
| **server.js** | Inicialización del servidor y coordinación de módulos |
| **config/** | Gestión de configuración y variables de entorno |
| **middleware/** | Funciones que procesan requests antes de llegar a controladores |
| **controllers/** | Lógica de negocio específica de cada endpoint |
| **routes/** | Enrutamiento HTTP y mapeo de URLs a controladores |

## ⚙️ Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- [Node.js](https://nodejs.org/) (v14 o superior)
- [Git](https://git-scm.com/)

Verifica las instalaciones:

```bash
node --version
npm --version
git --version
```

## 🔧 Instalación

1. Clona el repositorio:

```bash
git clone https://github.com/cristianjonhson/NodeJs-API.git
```

2. Navega al directorio del proyecto:

```bash
cd NodeJs-API
```

3. (Opcional) Aunque el proyecto no requiere dependencias externas, puedes inicializar npm:

```bash
npm install
```

**Nota:** Este proyecto usa solo módulos nativos de Node.js, por lo que `npm install` no instalará dependencias externas.

## 🎯 Configuración

### Variables de Entorno

Puedes configurar el servidor mediante variables de entorno:

| Variable | Descripción | Valor por defecto |
|----------|-------------|-------------------|
| `PORT` | Puerto del servidor | 3000 |
| `HOST` | Host donde escucha | localhost |
| `ALLOWED_ORIGINS` | Orígenes permitidos CORS | * |
| `NODE_ENV` | Entorno de ejecución | development |

**Ejemplos:**

```bash
# Linux/Mac
export PORT=8080
export HOST=0.0.0.0
export NODE_ENV=production
export ALLOWED_ORIGINS=https://miapp.com

# Windows (CMD)
set PORT=8080
set HOST=0.0.0.0

# Windows (PowerShell)
$env:PORT=8080
$env:HOST="0.0.0.0"
```

## 🏃 Ejecución

### Usando Node.js directamente:

```bash
node server.js
```

### Usando npm scripts:

```bash
# Iniciar el servidor en modo producción
npm start

# Iniciar en modo desarrollo con auto-reload (Node.js 18+)
npm run dev
```

**Scripts disponibles:**
- `npm start` - Inicia el servidor en modo producción
- `npm run dev` - Inicia con watch mode (recarga automática en cambios)
- `npm test` - Ejecuta tests (aún no configurado)

El servidor estará disponible en:
```
http://localhost:3000
```

Deberías ver en consola:
```
🚀 Servidor corriendo en http://localhost:3000
📝 Endpoints disponibles:
   - http://localhost:3000/
   - http://localhost:3000/api/status
   - http://localhost:3000/api/data
🌍 Entorno: development
```

### Detener el Servidor

Presiona `Ctrl + C` en la terminal. El servidor ejecutará un **graceful shutdown**:
- Cerrará conexiones activas ordenadamente
- Liberará recursos apropiadamente
- Mostrará mensaje de confirmación

## 📡 Endpoints Disponibles

### 1. Home
**GET** `/`

Retorna información de bienvenida y lista de endpoints disponibles.

**Respuesta:**
```json
{
  "message": "Bienvenido a la API de Node.js",
  "endpoints": {
    "/": "GET - Home",
    "/api/status": "GET - Estado del servidor",
    "/api/data": "GET - Obtener todos los items",
    "/api/data/:id": "GET - Obtener item por ID",
    "/api/data (POST)": "POST - Crear nuevo item",
    "/api/data/:id (PUT)": "PUT - Actualizar item existente",
    "/api/data/:id (DELETE)": "DELETE - Eliminar item"
  },
  "version": "1.0.0"
}
```

### 2. Estado del Servidor
**GET** `/api/status`

Retorna el estado actual del servidor y métricas de salud.

**Respuesta:**
```json
{
  "status": "OK",
  "timestamp": "2026-01-05T10:30:00.000Z",
  "uptime": 123.456,
  "environment": "development"
}
```

### 3. Obtener Todos los Items
**GET** `/api/data`

Retorna un array con todos los items disponibles.

**Respuesta:**
```json
{
  "success": true,
  "count": 3,
  "data": [
    { "id": 1, "name": "Item 1", "description": "Primer elemento de ejemplo" },
    { "id": 2, "name": "Item 2", "description": "Segundo elemento de ejemplo" },
    { "id": 3, "name": "Item 3", "description": "Tercer elemento de ejemplo" }
  ]
}
```

### 4. Obtener Item por ID
**GET** `/api/data/:id`

Retorna un item específico según su ID.

**Parámetros de URL:**
- `id` (number) - ID del item a obtener

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Item 1",
    "description": "Primer elemento de ejemplo"
  }
}
```

**Respuesta de error (404):**
```json
{
  "success": false,
  "error": "Item no encontrado",
  "id": 99
}
```

### 5. Crear Nuevo Item
**POST** `/api/data`

Crea un nuevo item en la colección.

**Body (JSON):**
```json
{
  "name": "Nuevo Item",
  "description": "Descripción del nuevo item"
}
```

**Campos:**
- `name` (string, requerido) - Nombre del item
- `description` (string, opcional) - Descripción del item

**Respuesta exitosa (201):**
```json
{
  "success": true,
  "message": "Item creado exitosamente",
  "data": {
    "id": 4,
    "name": "Nuevo Item",
    "description": "Descripción del nuevo item"
  }
}
```

**Respuesta de error (400):**
```json
{
  "success": false,
  "error": "El campo 'name' es requerido"
}
```

### 6. Actualizar Item
**PUT** `/api/data/:id`

Actualiza un item existente.

**Parámetros de URL:**
- `id` (number) - ID del item a actualizar

**Body (JSON):**
```json
{
  "name": "Nombre actualizado",
  "description": "Nueva descripción"
}
```

**Campos:**
- `name` (string, opcional) - Nuevo nombre del item
- `description` (string, opcional) - Nueva descripción del item

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "message": "Item actualizado exitosamente",
  "data": {
    "id": 1,
    "name": "Nombre actualizado",
    "description": "Nueva descripción"
  }
}
```

**Respuesta de error (404):**
```json
{
  "success": false,
  "error": "Item no encontrado",
  "id": 99
}
```

### 7. Eliminar Item
**DELETE** `/api/data/:id`

Elimina un item de la colección.

**Parámetros de URL:**
- `id` (number) - ID del item a eliminar

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "message": "Item eliminado exitosamente",
  "data": {
    "id": 1,
    "name": "Item 1",
    "description": "Primer elemento de ejemplo"
  }
}
```

**Respuesta de error (404):**
```json
{
  "success": false,
  "error": "Item no encontrado",
  "id": 99
}
```

### Manejo de Errores

Para rutas no existentes, la API retorna:

**Respuesta 404:**
```json
{
  "error": "Endpoint no encontrado",
  "path": "/ruta/invalida",
  "method": "GET"
}
```

## 🧪 Pruebas

Puedes probar los endpoints usando:

### cURL
```bash
# Home
curl http://localhost:3000/

# Estado
curl http://localhost:3000/api/status

# Obtener todos los items
curl http://localhost:3000/api/data

# Obtener item por ID
curl http://localhost:3000/api/data/1

# Crear nuevo item
curl -X POST http://localhost:3000/api/data \
  -H "Content-Type: application/json" \
  -d '{"name":"Nuevo Item","description":"Descripción del nuevo item"}'

# Actualizar item
curl -X PUT http://localhost:3000/api/data/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Item Actualizado","description":"Nueva descripción"}'

# Eliminar item
curl -X DELETE http://localhost:3000/api/data/1
```

### Navegador
Simplemente abre en tu navegador:
- http://localhost:3000/
- http://localhost:3000/api/status
- http://localhost:3000/api/data

### Postman Collection

El proyecto incluye una colección de Postman lista para importar con todas las peticiones configuradas:

**📦 Archivo:** `NodeJs-API.postman_collection.json`

**Cómo usar:**
1. Abre Postman
2. Click en **Import** (esquina superior izquierda)
3. Arrastra el archivo `NodeJs-API.postman_collection.json` o selecciónalo
4. La colección aparecerá con 7 requests configurados
5. ¡Ejecuta cualquier request!

### Otras Herramientas
- [Postman](https://www.postman.com/) - Desktop app
- [Insomnia](https://insomnia.rest/) - Cliente REST alternativo
- [Thunder Client](https://www.thunderclient.com/) - Extensión de VS Code
- **Consola de Firefox** - Usa `fetch()` en la consola del navegador (F12)

## 🔒 CORS

El servidor implementa CORS mediante un middleware dedicado que:

- Configura headers apropiados para peticiones cross-origin
- Maneja peticiones OPTIONS (preflight) correctamente
- Permite configurar orígenes permitidos por entorno

```javascript
// Headers configurados
Access-Control-Allow-Origin: * (configurable)
Access-Control-Allow-Methods: GET, POST, PUT, DELETE
Access-Control-Allow-Headers: Content-Type
```

**Nota de seguridad:** En producción, configura `ALLOWED_ORIGINS` con dominios específicos en lugar de `*`.

## 🏗️ Patrones de Diseño Implementados

### 1. **Separation of Concerns (SoC)**
Cada módulo tiene una única responsabilidad claramente definida.

### 2. **Middleware Pattern**
El CORS se implementa como middleware reutilizable que procesa requests.

### 3. **Controller Pattern**
La lógica de negocio está encapsulada en controladores específicos.

### 4. **Router Pattern**
Sistema de enrutamiento centralizado que mapea URLs a controladores.

### 5. **Configuration Management**
Configuración centralizada en módulo dedicado.

## 🛠️ Desarrollo

### Agregar Nuevo Endpoint

1. **Crear controlador** en `src/controllers/`:
```javascript
// src/controllers/nuevo.controller.js
const getNuevo = (req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ mensaje: 'Nuevo endpoint' }));
};

module.exports = { getNuevo };
```

2. **Registrar ruta** en `src/routes/index.js`:
```javascript
const nuevoController = require('../controllers/nuevo.controller');

// En la función handleRoute
if (req.method === 'GET' && req.url === '/api/nuevo') {
  nuevoController.getNuevo(req, res);
  return true;
}
```

### Agregar Middleware

Crea un archivo en `src/middleware/` e impórtalo en [server.js](server.js):

```javascript
// src/middleware/logger.middleware.js
const logRequest = (req) => {
  console.log(`${req.method} ${req.url}`);
};

module.exports = { logRequest };
```

### Detener el Servidor

Presiona `Ctrl + C` en la terminal donde está corriendo el servidor.

### Modificaciones

El código está completamente comentado y organizado modularmente. Ventajas de esta arquitectura:

- ✅ **Fácil de mantener**: Cada cambio se hace en un solo lugar
- ✅ **Escalable**: Agregar features no afecta código existente
- ✅ **Testeable**: Cada módulo puede probarse independientemente
- ✅ **Reutilizable**: Middleware y controladores son módulos independientes
- ✅ **Profesional**: Sigue mejores prácticas de arquitectura de software

**Posibles mejoras futuras:**
- Implementar logging estructurado (Winston, Pino)
- Agregar validación de datos (Joi, Yup, Zod)
- Implementar rate limiting
- Agregar tests automatizados (Jest, Mocha)
- Implementar manejo de body para POST/PUT
- Agregar health checks más robustos

## 📝 Notas

- Este proyecto utiliza el prefijo `node:` en las importaciones (`require('node:http')`) para indicar explícitamente módulos nativos de Node.js
- No se requiere instalación de dependencias (`npm install`) ya que solo usa módulos nativos
- Implementa patrones de diseño profesionales sin frameworks
- Ideal para aprendizaje de arquitectura de software y Node.js a bajo nivel
- Para proyectos en producción a gran escala, considera usar frameworks como Express.js, Fastify o NestJS

## 🎓 Conceptos Aprendidos

Este proyecto demuestra:
- Arquitectura modular y separación de responsabilidades
- Patrones de diseño (Middleware, Controller, Router)
- Manejo de requests/responses HTTP a bajo nivel
- Configuración mediante variables de entorno
- Graceful shutdown y manejo de señales del sistema
- CORS y preflight requests
- Enrutamiento HTTP sin frameworks
- Organización de código escalable

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

## 👤 Autor

**cristianjonhson**

- GitHub: [@cristianjonhson](https://github.com/cristianjonhson)
- Repositorio: [NodeJs-API](https://github.com/cristianjonhson/NodeJs-API)

---

⭐️ Si este proyecto te fue útil, considera darle una estrella en GitHub
