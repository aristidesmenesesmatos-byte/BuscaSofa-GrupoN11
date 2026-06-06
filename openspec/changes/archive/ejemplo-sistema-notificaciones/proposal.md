# Propuesta: Sistema de Notificaciones por Email

## Resumen

Implementar un sistema de envio de notificaciones por email que permita
a la aplicacion enviar correos transaccionales (confirmacion de registro,
restablecimiento de contrasena, alertas) de forma asincrona.

## Motivacion

Actualmente las notificaciones se envian de forma sincrona dentro del
controlador HTTP, lo que bloquea la respuesta al usuario y causa timeouts
cuando el servidor SMTP tarda en responder.

## Alcance

### Incluido
- Servicio de envio asincrono de emails
- Plantillas de email configurables (HTML)
- Cola de reintentos para envios fallidos (max 3 reintentos)
- Log de todos los envios (exitosos y fallidos)

### Excluido
- Notificaciones push (fase 2)
- Notificaciones SMS (fuera de alcance)
- Panel de administracion de plantillas (se editan en fichero)

## Impacto

- Archivos nuevos: 4 (servicio, cola, plantillas, tests)
- Archivos modificados: 2 (controlador de registro, configuracion)
- Dependencias nuevas: 1 (libreria de templates)
