# Diseno Tecnico: Sistema de Notificaciones

## Arquitectura

```
Controlador HTTP
     |
     v
NotificacionService (asincrono)
     |
     +---> TemplateEngine (renderiza HTML)
     |
     +---> EmailSender (envia via SMTP)
     |
     +---> ColaReintentos (si falla, reintenta max 3 veces)
     |
     +---> LogNotificaciones (registra todo)
```

## Decisiones tecnicas

| Decision | Opcion elegida | Alternativas descartadas | Razon |
|----------|---------------|------------------------|-------|
| Asincronia | Cola en memoria + worker thread | RabbitMQ, Redis | Simplicidad, proyecto pequeno |
| Templates | Archivos .html con placeholders | BD, API externa | Facilidad de edicion |
| Reintentos | Max 3, backoff exponencial (1s, 5s, 25s) | Reintento inmediato | Evitar saturar SMTP |
| Logging | Tabla en BD | Fichero plano | Consultable, auditable |

## Modelo de datos

```sql
CREATE TABLE log_notificaciones (
    id          BIGINT PRIMARY KEY AUTO_INCREMENT,
    tipo        VARCHAR(50)  NOT NULL,  -- 'REGISTRO', 'RESET_PASSWORD', 'ALERTA'
    destinatario VARCHAR(254) NOT NULL,
    asunto      VARCHAR(500) NOT NULL,
    estado      VARCHAR(20)  NOT NULL,  -- 'ENVIADO', 'FALLIDO', 'PENDIENTE'
    intentos    INT          DEFAULT 0,
    fecha_creacion DATETIME NOT NULL,
    fecha_envio    DATETIME NULL,
    error_detalle  TEXT     NULL
);
```

## Configuracion

En `application.properties`:
```properties
notificaciones.smtp.host=smtp.empresa.com
notificaciones.smtp.port=587
notificaciones.smtp.usuario=noreply@empresa.com
notificaciones.reintentos.max=3
notificaciones.reintentos.backoff-base-ms=1000
```
