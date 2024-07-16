const express = require('express');
const router = express.Router();
const app = express();
const dayjs = require('dayjs');

const bodyParser = require('body-parser')

app.use(bodyParser.json());

app.use(express.urlencoded({extended: true }));

app.use(express.json());

router.get("/arts_and_culture_total", (request, response) => {
    const connection3 = require('../db/arts_and_culture')
    const sql2 = `SELECT Usuarios.id, Usuarios.Nombre, Usuarios.Apellido, Usuarios.Dni, Usuarios.Celular, Usuarios.Sexo, Usuarios.Email, Usuarios.Nacimiento, Usuarios.fk_email, Usuarios.fk_inscripciones, Usuarios.fk_cursos, Email.email AS Correo, Email.password AS Clave, Email.admin AS Administrador, Email.correos AS Numero_Correos, Inscripciones.fecha AS Fecha, Inscripciones.alumnos_id AS Alumno, Inscripciones.curso_id AS Curso, curso.titulo AS Titulo, curso.horas AS Hs, curso.portada AS Portada, curso.docentes_id AS Cantidad_Docentes FROM Usuarios JOIN Email ON Usuarios.id = Email.id_email JOIN Inscripciones ON Email.id_email = Inscripciones.id_inscripciones JOIN curso ON Inscripciones.id_inscripciones = curso.id_curso;`
    connection3.query(sql2, (err, result) => {
        if (err) throw err;
        const html = `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Consultando registros</title>
            <style>
                * {
                    box-sizing: border-box;
                    margin: 0;
                    padding: 0;
                }

                body {
                    background-color: #2c3e50;
                    font-family: Arial, sans-serif;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    color: #ecf0f1;
                }

                .container {
                    background-color: #34495e;
                    padding: 20px;
                    border-radius: 8px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
                    width: 90%;
                    max-width: 800px;
                }

                h1 {
                    color: #e74c3c;
                    margin-bottom: 20px;
                }

                h2 {
                    margin-bottom: 10px;
                }

                .card {
                    background-color: #2c3e50;
                    padding: 15px;
                    border-radius: 8px;
                    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
                    margin-bottom: 20px;
                }

                span {
                    color: #3498db;
                    background-color: #ecf0f1;
                    padding: 2px 4px;
                    border-radius: 4px;
                }

                .data span {
                    color: #3498db;
                    background-color: #ecf0f1;
                    padding: 2px 4px;
                    border-radius: 4px;
                }

                .links {
                    display: flex;
                    justify-content: space-between;
                    margin-top: 20px;
                }

                .links a {
                    color: #3498db;
                    text-decoration: none;
                    background-color: #ecf0f1;
                    padding: 10px 20px;
                    border-radius: 4px;
                    transition: background-color 0.3s;
                }

                .links a:hover {
                    background-color: #bdc3c7;
                }

                .action-links {
                    display: flex;
                    justify-content: space-between;
                    width: 50%;
                    margin-top: 10px;
                }

                .action-links a {
                    text-decoration: none;
                    color: #e74c3c;
                    background-color: #ecf0f1;
                    padding: 5px 10px;
                    border-radius: 4px;
                    transition: background-color 0.3s;
                }

                .action-links a:hover {
                    background-color: #bdc3c7;
                }

                hr {
                    margin-top: 20px;
                    margin-bottom: 20px;
                    border: 1px solid #ecf0f1;
                }

                @media only screen and (max-width: 877px) {
                    .action-links {
                        display: flex;
                        flex-direction: column;
                        height: 130px;
                        align-items: normal;
                    }
                    .data {
                        display: flex;
                        flex-direction: column;
                    }
                }
                @media only screen and (max-width: 450px) {
                    h2 {
                        font-size: 0.8em;
                    }
                }
            </style>
        </head>
        <body>
        <div class="container">
        <h1>Consultando la tabla: <span>${process.env.PROYECTO_LOCAL_TABLE_2}</span> combinada con las otras Tablas</h1>
        ${result.map(elements => `
            <div class="card">
                <div class="data">
                    <h2>ID: <span>${elements.id}</span></h2>
                    <h2>Nombre: <span>${elements.Nombre}</span></h2>
                    <h2>Apellido: <span>${elements.Apellido}</span></h2>
                    <h2>DNI: <span>${elements.Dni}</span></h2>
                    <h2>Celular: <span>${elements.Celular}</span></h2>
                    <h2>Sexo: <span>${elements.Sexo}</span></h2>
                    <h2>Email: <span>${elements.Email}</span></h2>
                    <h2>Fecha de Nacimiento: <span>${dayjs(elements.Nacimiento).format('YYYY-MM-DD HH:mm:ss')}</span></h2>
                    <h2>FK_EMAIL: <span>${elements.fk_email}</span></h2>
                    <h2>FK_INSCRIPCIONES: <span>${elements.fk_inscripciones}</span></h2>
                    <h2>FK_CURSOS: <span>${elements.fk_cursos}</span></h2>
                    <h2>Correo: <span>${elements.Correo}</span></h2>
                    <h2>Administrador: <span>${elements.Administrador}</span></h2>
                    <h2>Numero Correos: <span>${elements.Numero_Correos}</span></h2>
                    <h2>Fecha Inscripcion: <span>${dayjs(elements.Fecha).format('YYYY-MM-DD HH:mm:ss')}</span></h2>
                    <h2>Alumno: <span>${elements.Alumno}</span></h2>
                    <h2>Curso: <span>${elements.Curso}</span></h2>
                    <h2>Titulo: <span>${elements.Titulo}</span></h2>
                    <h2>Horas Curso: <span>${elements.Hs}</span></h2>
                    <h2>Portada: <span>${elements.Portada}</span></h2>
                    <h2>Cantidad_Docentes: <span>${elements.Cantidad_Docentes}</span></h2>
                    <div class="action-links">
                        <a href="/query/arts_and_culture/${elements.id}">CONSULTAR</a>
                        <a href="/edit/arts_and_culture/${elements.id}">EDITAR</a>
                        <a href="/delete/arts_and_culture/${elements.id}">ELIMINAR</a>
                    </div>
                </div>
            </div>
            `).join('')}
            <div class="links">
                <a href='/'>INICIO</a>
            </div>
        </div>
        </body>
        </html>`
        response.send(html);
    });
});

