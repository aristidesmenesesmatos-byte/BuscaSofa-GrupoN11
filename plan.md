# plan.md

## Objetivo actual

Completar la practica sobre BuscaSofa conservando el MVP existente y demostrando
BDD/TDD mediante las pruebas del producto y un ciclo autentico, pequeno y
defendible para cierre de sesion. El trabajo se coordina localmente con
OpenSpec/RUNE.

## Estado observado

- La aplicacion React compila correctamente.
- El backend SQLite arranca y expone registro, login y comentarios.
- Existen 4 escenarios Gherkin y 15 pruebas Cypress propias.
- No existen pruebas unitarias Jest + React Testing Library.
- Las pruebas Cypress incluyen ejemplos ajenos al producto y una ejecucion
  anterior registra 5 fallos.
- Casi todo el producto esta contenido en un unico commit, sin evidencia
  historica de ciclos TDD.
- Existe una rama remota pendiente con Docker Compose.

## Tareas pendientes

- [x] Ejecutar el cambio OpenSpec `completar-practica-bdd-tdd`.
- [x] Estabilizar y separar las pruebas BDD/Cypress propias.
- [x] Configurar Jest y React Testing Library.
- [x] Ejecutar ciclo BDD/RED/GREEN/REFACTOR de cierre de sesion.
- [x] Anadir pocas pruebas de regresion seleccionadas sobre codigo existente.
- [x] Integrar y ejecutar build y pruebas finales.
- [x] Redactar y renderizar la memoria final con capturas reales.

## Siguiente paso ejecutable

Pasar el relevo a los companeros de grupo para que revisen el codigo, añadan sus propias capturas a la memoria y entreguen la practica.

## Historial de sesiones

### Sesion 2026-06-06

- Se descargo y audito el repositorio.
- Se leyo el enunciado oficial de la actividad.
- Se contrasto el proyecto con el prompt maestro TDD/BDD.
- Se verifico que frontend compila y backend SQLite arranca.
- Se preparo la metodologia local OpenSpec + RUNE.
- Se creo un `.gitignore` raiz para evitar subir artefactos internos.
- OpenSpec quedo validado en modo estricto con 4/4 artefactos completos.
- Los contratos RUNE iniciales quedaron validados.
- Git solo muestra `.gitignore` como archivo nuevo compartible.
- La segunda lectura del Word oficial confirma que no se exigen dos
  funcionalidades nuevas; se elimina perfil del alcance.
- Pendiente: implementar el ciclo TDD/BDD y redactar la memoria final.
