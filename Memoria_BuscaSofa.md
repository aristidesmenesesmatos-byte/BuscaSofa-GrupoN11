# Memoria del Proyecto: BuscaSofa - Grupo N11

## 1. Introducción
BuscaSofa es una aplicación web MVP (Minimum Viable Product) desarrollada para la consulta de precios de combustible en España. La plataforma permite a los usuarios buscar estaciones de servicio, ver un resumen de precios a nivel nacional o por comunidades autónomas, y registrar sus perfiles.

El desarrollo se ha basado principalmente en la demostración de la aplicación rigurosa de metodologías ágiles de ingeniería de software, en concreto BDD (Behavior-Driven Development) y TDD (Test-Driven Development). La arquitectura técnica es una solución Full-Stack tradicional usando React 19 y Vite en el frontend, y Node.js con Express en el backend. 

Se ha priorizado un diseño pragmático y orientado a resolver la funcionalidad solicitada sin incurrir en sobreingeniería, cumpliendo los objetivos académicos de la asignatura.

---

## 2. Metodología y Pruebas
Dado que la validación y el testing conforman el pilar crítico del aseguramiento de la calidad de este proyecto, se ha invertido la mayor parte del esfuerzo en estabilizar el marco de pruebas y aplicar el ciclo **Red-Green-Refactor**. 

### 2.1 BDD (Behavior-Driven Development)
Para el desarrollo de la funcionalidad de *Cierre de Sesión (Logout)*, el primer paso fue la creación de un escenario de comportamiento escrito en lenguaje natural (Gherkin).

**Archivo: `cypress/e2e/features/logout.feature`**
```gherkin
Feature: Cierre de sesión

  Scenario: El usuario autenticado cierra sesión
    Given el usuario ha iniciado sesión
    When el usuario hace clic en "Cerrar sesión"
    Then debería ver el enlace "Login"
    And debería ver el enlace "Registro"
    And no debería ver el botón "Cerrar sesión"
```

Los "step definitions" de Cypress se enlazaron a estas frases para simular un inicio de sesión previo interactuando con el `localStorage` y la función `cy.intercept` para evitar dependencias inestables con el backend real, comprobando así el flujo completo desde la UI.

> **[INSERTA AQUÍ CAPTURA 1: PRUEBAS BDD EN CYPRESS]**
> *Cómo sacarla:*
> 1. Abre tu terminal en la carpeta `buscasofa-main` y ejecuta: `npm run dev`
> 2. Abre una segunda terminal en la misma carpeta y ejecuta: `npx cypress open`
> 3. En la interfaz gráfica de Cypress elige E2E Testing -> Chrome -> Haz clic en `logout.feature`.
> 4. Saca un pantallazo de los "ticks" verdes que demuestran que la prueba ha pasado.

### 2.2 TDD (Test-Driven Development)
Tras definir el comportamiento, se desarrolló la lógica aislada usando TDD y Jest.

**Fase RED:** 
Se escribieron las pruebas unitarias para la función encargada de destruir el token de sesión. Inicialmente, al ejecutar `npm test`, la prueba fallaba porque la función real no estaba codificada.

**Archivo: `src/auth/cerrarSesion.test.js`**
```javascript
import { cerrarSesion } from './cerrarSesion';

describe('cerrarSesion', () => {
  it('lanza TypeError si storage es null', () => {
    expect(() => cerrarSesion(null, jest.fn())).toThrow(TypeError);
  });

  it('elimina el token y llama al callback con null', () => {
    const storage = { getItem: jest.fn(), setItem: jest.fn(), removeItem: jest.fn() };
    const callback = jest.fn();
    cerrarSesion(storage, callback);
    expect(storage.removeItem).toHaveBeenCalledWith('token');
    expect(callback).toHaveBeenCalledWith(null);
  });
});
```

**Fase GREEN:**
Una vez definida la prueba, se codificó la función con el código mínimo para hacerla pasar:
```javascript
export function cerrarSesion(storage, actualizarUsuario) {
  if (!storage || typeof actualizarUsuario !== 'function') {
    throw new TypeError('dependencias de sesion invalidas');
  }
  storage.removeItem('token');
  actualizarUsuario(null);
}
```

**Fase REFACTOR:**
Finalmente, se refactorizó el código de `App.jsx` y `Header.jsx` para integrar esta función. Al volver a ejecutar la suite de pruebas mediante la línea de comandos, todo se mantuvo en estado Verde confirmando la estabilización del código y componentes de React integrados.

> **[INSERTA AQUÍ CAPTURA 2: PRUEBAS TDD VERDES]**
> *Cómo sacarla:*
> 1. En la terminal de la carpeta `buscasofa-main` ejecuta: `npm test`
> 2. Saca un pantallazo donde se vea el texto en verde `PASS src/auth/cerrarSesion.test.js` y `PASS src/components/Header.test.jsx`.

---

## 3. Manual de Usuario

### Instalación y Ejecución Local
1. Instalar dependencias mediante la terminal en el directorio raíz:
   `npm install`
2. Arrancar el servidor local de desarrollo:
   `npm run dev`
3. Acceder en el navegador a: `http://localhost:5173/`

### Funcionalidades principales
- **Home / Resumen**: Al abrir la aplicación, se mostrará una tabla resumen con los precios medios nacionales del Gasóleo A y Gasolina 95, y su desglose por comunidades autónomas.
- **Registro y Login**: En la parte superior derecha se encuentran los botones para registrar un usuario nuevo y loguearse.
- **Cierre de sesión**: Una vez autenticado (verás el mensaje "Bienvenido, usuario"), aparecerá el botón "Cerrar sesión". Al hacer clic, el token se borra y la aplicación retorna a la vista pública.

> **[INSERTA AQUÍ CAPTURA 3: INTERFAZ WEB CERRAR SESIÓN]**
> *Cómo sacarla:*
> 1. Con el comando `npm run dev` activo, abre tu navegador en `http://localhost:5173/`
> 2. Ve a la pestaña Login y pon un email y contraseña aleatorios, la aplicación te dará la bienvenida simulando el inicio.
> 3. Saca un pantallazo donde se vea claramente el menú superior de la web con el botón "Cerrar sesión" implementado.

---

## 4. Enlace al Repositorio

Todo el código fuente, histórico de versiones y recursos asociados a la práctica se encuentran disponibles en el repositorio proporcionado por el grupo:

**GitHub URL:** https://github.com/aristidesmenesesmatos-byte/BuscaSofa-GrupoN11

*(Nota: En la rama `main` se encuentra el código estable que incluye todas las implementaciones mencionadas).*
