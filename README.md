# NodeJs-API

API REST simple construida con Node.js utilizando únicamente el módulo HTTP nativo, sin dependencias externas.

## 📋 Descripción

Este proyecto es una API REST básica desarrollada con Node.js puro, demostrando cómo crear un servidor HTTP funcional sin frameworks como Express. Es ideal para entender los fundamentos de Node.js y cómo funcionan los servidores HTTP a bajo nivel.

## 🚀 Tecnologías

- **Node.js** - Entorno de ejecución de JavaScript
- **HTTP Module** - Módulo nativo de Node.js para crear servidores HTTP

## 📁 Estructura del Proyecto

```
NodeJs-API/
├── server.js       # Servidor HTTP principal
├── .gitignore      # Archivos y carpetas ignoradas por Git
└── README.md       # Documentación del proyecto
```

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

## 🎯 Configuración

### Variables de Entorno

Puedes configurar el puerto del servidor mediante una variable de entorno:

```bash
# Linux/Mac
export PORT=8080

# Windows (CMD)
set PORT=8080

# Windows (PowerShell)
$env:PORT=8080
```

Por defecto, el servidor usa el puerto **3000** si no se especifica.

## 🏃 Ejecución

Para iniciar el servidor:

```bash
node server.js
```

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
```

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
    "/api/data": "GET - Datos de ejemplo"
  }
}
```

### 2. Estado del Servidor
**GET** `/api/status`

Retorna el estado actual del servidor.

**Respuesta:**
```json
{
  "status": "OK",
  "timestamp": "2026-01-04T10:30:00.000Z",
  "uptime": 123.456
}
```

### 3. Datos de Ejemplo
**GET** `/api/data`

Retorna un array de datos de ejemplo.

**Respuesta:**
```json
{
  "data": [
    { "id": 1, "name": "Item 1" },
    { "id": 2, "name": "Item 2" },
    { "id": 3, "name": "Item 3" }
  ]
}
```

### Manejo de Errores

Para rutas no existentes, la API retorna:

**Respuesta 404:**
```json
{
  "error": "Endpoint no encontrado"
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

# Datos
curl http://localhost:3000/api/data
```

### Navegador
Simplemente abre en tu navegador:
- http://localhost:3000/
- http://localhost:3000/api/status
- http://localhost:3000/api/data

### Herramientas
- [Postman](https://www.postman.com/)
- [Insomnia](https://insomnia.rest/)
- [Thunder Client](https://www.thunderclient.com/) (extensión de VS Code)

## 🔒 CORS

El servidor tiene configurado CORS para permitir peticiones desde cualquier origen:

```javascript
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, POST, PUT, DELETE
Access-Control-Allow-Headers: Content-Type
```

## 🛠️ Desarrollo

### Detener el Servidor

Presiona `Ctrl + C` en la terminal donde está corriendo el servidor.

### Modificaciones

El código está completamente comentado para facilitar su comprensión y modificación. Puedes:

- Agregar nuevos endpoints modificando el sistema de enrutamiento
- Cambiar las respuestas JSON según tus necesidades
- Implementar métodos HTTP adicionales (POST, PUT, DELETE)
- Agregar manejo de errores más robusto

## 📝 Notas

- Este proyecto utiliza el prefijo `node:` en las importaciones (`require('node:http')`) para indicar explícitamente módulos nativos de Node.js
- No se requiere instalación de dependencias (`npm install`) ya que solo usa módulos nativos
- Ideal para aprendizaje y proyectos pequeños
- Para proyectos en producción, considera usar frameworks como Express.js

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
