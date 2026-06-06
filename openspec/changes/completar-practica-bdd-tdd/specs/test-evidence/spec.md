## ADDED Requirements

### Requirement: Escenarios BDD ejecutables

El proyecto SHALL expresar los comportamientos criticos mediante Gherkin y
SHALL automatizarlos con Cypress.

#### Scenario: Ejecucion de aceptacion

- **WHEN** el equipo ejecuta la suite de aceptacion propia
- **THEN** solo se ejecutan escenarios y pruebas pertenecientes a BuscaSofa
- **THEN** todas las pruebas finalizan correctamente

### Requirement: Pruebas unitarias AAA

Las pruebas Jest y React Testing Library MUST separar claramente las fases
Arrange, Act y Assert.

#### Scenario: Ejecucion de pruebas unitarias

- **WHEN** el equipo ejecuta la suite unitaria
- **THEN** las pruebas de logout y regresion finalizan correctamente

### Requirement: Evidencia TDD verificable

El ciclo TDD de logout MUST estar representado mediante commits separados RED,
GREEN y REFACTOR.

#### Scenario: Auditoria del historial Git

- **WHEN** se revisa el historial de logout
- **THEN** existen commits identificables para BDD, RED, GREEN y REFACTOR
