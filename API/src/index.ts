import * as express from "express";
import * as bodyParser from "body-parser";
import { Request, Response } from "express";
import { Routes } from "./routes";
import { cmm, cmm1, cmm2 } from "./data-source"; // Importa tus fuentes de datos aquí
const cors = require('cors');

const port = process.env.PORT || 3000; // Puerto único para todos los servidores
const corsOrigin = process.env.NODE_ENV === "production" ? process.env.CORS_ORIGIN_PROD : "http://localhost:4200";

function initializeServer(connection, connectionName, app) {
    connection.initialize().then(async () => {
        app.use(cors({
            origin: corsOrigin, // Permitir acceso desde cualquier origen
            methods: ["GET"], // Permitir estos métodos HTTP
        }));

        const rateLimiter = cors({
            max: 50, // Número máximo de solicitudes por segundo por usuario
            windowMs: 1000, // Tiempo de ventana en milisegundos
            individualLimit: true, // Limitar por usuario
            maxAgeMs: 3600000, // Tiempo de espera en milisegundos
            onLimit: (req, res, next) => {
              res.status(429).send({
                message: "Demasiadas consultas. Intente nuevamente en una hora.",
              });
            },
        });

        app.use(rateLimiter);
        app.use(bodyParser.json());

        app.use((req, res, next) => {
            res.header("Access-Control-Allow-Origin", "*");
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

        console.log(`Conexión a ${connectionName} exitosa`);
    }).catch(error => console.log(error));
}

const app = express();

// Inicializa los servidores con el mismo puerto
initializeServer(cmm, "cmm", app);
initializeServer(cmm1, "cmm1", app);
initializeServer(cmm2, "cmm2", app);

app.listen(port, () => {
    console.log(`Express server has started on port ${port}`);
});