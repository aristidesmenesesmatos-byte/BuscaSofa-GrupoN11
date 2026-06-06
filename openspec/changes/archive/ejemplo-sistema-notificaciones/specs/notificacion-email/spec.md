# Spec: Notificacion por Email

## Reglas de negocio

### Envio de email
- El sistema DEBE enviar emails de forma asincrona (no bloquear el hilo HTTP)
- Cada email DEBE usar una plantilla HTML del directorio `templates/email/`
- Las variables en la plantilla se sustituyen por los datos del contexto

### Plantillas soportadas
| Tipo | Archivo | Variables requeridas |
|------|---------|---------------------|
| Registro | `registro.html` | `nombre`, `enlace_confirmacion` |
| Reset password | `reset_password.html` | `nombre`, `enlace_reset`, `minutos_expiracion` |
| Alerta | `alerta.html` | `titulo`, `mensaje`, `nivel` |

### Reintentos
- Si el envio falla, se reintenta hasta 3 veces
- Backoff exponencial: 1s, 5s, 25s entre reintentos
- Tras 3 fallos, el email queda en estado FALLIDO con el detalle del error

### Logging
- TODO envio (exitoso o fallido) se registra en la tabla `log_notificaciones`
- Los campos `tipo`, `destinatario`, `asunto`, `estado` son obligatorios

### Validaciones
- El destinatario DEBE ser un email valido (formato RFC 5322)
- El asunto no puede estar vacio
- El tipo debe ser uno de: REGISTRO, RESET_PASSWORD, ALERTA
