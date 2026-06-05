import React from 'react';

function About() {
    return (
        <div style={{ padding: '2rem' }}>
            <h1>Acerca de nosotros</h1>

            <p>
                Somos el Grupo N11 de la Universidad Internacional de La Rioja (UNIR).
            </p>

            <h2>Miembros del equipo:</h2>

            <ul>
                <li>Manuel Martínez López</li>
                <li>Cristina García Gómez-Pastrana</li>
                <li>Aristides Jose Meneses Matos</li>
                <li>Francisco Javier Gumiel Espinosa</li>
            </ul>

            <h2>Descripción del proyecto</h2>

            <p>
                BuscaSofá es una aplicación web desarrollada para facilitar la consulta
                de precios de combustible en estaciones de servicio de España.
            </p>

            <p>
                La aplicación permite buscar estaciones de servicio, consultar
                precios actualizados de distintos combustibles y visualizar su
                ubicación mediante un mapa interactivo.
            </p>

            <p>
                Este proyecto ha sido desarrollado por el Grupo N11 como parte de
                las actividades prácticas de la asignatura, utilizando tecnologías
                como React, Node.js, Express, SQLite y Cypress para el desarrollo,
                validación y pruebas de la aplicación.
            </p>
        </div>
    );
}

export default About;