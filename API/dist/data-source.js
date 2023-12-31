"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cmm2 = exports.cmm1 = exports.cmm = void 0;
require("reflect-metadata");
var typeorm_1 = require("typeorm");
exports.cmm = new typeorm_1.DataSource({
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
});
exports.cmm1 = new typeorm_1.DataSource({
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
});
exports.cmm2 = new typeorm_1.DataSource({
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
});
/*
export const cmm = new DataSource({
    name: "cmm",
    type: "mysql",
    host: "207.7.84.116",
    port: 3306,
    username: "telemetriamvcpgo_gf",
    password: "S3s@m03541",
    database: "telemetriamvcpgo_cmm",
    synchronize: true,
    logging: false,
    entities: ["dist/entity/*.js"],
    migrations: ["dist/migration"],
    subscribers: ["dist/subscriber"],
});
export const cmm1 = new DataSource({
    name: "cmm1",
    type: "mysql",
    host: "207.7.84.116",
    port: 3306,
    username: "telemetriamvcpgo_gf",
    password: "S3s@m03541",
    database: "telemetriamvcpgo_cmm1",
    synchronize: true,
    logging: false,
    entities: ["dist/entity/*.js"],
    migrations: ["dist/migration"],
    subscribers: ["dist/subscriber"],
});
export const cmm2 = new DataSource({
    name: "cmm2",
    type: "mysql",
    host: "207.7.84.116",
    port: 3306,
    username: "telemetriamvcpgo_gf",
    password: "S3s@m03541",
    database: "telemetriamvcpgo_cmm2",
    synchronize: true,
    logging: false,
    entities: ["dist/entity/*.js"],
    migrations: ["dist/migration"],
    subscribers: ["dist/subscriber"],
});*/
//# sourceMappingURL=data-source.js.map