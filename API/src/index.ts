import * as express from "express";
import * as bodyParser from "body-parser";
import { Request, Response } from "express";
import { Routes } from "./routes";
import { cmm, cmm1, cmm2 } from "./data-source"; // Import your data sources here

const portCmm = 3000;    // Puerto para cmm
const portCmm1 = 3001;   // Puerto para cmm1
const portCmm2 = 3002;   // Puerto para cmm2

function initializeServer(connection, connectionName, port) {
    connection.initialize().then(async () => {
        const app = express();
        app.use(bodyParser.json());

        app.use((req, res, next) => {
            res.header("Access-Control-Allow-Origin", "*"); // Puedes restringir esto a dominios específicos si es necesario
            res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });

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

        app.listen(port, () => {
            console.log(`Conexión a ${connectionName} exitosa`);
            console.log(`Express server has started on port ${port}`);
        });
    }).catch(error => console.log(error));
}

// Inicializar servidores con diferentes puertos
initializeServer(cmm, "cmm", portCmm);
initializeServer(cmm1, "cmm1", portCmm1);
initializeServer(cmm2, "cmm2", portCmm2);
