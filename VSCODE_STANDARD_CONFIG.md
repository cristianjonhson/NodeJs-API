# Configuración de StandardJS en VS Code

## 📋 Resumen

Este documento explica las configuraciones añadidas al archivo `settings.json` de VS Code para integrar StandardJS como herramienta de linting y formateo automático en proyectos JavaScript.

## � Configuración Completa (Copy-Paste)

Copia y pega este bloque directamente en tu `settings.json`:

```json
{
  "[javascript]": {
    "editor.defaultFormatter": "standard.vscode-standard"
  },
  "javascript.validate.enable": false,
  "standard.enable": true,
  "standard.autoFixOnSave": true,
  "standard.usePackageJson": true,
  "standard.run": "onType",
  "standard.validate": [
    "javascript",
    "javascriptreact"
  ],
  "standard.workingDirectories": [
    {
      "mode": "auto"
    }
  ]
}
```

> **Nota**: Si ya tienes otras configuraciones en tu `settings.json`, solo agrega estas propiedades sin reemplazar todo el archivo.

---

## �🔧 Configuraciones Aplicadas

### 1. Formateador Predeterminado

```json
"[javascript]": {
    "editor.defaultFormatter": "standard.vscode-standard"
}
```

**Propósito**: Define StandardJS como el formateador predeterminado para archivos JavaScript.

**Cambio**: Reemplazó a `esbenp.prettier-vscode` (Prettier) como formateador.

**Impacto**: Cuando presionas `Shift + Alt + F` o guardas con formato automático, se usa StandardJS en lugar de Prettier.

---

### 2. Desactivar Validación Nativa

```json
"javascript.validate.enable": false
```

**Propósito**: Desactiva el validador de JavaScript integrado de VS Code.

**Razón**: Evita conflictos y advertencias duplicadas entre el linter de VS Code y StandardJS.

**Beneficio**: Reduce el ruido visual y se enfoca únicamente en las reglas de StandardJS.

---

### 3. Habilitar StandardJS

```json
"standard.enable": true
```

**Propósito**: Activa la extensión de StandardJS en VS Code.

**Nota**: Requiere tener instalada la extensión `standard.vscode-standard` en VS Code.

---

### 4. Corrección Automática al Guardar

```json
"standard.autoFixOnSave": true
```

**Propósito**: Corrige automáticamente problemas de estilo al guardar archivos.

**Funcionamiento**: Cada vez que guardas un archivo `.js`, StandardJS intenta corregir:
- Indentación (2 espacios)
- Uso de comillas simples
- Espacios innecesarios
- Punto y coma (los elimina según el estándar)
- Comas finales
- Y más...

**Ventaja**: Mantiene el código consistente sin esfuerzo manual.

---

### 5. Usar Configuración del package.json

```json
"standard.usePackageJson": true
```

**Propósito**: Lee la configuración de StandardJS desde el `package.json` del proyecto.

**Configuración en package.json**:
```json
"eslintConfig": {
  "extends": "standard"
}
```

**Beneficio**: Permite configuraciones personalizadas por proyecto y mantiene la configuración versionada en Git.

---

### 6. Validación en Tiempo Real

```json
"standard.run": "onType"
```

**Propósito**: Ejecuta StandardJS mientras escribes código.

**Opciones disponibles**:
- `"onType"`: Valida mientras escribes (más interactivo)
- `"onSave"`: Valida solo al guardar
- `"off"`: No valida automáticamente

**Experiencia**: Los errores aparecen de inmediato en el editor sin esperar a guardar.

---

### 7. Tipos de Archivos Validados

```json
"standard.validate": [
    "javascript",
    "javascriptreact"
]
```

**Propósito**: Define qué tipos de archivos debe validar StandardJS.

**Incluye**:
- `"javascript"`: Archivos `.js`
- `"javascriptreact"`: Archivos `.jsx` (React)

**Exclusiones**: TypeScript (`.ts`, `.tsx`) no está incluido intencionalmente.

---

### 8. Detección Automática de Directorios

```json
"standard.workingDirectories": [
    {
        "mode": "auto"
    }
]
```

**Propósito**: Detecta automáticamente todos los directorios de trabajo en el workspace.

