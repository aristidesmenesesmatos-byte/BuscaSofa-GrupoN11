# Plan de trabajo: completar practica BDD/TDD

## Regla de coordinacion

- No modificar el trabajo existente salvo lo imprescindible para estabilizar
  pruebas o conectar el cierre de sesion.
- No afirmar que el codigo previo fue desarrollado con TDD.
- OpenSpec, RUNE y documentos internos permanecen locales.
- Trabajar en `main` mediante cambios pequenos y comprensibles.

## Linea 1: Pruebas existentes

- Separar las pruebas propias de los ejemplos incluidos por Cypress.
- Estabilizar una seleccion pequena de pruebas de aceptacion del producto.
- Simular las dependencias externas que vuelven inestables las pruebas.
- Documentar estas pruebas como cobertura de aceptacion o regresion, no como un
  ciclo TDD previo.

## Linea 2: Ciclo TDD de cierre de sesion

- Escribir primero el escenario Gherkin de cierre de sesion.
- Configurar Jest y React Testing Library.
- Crear una prueba RED basada en `specs/cerrar_sesion.rune`.
- Implementar el minimo codigo necesario para alcanzar GREEN.
- Aplicar una refactorizacion pequena con las pruebas verdes.
- Conectar logout con el estado de usuario sin anadir nuevas pantallas.

## Linea 3: Entrega

- Ejecutar pruebas unitarias, pruebas de aceptacion propias y build.
- Actualizar las instrucciones de ejecucion y pruebas.
- Redactar la memoria Word de maximo 10 paginas.
- Incluir capturas reales, resultados de pruebas y enlace al repositorio.

## Fuera de alcance

- Perfil de usuario.
- Nuevos endpoints backend.
- Docker.
- Persistencia de sesion tras recargar.
- Resolver todos los avisos de lint y vulnerabilidades heredados.

## Criterio Done

- OpenSpec y el contrato RUNE de logout son validos.
- Las pruebas seleccionadas del producto pasan de forma reproducible.
- Existe una prueba unitaria RED seguida de implementacion GREEN para logout.
- El build de produccion pasa.
- La memoria contiene portada, indice, introduccion, pruebas, manual y enlace.
- La memoria no supera 10 paginas.
