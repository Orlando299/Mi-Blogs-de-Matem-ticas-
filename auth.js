// ============================================================
// auth.js — Verificación de contraseña por hash SHA-256
// ============================================================
// Hash SHA-256 de la contraseña del solucionario.
// La contraseña NO aparece en texto plano en ningún archivo.
const HASH_PASSWORD = '62001979fd0d4f549e8d79785ce333b1500d9630e9954c96d541f785eb6570cd';

async function sha256(texto) {
    const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(texto));
    return Array.from(new Uint8Array(buf))
        .map(b => b.toString(16).padStart(2, '0')).join('');
}

async function verificarPassword() {
    const input = document.getElementById('passwordInput');
    const caja  = document.getElementById('passwordBox');
    const cont  = document.getElementById('soluciones');
    const err   = document.getElementById('errorMsg');
    if (!input || !cont) return;

    const hash = await sha256(input.value);
    if (hash === HASH_PASSWORD) {
        cont.style.display = 'block';
        if (caja) caja.style.display = 'none';
        if (err) err.innerHTML = '';
    } else {
        if (err) err.innerHTML = 'Contraseña incorrecta. Intente de nuevo.';
    }
}

// Permite presionar Enter en el campo de contraseña
document.addEventListener('DOMContentLoaded', function () {
    const input = document.getElementById('passwordInput');
    if (input) {
        input.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') verificarPassword();
        });
    }
});
