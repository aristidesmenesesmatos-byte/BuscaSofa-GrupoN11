/// <reference types="Cypress" />
import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("el usuario navega a {string}", function (string) {
    // Interceptamos la API del ministerio para que la app no se quede en "Cargando..."
    cy.intercept('GET', '**/EstacionesTerrestres/**', {
        body: { ListaEESSPrecio: [] }
    });
    cy.visit(string);
});


Then("debería ver el texto {string}", function (string) {
    cy.contains(string).should("exist");
});