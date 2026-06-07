import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor"

const randomUser = () => ({
  username: `testuser${Date.now()}`,
  email: `test${Date.now()}@mail.com`,
  password: 'Test1234!'
});

let user;

Given('el usuario navega a la página de registro', () => {
  user = randomUser();
  cy.visit('/registro').wait(5000);
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

// Autenticación
Given('el usuario está autenticado', () => {
  cy.visit('/login');
});

When('completa el formulario de login con credenciales válidas 2', () => {
  cy.get('input[name="email"]').type(user.email);
  cy.get('input[name="password"]').type(user.password);
});

When('envía el formulario de login 2', () => {
  cy.get('form').submit();
});

// Navegación
When('navega a la página de perfil', () => {
  cy.visit('/perfil').wait(2000);
});

// Verificaciones de vista
Then('ve sus datos de usuario mostrados', () => {
  cy.fixture('user-profile').then((user) => {
    cy.pause(20000);
    cy.get('h1').should('contain', 'Mi Perfil');
    cy.contains('testuser').should('exist');
    cy.contains('testuser@example.com').should('exist');
  });
});

Then('ve los botones de editar y eliminar', () => {
  cy.get('button').contains(/editar/i).should('exist');
  cy.get('button').contains(/eliminar/i).should('exist');
});

// Edición
When('hace clic en el botón de editar', () => {
  cy.get('button').contains(/editar/i).click();
});

When('cambia el username a {string}', (newUsername) => {
  cy.get('input[name="username"]').clear().type(newUsername);
});

When('hace clic en guardar', () => {
  cy.get('button').contains(/guardar/i).click();
});

Then('ve un mensaje de éxito', () => {
  cy.contains(/actualizado correctamente/i, { timeout: 5000 }).should('exist');
});

Then('ve los datos actualizados', () => {
  cy.contains('nuevouser123').should('exist');
});

// Cancelación
When('hace clic en cancelar', () => {
  cy.get('button').contains(/cancelar/i).click();
});

Then('vuelve a la vista normal sin cambios', () => {
  cy.get('button').contains(/editar/i).should('exist');
  cy.get('button').contains(/eliminar/i).should('exist');
});

// Eliminación
When('hace clic en el botón de eliminar cuenta', () => {
  cy.get('button').contains(/eliminar/i).click();
});

When('confirma la eliminación', () => {
  cy.on('window:confirm', () => true);
});

Then('el usuario es eliminado', () => {
  cy.url({ timeout: 5000 }).should('include', '/');
});

// Mensajes de error
Then('ve un mensaje de error de autenticación', () => {
  cy.contains(/token inválido|no autenticado/i, { timeout: 5000 }).should('exist');
});

Then('es redirigido a login', () => {
  cy.url({ timeout: 5000 }).should('include', '/login');
});

Then('ve un mensaje de usuario no encontrado', () => {
  cy.contains(/usuario no encontrado/i, { timeout: 5000 }).should('exist');
});