import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor"

const randomUser = () => ({
  username: `testuser${Date.now()}`,
  email: `test${Date.now()}@mail.com`,
  password: 'Test1234!'
});

let user;

Given('el usuario navega a la página de registro', () => {
  user = randomUser();

  // Simulamos la API del backend para que no falle por "Failed to fetch"
  cy.intercept('POST', '**/api/register', {
    statusCode: 200,
    body: { message: 'Usuario registrado correctamente' }
  });

  // Interceptamos la API del ministerio para que la app cargue
  cy.intercept('GET', '**/EstacionesTerrestres/**', {
    body: { ListaEESSPrecio: [] }
  });

  cy.visit('/registro');
});

When('completa el formulario de registro con datos válidos', () => {
  cy.get('input[name="username"]').type(user.username);
  cy.get('input[name="email"]').type(user.email);
  cy.get('input[name="password"]').type(user.password);
});

When('envía el formulario de registro', () => {
  cy.get('form').submit();
});

Then('ve un mensaje de confirmación de registro', () => {
  cy.contains(/usuario registrado correctamente|registro exitoso/i, { timeout: 5000 }).should('exist');
});

Given('el usuario navega a la página de login', () => {
  // Simulamos la API del backend
  cy.intercept('POST', '**/api/login', {
    statusCode: 200,
    body: { username: user.username, token: 'fake-token-123' }
  });

  // Interceptamos la API del ministerio
  cy.intercept('GET', '**/EstacionesTerrestres/**', {
    body: { ListaEESSPrecio: [] }
  });

  cy.visit('/login');
});

When('completa el formulario de login con credenciales válidas', () => {
  cy.get('input[name="email"]').type(user.email);
  cy.get('input[name="password"]').type(user.password);
});

When('envía el formulario de login', () => {
  cy.get('form').submit();
});

Then('ve un mensaje de bienvenida', () => {
  cy.contains(/bienvenido|login correcto/i, { timeout: 5000 }).should('exist');
});