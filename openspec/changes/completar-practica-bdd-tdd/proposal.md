## Why

BuscaSofa ya dispone de un MVP funcional desarrollado por el equipo, pero la
entrega aun no contiene pruebas unitarias ni una memoria final. El enunciado
oficial pide pruebas adecuadas para las funcionalidades implementadas, pero no
exige desarrollar dos funcionalidades nuevas. Se completara una funcionalidad
pequena pendiente mediante TDD y se estabilizara la evidencia de pruebas del MVP
sin reescribir el trabajo existente.

## What Changes

- Estabilizar y separar las pruebas Cypress/Gherkin propias de BuscaSofa.
- Incorporar Jest y React Testing Library para pruebas unitarias y de componentes.
- Implementar cierre de sesion mediante un ciclo BDD/TDD completo.
- Anadir pruebas de regresion sobre logica existente sin presentarlas como TDD.
- Ejecutar build y pruebas finales con evidencia reproducible.
- Redactar una memoria Word de maximo 10 paginas con introduccion, pruebas,
  manual de usuario y repositorio.

## Capabilities

### New Capabilities

- `auth-session`: cierre de sesion y representacion coherente del estado autenticado.
- `test-evidence`: estrategia reproducible de BDD, TDD, regresion y resultados.
- `delivery-memory`: contenido y evidencias obligatorias de la memoria final.

### Modified Capabilities

- Ninguna. No existen especificaciones OpenSpec previas del producto.

## Impact

- Frontend React: `App.jsx`, `Header.jsx` y un modulo pequeno de sesion.
- Pruebas: nueva configuracion Jest/RTL y nuevos escenarios Gherkin/Cypress.
- Configuracion: scripts npm y patrones de pruebas.
- Documentacion: README de ejecucion y memoria Word final.
- Historial Git: commits pequenos que evidencien el ciclo TDD realizado.
