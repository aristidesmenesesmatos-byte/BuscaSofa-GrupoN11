# Diseno tecnico: Completar practica BDD/TDD

## Principios

- Conservar las funcionalidades existentes y evitar reescrituras innecesarias.
- Tratar las pruebas nuevas sobre codigo existente como pruebas de regresion.
- Reservar la afirmacion de TDD autentico para logout, porque aun no esta
  implementado.
- Crear primero Gherkin, despues pruebas RED, despues codigo GREEN y finalmente
  refactorizacion.
- Mantener OpenSpec, RUNE y estado de sesion fuera del repositorio compartido.

## Decisiones cerradas de alcance

- Cypress simulara la API publica y las respuestas de autenticacion mediante
  fixtures/interceptaciones; no dependera de Internet ni del backend real.
- Los ejemplos estandar de Cypress se excluiran de la ejecucion oficial sin
  presentarlos como pruebas del producto.
- Logout eliminara solo `token`, conservara la cache `buscasofaData`, actualizara
  el estado de usuario y mantendra la ruta actual.
- Restaurar automaticamente la sesion tras recargar queda fuera de alcance.
- Docker queda fuera del alcance de la practica salvo decision posterior del grupo.
- El perfil de usuario queda fuera de alcance porque el enunciado no exige dos
  funcionalidades nuevas.

## Arquitectura de pruebas

### Aceptacion BDD

- Cypress + Cucumber/Gherkin.
- Escenarios centrados en comportamiento observable.
- Fixtures e interceptaciones para evitar dependencia de API externa.
- Ejecucion separada de los ejemplos incluidos por Cypress.
- Los escenarios de registro y login seran independientes.
- El escenario de pagina no encontrada utilizara la ruta recibida y una API
  simulada para no esperar la descarga externa.

### Unitarias y componentes

- Jest + React Testing Library + jsdom.
- Patron AAA visible en cada prueba.
- Pruebas de regresion: una funcion pura y un componente existente elegidos.
- No se probara inicialmente `FuelMap` por el coste de simular Leaflet y
  geolocalizacion.
- Pruebas TDD: cierre de sesion.

## Ciclo TDD 1: Cierre de sesion

1. Escribir escenario Gherkin de usuario autenticado que cierra sesion.
2. Crear pruebas RED de la logica de sesion y del Header.
3. Implementar eliminacion del token y actualizacion del estado de usuario.
4. Refactorizar la gestion de sesion fuera de la presentacion.

Quedan fuera de alcance el perfil, nuevos endpoints backend, Docker, corregir
todo el lint heredado y la persistencia del usuario tras recargar.

## Trabajo paralelo

- Pruebas existentes: estabilizar Cypress/Gherkin y separar ejemplos.
- Ciclo TDD: configurar Jest/RTL e implementar cierre de sesion.
- Entrega: verificar el producto y redactar la memoria Word.

## Politica de commits

La funcionalidad TDD debe contener commits pequenos y comprensibles:

1. `docs(bdd): ...`
2. `test(...): ... (RED)`
3. `feat(...): ... (GREEN)`
4. `refactor(...): ... (REFACTOR)`

No se reescribira el historial previo ni se afirmara que el MVP existente fue
creado originalmente mediante TDD. Esta politica ayuda a mostrar el proceso,
pero los nombres concretos de commit no son un requisito literal del Word.