router.get("/arts_and_culture", (request, response) => {
    const connection3 = require('../db/arts_and_culture')
    const sql1 = 'SELECT * FROM ' + process.env.PROYECTO_DATABASE + '.' + process.env.PROYECTO_LOCAL_TABLE_2;
    connection3.query(sql1, (err, result) => {
        if (err) throw err;
        const html = `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Consultando registros</title>
            <style>
                * {
                    box-sizing: border-box;
                    margin: 0;
                    padding: 0;
                }

                body {
                    background-color: #2c3e50;
                    font-family: Arial, sans-serif;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    color: #ecf0f1;
                }

                .container {
                    background-color: #34495e;
                    padding: 20px;
                    border-radius: 8px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
                    width: 90%;
                    max-width: 800px;
                }

                h1 {
                    color: #e74c3c;
                    margin-bottom: 20px;
                }

                h2 {
                    margin-bottom: 10px;
                }

                .card {
                    background-color: #2c3e50;
                    padding: 15px;
                    border-radius: 8px;
                    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
                    margin-bottom: 20px;
                }

                span {
                    color: #3498db;
                    background-color: #ecf0f1;
                    padding: 2px 4px;
                    border-radius: 4px;
                }

                .data span {
                    color: #3498db;
                    background-color: #ecf0f1;
                    padding: 2px 4px;
                    border-radius: 4px;
                }

                .links {
                    display: flex;
                    justify-content: space-between;
                    margin-top: 20px;
                }

                .links a {
                    color: #3498db;
                    text-decoration: none;
                    background-color: #ecf0f1;
                    padding: 10px 20px;
                    border-radius: 4px;
                    transition: background-color 0.3s;
                }

                .links a:hover {
                    background-color: #bdc3c7;
                }

                .action-links {
                    display: flex;
                    justify-content: space-between;
                    width: 50%;
                    margin-top: 10px;
                }

                .action-links a {
                    text-decoration: none;
                    color: #e74c3c;
                    background-color: #ecf0f1;
                    padding: 5px 10px;
                    border-radius: 4px;
                    transition: background-color 0.3s;
                }

                .action-links a:hover {
                    background-color: #bdc3c7;
                }

                hr {
                    margin-top: 20px;
                    margin-bottom: 20px;
                    border: 1px solid #ecf0f1;
                }
                @media only screen and (max-width: 877px) {
                    .action-links {
                        display: flex;
                        flex-direction: column;
                        height: 130px;
                        align-items: normal;
                    }
                    .data {
                        display: flex;
                        flex-direction: column;
                    }
                }
                @media only screen and (max-width: 450px) {
                    h2 {
                        font-size: 0.8em;
                    }
                }
            </style>
        </head>
        <body>
        <div class="container">
        <h1>Consultando la tabla: <span>${process.env.PROYECTO_LOCAL_TABLE_2}</span></h1>
        ${result.map(elements => `
            <div class="card">
                <div class="data">
                    <h2>ID: <span>${elements.id}</span></h2>
                    <h2>Nombre: <span>${elements.Nombre}</span></h2>
                    <h2>Apellido: <span>${elements.Apellido}</span></h2>
                    <h2>DNI: <span>${elements.Dni}</span></h2>
                    <h2>Celular: <span>${elements.Celular}</span></h2>
                    <h2>Sexo: <span>${elements.Sexo}</span></h2>
                    <h2>Email: <span>${elements.Email}</span></h2>
                    <h2>Fecha de Nacimiento: <span>${dayjs(elements.Nacimiento).format('YYYY-MM-DD HH:mm:ss')}</span></h2>
                    <h2>FK_EMAIL: <span>${elements.fk_email}</span></h2>
                    <h2>FK_INSCRIPCIONES: <span>${elements.fk_inscripciones}</span></h2>
                    <h2>FK_CURSOS: <span>${elements.fk_cursos}</span></h2>
                    <div class="action-links">
                        <a href="/query/arts_and_culture/${elements.id}">CONSULTAR</a>
                        <a href="/edit/arts_and_culture/${elements.id}">EDITAR</a>
                        <a href="/delete/arts_and_culture/${elements.id}">ELIMINAR</a>
                    </div>
                </div>
            </div>
            `).join('')}
            <div class="links">
                <a href='/'>INICIO</a>
            </div>
        </div>
        </body>
        </html>`
        response.send(html);
    });
});

