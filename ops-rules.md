# ops-rules.md

## Entorno

- **Tipo**: entorno local Windows compartido con el repositorio del grupo.
- **Restricciones**: no matar procesos ajenos, no dejar servidores activos, no
  ejecutar la suite Cypress completa salvo necesidad y no modificar el historial
  del companero.

## Excepciones activas

- **OPS-001**: OpenSpec, RUNE y archivos de sesion no se versionan porque la
  usuaria exige que no suba material interno de IA al repositorio compartido.
- **OPS-002**: se permite reutilizar codigo anterior a TDD porque el MVP ya
  existia antes de adoptar el prompt maestro.

## Restricciones temporales

- Trabajar directamente sobre `main`; no crear ramas nuevas.
- No fusionar `origin/feature/add-docker-compose` sin revisar su impacto.
- No realizar commits ni push hasta que Cristina lo solicite.

## Hallazgos de runtime

- `npm run build` requiere ejecucion fuera del sandbox por `esbuild`; fuera del
  sandbox compila correctamente.
- La instalacion de dependencias necesita acceso de red.
- El backend SQLite arranca correctamente en el puerto 4000.
- Habia procesos Node ajenos activos; no se han detenido.
