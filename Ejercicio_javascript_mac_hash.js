/*
  Tarea Elvis Eduardo España Ponce
  Hashing & Access Authentication Code in JavaScript
*/

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

/**
 * calcula el hash SHA-256 de un texto
 * @param {string} text - Texto a hashear
 * @returns {string} - Hash en formato hexadecimal
 */
function getSHA256Hash(text) {
  // Crea un hash usando el algoritmo sha256 y retorna el resultado en hexadecimal
  return crypto.createHash('sha256').update(text, 'utf8').digest('hex');
}

/**
 * calcula el HMAC-SHA256
 * @param {string} key - Clave secreta
 * @param {string} message - Mensaje a autenticar
 * @returns {string} - HMAC en formato hexadecimal
 */
function getHMAC_SHA256(key, message) {
  // se crea el hmac usando la clave secreta y retorna en hexadecimal
  return crypto.createHmac('sha256', key).update(message, 'utf8').digest('hex');
}



// ======================== EJEMPLO ========================

const textoOriginal = "Hola mundor";
const hashSHA256 = getSHA256Hash(textoOriginal);

console.log("=== HASHING ===");
console.log("Texto original:", textoOriginal);
console.log("Hash SHA-256:  ", hashSHA256);




//  ======================== EJEMPLO MAC ========================

// clave secreta y el mensaje
const claveSecreta = "PUCESE";
const mensaje = "Mensaje cifrado";

// generar hmac
const hmac = getHMAC_SHA256(claveSecreta, mensaje);

// formato de guardado de archivo
const mensajeAutenticado = {
  mensaje: mensaje,
  hmac: hmac
};

// guardar en un archivo local
const archivoMAC = path.join(__dirname, 'mensaje_autenticado.json');
fs.writeFileSync(archivoMAC, JSON.stringify(mensajeAutenticado, null, 2));

console.log("\n=== MAC (Message Authentication Code) ===");
console.log("Mensaje original:", mensaje);
console.log("Clave secreta :", claveSecreta);
console.log("HMAC-SHA256:", hmac);
console.log(`\nEl archivo '${archivoMAC}' ha sido creado con el mensaje autenticado.`);





// ======================== VALIDACIÓN DEL MENSAJE AUTENTICADO ========================



// lee el archivo y verifica la autenticidad del mensaje
const datosLeidos = JSON.parse(fs.readFileSync(archivoMAC, 'utf8'));

// recalcula el hmac del mensaje leido
const hmacVerificacion = getHMAC_SHA256(claveSecreta, datosLeidos.mensaje);

// comprueba si el hmac es válido
const esValido = hmacVerificacion === datosLeidos.hmac;

console.log("\n=== VERIFICACION DE AUTENTICIDAD ===");
console.log("HMAC recibido:   ", datosLeidos.hmac);
console.log("HMAC calculado:  ", hmacVerificacion);
console.log("Son iguales los manesajes?", esValido ? "Si" : "No");

/*
  Para ver más detalles acerca de este codigo, revisa el archivo llamado readme.md
*/