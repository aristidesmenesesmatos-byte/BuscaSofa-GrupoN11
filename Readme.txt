ACTIVIDAD GRUPAL - GRUPO N11

Integrantes:

* Cristina García Gómez-Pastrana
* Aristides Jose Meneses Matos
* Francisco Javier Gumiel Espinosa

INSTRUCCIONES DE EJECUCIÓN

1. Ejecutar el backend

Abrir una terminal en la carpeta:

buscasofa-server-main

Ejecutar:

npm install
npm run dev

Debe aparecer un mensaje similar a:

Servidor backend (SQLite) en http://localhost:4000

2. Ejecutar el frontend

Abrir una segunda terminal en la carpeta:

buscasofa-main

Ejecutar:

npm install
npm run dev

Debe aparecer una dirección similar a:

http://localhost:5173

3. Abrir la aplicación

Abrir en el navegador:

http://localhost:5173

4. Ejecutar las pruebas automáticas (opcional)

Abrir una terminal en:

buscasofa-main

Ejecutar:

npx cypress run

o para abrir la interfaz gráfica de Cypress:

npx cypress open
