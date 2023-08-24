import "reflect-metadata"
import { DataSource } from "typeorm"

export const cmm = new DataSource({
    name: "cmm",
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "telemetriamvcpgo_cmm",
    synchronize: true,
    logging: false,
    entities: ["dist/entity/*.js"],
    migrations: ["dist/migration"],
    subscribers: ["dist/subscriber"],
})

export const cmm1 = new DataSource({
    name: "cmm1",
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "telemetriamvcpgo_cmm1",
    synchronize: true,
    logging: false,
    entities: ["dist/entity/*.js"],
    migrations: ["dist/migration"],
    subscribers: ["dist/subscriber"],
})

export const cmm2 = new DataSource({
    name: "cmm2",
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "telemetriamvcpgo_cmm2",
    synchronize: true,
    logging: false,
    entities: ["dist/entity/*.js"],
    migrations: ["dist/migration"],
    subscribers: ["dist/subscriber"],
})