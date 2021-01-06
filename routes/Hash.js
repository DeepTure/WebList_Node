// Devuelve si el navegador es compatible con crypto api
function supportsCrypto () {
    return window.crypto && crypto.subtle && window.TextEncoder;
    }

//generamos la funcion HASH
function hash (algo, str) {
    return crypto.subtle.digest(algo, new TextEncoder().encode(str));
    }
    
    hash('SHA-256', 'Hello').then(hashed => {
    console.log(hashed); // ArrayBuffer
    console.log(hex(hashed)); // 185f8db32271fe25f561a6fc938b2e264306ec304eda518007d1764826381969
    console.log(encode64(hashed)); // GF+NsyJx/iX1Yab8k4suJkMG7DBO2lGAB9F2SCY4GWk=
    });
    
    // funcion hex para ArrayBuffer
function hex (buff) {
    return [].map.call(new Uint8Array(buff), b => ('00' + b.toString(16)).slice(-2)).join('');
    }
    
    // codificar Base64 
function encode64 (buff) {
    return btoa(new Uint8Array(buff).reduce((s, b) => s + String.fromCharCode(b), ''));
    }

// Numeros random
var values = crypto.getRandomValues(new Uint8Array(12));
console.log(values); // [216, 35, 236, 7, 193, 158, 115, 140, 64, 74, 177, 155]

// generar clave desde la contraseña
async function genEncryptionKey (password, mode, length) {
    var algo = {
    name: 'PBKDF2',
    hash: 'SHA-256',
    salt: new TextEncoder().encode('a-unique-salt'),
    iterations: 1000
    };
    var derived = { name: mode, length: length };
    var encoded = new TextEncoder().encode(password);
    var key = await crypto.subtle.importKey('raw', encoded, { name: 'PBKDF2' }, false, ['deriveKey']);
    
    return crypto.subtle.deriveKey(algo, key, derived, false, ['encrypt', 'decrypt']);
    }

// funcion encriptar
async function encrypt (text, password, mode, length, ivLength) {
    var algo = {
    name: mode,
    length: length,
    iv: crypto.getRandomValues(new Uint8Array(ivLength))
    };
    var key = await genEncryptionKey(password, mode, length);
    var encoded = new TextEncoder().encode(text);
    
    return {
    cipherText: await crypto.subtle.encrypt(algo, key, encoded),
    iv: algo.iv
    };
    }
    
    encrypt('Secret text', 'password', 'AES-GCM', 256, 12).then(encrypted => {
    console.log(encrypted); // { cipherText: ArrayBuffer, iv: Uint8Array }
    });

// funcion desencriptar
async function decrypt (encrypted, password, mode, length) {
    var algo = {
    name: mode,
    length: length,
    iv: encrypted.iv
    };
    var key = await genEncryptionKey(password, mode, length);
    var decrypted = await crypto.subtle.decrypt(algo, key, encrypted.cipherText);
    
    return new TextDecoder().decode(decrypted);
    }
    
    (async () => {
    var mode = 'AES-GCM',
    length = 256,
    ivLength = 12;
    
    var encrypted = await encrypt('Secret text', 'password', mode, length, ivLength);
    console.log(encrypted); // { cipherText: ArrayBuffer, iv: Uint8Array }
    
    var decrypted = await decrypt(encrypted, 'password', mode, length);
    console.log(decrypted); // Secret text
    })();