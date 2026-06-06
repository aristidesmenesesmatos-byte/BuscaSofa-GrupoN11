# AGENTS.md - Instrucciones locales de BuscaSofa

## Contexto del proyecto

- **Nombre**: BuscaSofa - Grupo N11.
- **Objetivo**: entregar un MVP universitario para consultar precios de
  combustible, demostrando BDD y ciclos TDD Red-Green-Refactor.
- **Frontend**: React 19, Vite 6, JavaScript/TypeScript, React Router y Leaflet.
- **Backend**: Node.js, Express y SQLite para desarrollo local.
- **Pruebas objetivo**: Jest + React Testing Library para pruebas unitarias y
  Cypress + Cucumber/Gherkin para aceptacion.
- **Tipo**: aplicacion web full-stack.

## Convenciones

- Variables y funciones: `camelCase`.
- Componentes React y tipos: `PascalCase`.
- Usar componentes funcionales y Hooks.
- Extraer la logica de negocio pura fuera de los componentes para facilitar TDD.
- Frontend en `buscasofa-main/`; backend en `buscasofa-server-main/`.
- Pruebas unitarias en `src/**/*.test.{js,jsx,ts,tsx}`.
- Escenarios BDD en `buscasofa-main/cypress/e2e/features/`.

## Metodologia obligatoria

El proyecto sigue RUNE + OpenSpec:

1. Para un comportamiento nuevo, escribir primero el escenario Gherkin.
2. Antes de codificar logica clave, crear o validar su contrato `.rune`.
3. Crear una prueba ejecutable que falle: fase RED.
4. Implementar el minimo codigo necesario: fase GREEN.
5. Refactorizar solo con la suite verde: fase REFACTOR.
6. Mantener trazabilidad local en `plan.md`, `memory.md`, `ops-rules.md` y
   `soul.md`.
7. Al cerrar sesion, ejecutar `closeout_checklist.md`.

## Reglas de comportamiento

- Responder siempre en espanol.
- Evidencia antes que teoria.
- Reproducir errores mediante CLI antes de diagnosticarlos.
- Eliminar logs temporales al resolver un problema.
- No sobreingenieria.
- No crear ramas; trabajar sobre `main` y aplicar fix-forward.
- No afirmar que el codigo previo se creo con TDD si no existe evidencia Git.
- No subir artefactos internos de metodologia o sesion al repositorio compartido.

## Seguridad

- No guardar credenciales, tokens o secretos en codigo fuente.
- Validar entradas en las fronteras del sistema.
- Revisar dependencias vulnerables antes de entregar.

## Restricciones de entrega

- La memoria final no puede exceder 10 paginas.
- Debe incluir introduccion, pruebas, manual de usuario y enlace al repositorio.
- El repositorio compartido debe contener solo producto, pruebas, documentacion
  de entrega y configuracion necesaria para ejecutarlo.
