## ADDED Requirements

### Requirement: Cierre de sesion

El sistema SHALL permitir que un usuario autenticado cierre su sesion. Al
cerrarla, el sistema MUST eliminar la credencial local y MUST actualizar la
interfaz al estado no autenticado.

#### Scenario: Usuario autenticado cierra sesion

- **WHEN** un usuario autenticado pulsa el boton "Cerrar sesion"
- **THEN** el sistema elimina el token almacenado
- **THEN** el sistema oculta el nombre del usuario
- **THEN** el sistema muestra los enlaces de login y registro

#### Scenario: Cierre de sesion repetido

- **WHEN** se solicita cerrar sesion sin existir un token almacenado
- **THEN** el sistema permanece no autenticado sin producir un error

### Requirement: Estado de sesion coherente

El Header SHALL representar el mismo estado autenticado mantenido por la
aplicacion.

#### Scenario: Login correcto actualiza el Header

- **WHEN** el usuario inicia sesion correctamente
- **THEN** el Header muestra el nombre del usuario y la opcion de cerrar sesion
