/// <reference types="Cypress" />
import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given('el usuario ha iniciado sesión', () => {
  // Simulamos la respuesta de la API para el login
  cy.intercept('POST', '**/api/login', {
    statusCode: 200,
    body: { token: 'fake-token-123', username: 'TestUser' }
  }).as('loginRequest');

  // Simulamos la API del ministerio para que no se quede bloqueado cargando
  cy.intercept('GET', '**/EstacionesTerrestres/**', {
    body: { ListaEESSPrecio: [] }
  });

  // Realizamos el login real por la interfaz para que React guarde el estado del usuario
  cy.visit('/login');
  cy.get('input[name="email"]').type('test@mail.com');
  cy.get('input[name="password"]').type('Test1234!');
  cy.get('button[type="submit"]').click();

  // Esperamos a que inicie y salte a donde tenga que estar
  cy.contains(/Bienvenido, TestUser|Bienvenido, Testuser/i, { timeout: 5000 }).should('be.visible');
});

When('el usuario hace clic en "Cerrar sesión"', () => {
  cy.get('button').contains('Cerrar sesión').click();
});

Then('debería ver el enlace "Login"', () => {
  cy.get('a.login').should('be.visible').and('contain', 'Login');
});

Then('debería ver el enlace "Registro"', () => {
  cy.get('a.registro').should('be.visible').and('contain', 'Registro');
});

Then('no debería ver el botón "Cerrar sesión"', () => {
  cy.get('button').contains('Cerrar sesión').should('not.exist');
});