router.get("/arts_and_culture/:id", (request, response) => {
    const connection3 = require('../db/arts_and_culture')
    const id = request.params.id;
    const sql1 = `SELECT * FROM ${process.env.PROYECTO_DATABASE}.${process.env.PROYECTO_LOCAL_TABLE_2} WHERE id=?;`;
    connection3.query(sql1, id, (err, result) => {
        if(err) {
            console.log('ERROR',err)
        }
        if(response.status(200)){
            console.log('CONSULTA EXITOSA AL REGISTRO:' + id + ' en la Tabla: ' + process.env.PROYECTO_LOCAL_TABLE_2);
            const html = `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Consultando registro</title>
                <style>
                    * {
                        box-sizing: border-box;
                        margin: 0;
                        padding: 0;
                    }
            
                    body {
                        background-color: #2c3e50;
                        font-family: Arial, sans-serif;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 100vh;
                        color: #ecf0f1;
                    }
            
                    .container {
                        background-color: #34495e;
                        padding: 20px;
                        border-radius: 8px;
                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
                    }
            
                    h1 {
                        color: #e74c3c;
                        margin-bottom: 20px;
                    }
            
                    h2 {
                        margin-bottom: 10px;
                    }
            
                    .data span {
                        color: #3498db;
                        background-color: #ecf0f1;
                        padding: 2px 4px;
                        border-radius: 4px;
                    }
            
                    .links {
                        display: flex;
                        justify-content: space-between;
                        margin-top: 20px;
                    }
            
                    .links a {
                        color: #3498db;
                        text-decoration: none;
                        background-color: #ecf0f1;
                        padding: 10px 20px;
                        border-radius: 4px;
                        transition: background-color 0.3s;
                    }
            
                    .links a:hover {
                        background-color: #bdc3c7;
                    }

                    @media only screen and (max-width: 700px) {
                        .links {
                            display: flex;
                            flex-direction: column;
                            height: 250px;
                            align-items: normal;
                        }
                        .data {
                            display: flex;
                            flex-direction: column;
                        }
                    }
                    @media only screen and (max-width: 540px) {
                        body {
                            height: 100%;
                        }
                        
                        .links {
                            display: flex;
                            flex-direction: column;
                            height: 250px;
                            align-items: normal;
                        }
                        .data {
                            display: flex;
                            flex-direction: column;
                        }
                        
                        h2 {
                            font-size: 0.8em;
                        }
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>Consultando registro con ID: <span>${id}</span> para la Tabla ${process.env.PROYECTO_LOCAL_TABLE_2}</h1>
                    ${result.map(element => `
                        <div class="data">
                        <h2>Nombre: <span>${element.Nombre}</span></h2>
                        <h2>Apellido: <span>${element.Apellido}</span></h2>
                        <h2>DNI: <span>${element.Dni}</span></h2>
                        <h2>Celular: <span>${element.Celular}</span></h2>
                        <h2>Sexo: <span>${element.Sexo}</span></h2>
                        <h2>Email: <span>${element.Email}</span></h2>
                        <h2>Fecha de Nacimiento: <span>${dayjs(element.Nacimiento).format('YYYY-MM-DD HH:mm:ss')}</span></h2>
                        <h2>FK_EMAIL: <span>${element.fk_email}</span></h2>
                        <h2>FK_INSCRIPCIONES: <span>${element.fk_inscripciones}</span></h2>
                        <h2>FK_CURSOS: <span>${element.fk_cursos}</span></h2>
                    </div>
                    `)}
                    <div class="links">
                    <a href='/'>INICIO</a>
                    <a href='/edit/arts_and_culture/${id}'>EDITAR</a>
                    <a href='/delete/arts_and_culture/${id}'>ELIMINAR</a>
                    <a href='/query/arts_and_culture'>VOLVER</a>
                    </div>
                </div>
            </body>
            </html>`
            response.status(200).send(html)
        }
    })
})

module.exports = router;