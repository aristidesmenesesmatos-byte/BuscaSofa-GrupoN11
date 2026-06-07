Feature: Cierre de sesión

  Scenario: El usuario autenticado cierra sesión
    Given el usuario ha iniciado sesión
    When el usuario hace clic en "Cerrar sesión"
    Then debería ver el enlace "Login"
    And debería ver el enlace "Registro"
    And no debería ver el botón "Cerrar sesión"
