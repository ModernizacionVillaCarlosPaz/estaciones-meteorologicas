import * as express from "express";
import * as bodyParser from "body-parser";
import { Request, Response } from "express";
import { Routes } from "./routes";
import helmet from 'helmet';
import { cmm, cmm1, cmm2 } from "./data-source"; // Importa tus fuentes de datos aquí
const cors = require('cors');

const port = process.env.PORT || 3000; // Puerto único para todos los servidores

async function initializeServer(connection, connectionName, app) {
    try {
        await connection.initialize();

        app.use(cors());
        app.use(helmet());
        app.use(bodyParser.json());

        Routes.forEach(route => {
            (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
                const result = (new (route.controller as any))[route.action](req, res, next);
                if (result instanceof Promise) {
                    result.then(result => result !== null && result !== undefined ? res.send(result) : undefined);
                } else if (result !== null && result !== undefined) {
                    res.json(result);
                }
            });
        });

        console.log(`Conexión a ${connectionName} exitosa`);
    } catch (error) {
        console.log(error);
    }
}

const app = express();

// Inicializa los servidores con el mismo puerto
initializeServer(cmm, "cmm", app);
initializeServer(cmm1, "cmm1", app);
initializeServer(cmm2, "cmm2", app);

app.listen(port, () => {
    console.log(`El servidor Express se ha iniciado en el puerto ${port}`);
});