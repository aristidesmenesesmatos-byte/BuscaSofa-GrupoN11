export function cerrarSesion(storage, actualizarUsuario) {
  if (!storage || typeof actualizarUsuario !== 'function') {
    throw new TypeError('dependencias de sesion invalidas');
  }
  storage.removeItem('token');
  actualizarUsuario(null);
}
