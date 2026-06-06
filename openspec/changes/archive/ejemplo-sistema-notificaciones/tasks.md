# Tareas: Sistema de Notificaciones

## Estado: COMPLETADO (Archivado)

### Tarea 1: Crear modelo de datos
- [x] Crear migracion SQL para tabla `log_notificaciones`
- [x] Crear entidad JPA `LogNotificacion`
- [x] Crear repositorio `LogNotificacionRepository`

### Tarea 2: Crear servicio de templates
- [x] Crear directorio `templates/email/`
- [x] Crear plantilla `registro.html`
- [x] Crear plantilla `reset_password.html`
- [x] Crear plantilla `alerta.html`
- [x] Crear `TemplateEngine` que sustituya variables en las plantillas

### Tarea 3: Crear servicio de envio
- [x] Crear `EmailSender` que envie via SMTP con la config de application.properties
- [x] Crear `NotificacionService` que orqueste: template + envio + log
- [x] Implementar cola de reintentos con backoff exponencial
- [x] Registrar cada envio en `log_notificaciones`

### Tarea 4: Integrar en controladores existentes
- [x] Modificar `RegistroController`: usar `NotificacionService` en vez de envio directo
- [x] Modificar `PasswordController`: usar `NotificacionService`

### Tarea 5: Tests
- [x] Test unitario de `TemplateEngine` (sustitucion de variables)
- [x] Test unitario de `NotificacionService` (mock de EmailSender)
- [x] Test de integracion de `ColaReintentos` (simular fallos SMTP)
- [x] Test de validaciones (email invalido, asunto vacio, tipo desconocido)

## Notas de implementacion
- Se uso `@Async` de Spring para la asincronia
- El backoff se implemento con `Thread.sleep()` (suficiente para este volumen)
- Las plantillas usan `${variable}` como sintaxis de sustitucion
