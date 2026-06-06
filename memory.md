# memory.md

## Decisiones tomadas

- **2026-06-06 - Mantener React + Vite**: el requisito admite React/Next.js y el
  MVP existente ya usa React.
- **2026-06-06 - Jest/RTL y Cypress/Cucumber**: Jest + React Testing Library
  cubriran unitarias/componentes; Cypress + Gherkin cubrira aceptacion.
- **2026-06-06 - No falsear TDD previo**: el historial no contiene ciclos
  Red-Green-Refactor verificables.
- **2026-06-06 - Metodologia solo local**: OpenSpec, RUNE y estado de sesion no
  se subiran al repositorio compartido.
- **2026-06-06 - Reutilizar el MVP actual**: se aplicara TDD a cambios y
  refactorizaciones nuevas.
- **2026-06-06 - Continuar el producto existente**: se descarta el comparador
  aislado. Cristina completara logout porque es una funcionalidad pendiente
  pequena que permite demostrar un ciclo TDD/BDD real.
- **2026-06-06 - Alcance minimo basado en el Word**: el enunciado oficial no
  exige dos funcionalidades nuevas, Gherkin, Jest ni commits con nombres
  concretos. Perfil queda fuera del alcance.
- **2026-06-06 - Decisiones de alcance**: Cypress usara interceptaciones; logout
  conservara cache y ruta actual; perfil, Docker, restauracion de sesion y
  corregir todo el lint heredado quedan fuera de alcance.

## Hallazgos tecnicos

- El frontend compila con `npm run build`.
- El backend `index_dev.js` arranca con SQLite.
- Funcionalidades existentes: resumen de precios, listado, filtros, orden,
  paginacion, mapa por radio, detalle, registro, login, comentarios y rating.
- Hay 4 escenarios Gherkin y 15 pruebas Cypress propias.
- `resultado.txt` muestra una ejecucion anterior con 5 pruebas fallidas.
- Cypress ejecuta ademas 19 ficheros de ejemplo ajenos a BuscaSofa.
- `About.cy.jsx` espera contenido que el componente no contiene.
- `Header.handleLogout` no elimina token ni actualiza el usuario.
- `StationDetail` usa `location.state` sin comprobar si existe.
- `secret.js` contiene un secreto JWT versionado y mezcla ESM con CommonJS.
- La rama `feature/add-docker-compose` corrige `secret.js` y anade Docker.
- La instalacion reporto 31 vulnerabilidades frontend y 16 backend.
- El cambio OpenSpec `implementar-evidencia-tdd-bdd` pasa validacion estricta y
  contiene propuesta, diseno, especificacion delta y tareas.
- Los contratos RUNE `filtrarEstaciones`, `calcularPrecioMedio` y `cerrarSesion`
  pasan validacion estructural y semantica inicial.
- El `.gitignore` raiz deja como unico archivo nuevo visible para Git el propio
  `.gitignore`; el codigo del producto no queda ignorado.
- La auditoria BDD confirma que 113 de las 132 pruebas guardadas son ejemplos de
  Cypress. Las pruebas propias son 15 E2E, 4 escenarios Gherkin y 1 prueba de
  componente.
- Las pruebas actuales de Header pasan; los problemas reales a estabilizar son
  NotFound, registro y login por dependencias externas y falta de aislamiento.
- El lint actual falla con 802 errores y debe abordarse como tarea de calidad.
- La memoria debe dedicar aproximadamente la mitad de su contenido a pruebas,
  porque pruebas y codigo representan el 50 por ciento de la rubrica.

## Riesgos detectados

- Riesgo academico alto: ausencia total de pruebas unitarias Jest/RTL.
- Riesgo academico medio: historial Git sin evidencia Red-Green-Refactor.
- Riesgo de calidad: pruebas de ejemplo inflan artificialmente la suite.
- Riesgo de seguridad: secreto JWT en codigo fuente y dependencias vulnerables.
- Riesgo funcional: pruebas dependientes de API externa y backend real.
- Riesgo de entrega: no existe todavia la memoria Word exigida.

## Estado de ultima sesion

- **Fecha**: 2026-06-06.
- **Resumen**: Se estabilizaron las pruebas Cypress propias excluyendo las de ejemplos y añadiendo mocks temporales a la API de hidrocarburos. Se implementó un ciclo TDD en verde completo (Jest) y BDD (Cypress) para el cierre de sesión, manteniendo la simplicidad exigida (Nivel 3). Se limpiaron metadatos redundantes y ejemplos no deseados del repositorio.
- **Siguiente paso**: Hacer push de los avances para que el resto del equipo pueda clonar, verificar el proyecto y adjuntar las capturas a la memoria redactada para la entrega.