**Funcionamiento**: StandardJS busca archivos `package.json` en subdirectorios y aplica configuraciones específicas.

**Caso de uso**: Útil para monorepos o proyectos con múltiples submódulos.

---

## 🎯 Flujo de Trabajo Completo

### 1. **Mientras Escribes**
- StandardJS valida el código en tiempo real (`onType`)
- Los errores aparecen subrayados en rojo
- Las advertencias aparecen en amarillo

### 2. **Al Guardar (Ctrl/Cmd + S)**
- Se ejecuta `autoFixOnSave`
- Corrige automáticamente problemas de formato
- Solo quedan errores que requieren atención manual

### 3. **Corrección Manual**
```bash
# Ver todos los errores
pnpm lint

# Corregir automáticamente todo lo posible
pnpm lint:fix
```

---

## 📦 Extensión Requerida

Para que estas configuraciones funcionen, debes instalar la extensión oficial:

**Nombre**: Standard - JavaScript Standard Style  
**ID**: `standard.vscode-standard`  
**Instalación**:
```
Ctrl/Cmd + Shift + X → Buscar "Standard" → Instalar
```

---

## 🔄 Comparación: Antes vs Después

| Aspecto | Antes (Prettier) | Después (StandardJS) |
|---------|------------------|---------------------|
| Formateador | Prettier | StandardJS |
| Punto y coma | Obligatorio | Prohibido |
| Comillas | Dobles | Simples |
| Indentación | 2 espacios (configurable) | 2 espacios (fijo) |
| Validación nativa | Activada | Desactivada |
| Corrección automática | Manual | Al guardar |
| Validación en tiempo real | ❌ | ✅ |

---

## ⚙️ Reglas Principales de StandardJS

StandardJS aplica un conjunto de reglas opinionadas:

1. **2 espacios** para indentación
2. **Comillas simples** para strings (excepto para evitar escapes)
3. **Sin punto y coma** (excepto cuando es necesario)
4. **Sin variables no utilizadas**
5. **Espacio después de palabras clave**: `if (condition)` ✅ vs `if(condition)` ❌
6. **Espacio antes del paréntesis** en funciones: `function name (arg)` ✅
7. **Siempre usar `===`** en lugar de `==`
8. **Manejar errores de callbacks**: Siempre verificar `err` en callbacks de Node.js

Ver todas las reglas: https://standardjs.com/rules.html

---

## 🚀 Ventajas de Esta Configuración

1. ✅ **Consistencia**: Todo el equipo usa el mismo estilo sin discusiones
2. ✅ **Productividad**: No pierdes tiempo formateando manualmente
3. ✅ **Calidad**: Detecta errores comunes antes de ejecutar el código
4. ✅ **Sin Configuración**: Zero config, funciona out-of-the-box
5. ✅ **Estándar de la Industria**: Usado por GitHub, MongoDB, Express, etc.

---

## 🛠️ Solución de Problemas

### La extensión no funciona

1. Verifica que la extensión esté instalada: `standard.vscode-standard`
2. Recarga VS Code: `Ctrl/Cmd + Shift + P` → "Reload Window"
3. Verifica que el `package.json` tenga StandardJS instalado

### Los errores no aparecen

1. Verifica que `standard.enable: true`
2. Comprueba que el archivo sea `.js` o `.jsx`
3. Revisa la pestaña "Output" → "StandardJS" para ver logs

### No corrige al guardar

1. Verifica que `standard.autoFixOnSave: true`
2. Asegúrate de que el archivo tenga errores auto-corregibles
3. Algunos errores (como variables no usadas) requieren corrección manual

---

## 📚 Recursos Adicionales

- [StandardJS Official Site](https://standardjs.com/)
- [Reglas Completas](https://standardjs.com/rules.html)
- [VS Code Extension](https://marketplace.visualstudio.com/items?itemName=standard.vscode-standard)
- [Comparación con ESLint](https://standardjs.com/awesome.html#comparisons)

---

## 📝 Notas Finales

Esta configuración está optimizada para proyectos Node.js puros sin frameworks. Si trabajas con React, Vue, o TypeScript, podrías necesitar ajustes adicionales en `standard.validate` o considerar usar `eslint-config-standard` con configuraciones personalizadas.

**Última actualización**: 5 de enero de 2026
