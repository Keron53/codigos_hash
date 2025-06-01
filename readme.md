# Hashing y Código de Autenticación de Mensajes (MAC) en JavaScript

Este repositorio se trata de un ejercicio de **hashing** (SHA-256) y **autenticación de mensajes** (MAC usando HMAC-SHA256) en JavaScript, empleando Node.js. Aquí verás cómo generar hashes, crear y verificar MACs, y simular un intercambio de mensajes autenticados mediante archivos locales.
A continuación te explicaré como funciona cada aspecto del ejercicio

---

## Estructura del código

El archivo principal es `Ejercicio_javascript_mac_hash.js` y está dividido en varias secciones, explicadas a continuación:

---

### 1. Modulos utilizados

Para realizar este ejercicio necesitaremos los modulos:
- `crypto`: operaciones criptográficas (hash y HMAC).
- `fs`: lectura y escritura de archivos.
- `path`: manejar rutas de archivos.

```js
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
```

![Captura de importación de módulos](/capturas/captura1.png)

---

### 2. Funcion para calcular el hash SHA-256

Esta funcion recibe un texto y retorna su hash SHA-256 en formato hexadecimal y sirve para garantizar la integridad de los datos.

```js
function getSHA256Hash(text) {
  return crypto.createHash('sha256').update(text, 'utf8').digest('hex');
}
```

![Captura de hash SHA-256](/capturas/captura2.png)

---

### 3. Funcion para calcular un HMAC-SHA256

Este permite autenticar un mensaje usando una clave secreta y el algoritmo HMAC-SHA256. El resultado es un codigo hexadecimal que asegura la autenticidad del mensaje.

```js
function getHMAC_SHA256(key, message) {
  return crypto.createHmac('sha256', key).update(message, 'utf8').digest('hex');
}
```

![Captura de HMAC SHA-256](/capturas/captura3.png)

---

### 4. Demostración de hashing

Aqui se utiliza la función de hashing para mostrar en consola el texto original y su hash SHA-256.

```js
const textoOriginal = "...";
const hashSHA256 = getSHA256Hash(textoOriginal);
console.log(...);
```

![Captura de resultado de hash](/capturas/captura4.png)

---

### 5. Demostración de HMAC (MAC)

Esta sección simula la autenticación de un mensaje:
- Se define una clave secreta y un mensaje.
- Se calcula el HMAC.
- Se guarda el mensaje con su HMAC en un archivo local (`mensaje_autenticado.json`).

```js
const claveSecreta = "...";
const mensaje = "...";
const hmac = getHMAC_SHA256(claveSecreta, mensaje);

const mensajeAutenticado = { mensaje, hmac };
fs.writeFileSync(..., JSON.stringify(mensajeAutenticado, null, 2));
```

![Captura de MAC y archivo generado](/capturas/captura5.png)

---

### 6. Verificación del mensaje autenticado

Simula la recepción y verificación del mensaje:
- Lee el archivo.
- Recalcula el HMAC con la clave secreta.
- Compara el HMAC calculado y el recibido, mostrando si el mensaje es auténtico o no.

```js
const datosLeidos = JSON.parse(fs.readFileSync(...));
const hmacVerificacion = getHMAC_SHA256(claveSecreta, datosLeidos.mensaje);
const esValido = hmacVerificacion === datosLeidos.hmac;
console.log(...);
```

![Captura de verificación de autenticidad](/capturas/captura6.png)

---

### 7. Explicación del archivo generado

Al final del código, se explica el contenido y propósito de `mensaje_autenticado.json`:

```json
{
  "mensaje": "Texto del mensaje autenticado.",
  "hmac": "HMAC calculado con la clave secreta."
}
```

Este archivo simula el envío de un mensaje autenticado, donde el receptor puede verificar la integridad y autenticidad del mensaje usando la misma clave secreta.

![Captura del archivo JSON generado](/capturas/captura7.png)

---

## ¿Cómo ejecutar este proyecto?

### **Requisitos**
- Tener [Node.js](https://nodejs.org/) instalado en tu sistema.

### **Pasos**

1. **Descarga o clona el repositorio** y entra a la carpeta del proyecto.
2. **Guarda el archivo** `hashing_and_mac.js` en el directorio del proyecto.
3. **Ejecuta el archivo** en la terminal:
    ```
    node hashing_and_mac.js
    ```
4. **Resultados:**
    - Verás en consola el hash del texto original y la simulación del MAC.
    - Se generará el archivo `mensaje_autenticado.json` en la misma carpeta.
5. **(Opcional)** Abre `mensaje_autenticado.json` para ver cómo se almacenan el mensaje y su HMAC.

---