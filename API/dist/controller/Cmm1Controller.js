"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cmm1Controller = void 0;
var data_source_1 = require("../data-source");
var Archive_1 = require("../entity/Archive");
var Cmm1Controller = /** @class */ (function () {
    function Cmm1Controller() {
        this.cmm1Repository = data_source_1.cmm1.getRepository(Archive_1.Archive);
    }
    Cmm1Controller.prototype.last = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var results, closestArchive, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, data_source_1.cmm1.query("SELECT *, DATE_FORMAT(FROM_UNIXTIME(dateTime), '%Y-%m-%d %H:%i:%s') AS formattedDateTime\n            FROM archive\n            WHERE dateTime = (\n                SELECT MAX(dateTime)\n                FROM archive\n            );")];
                    case 1:
                        results = _a.sent();
                        closestArchive = results;
                        if (closestArchive) {
                            res.send(closestArchive);
                        }
                        else {
                            res.send("No se encontraron registros.");
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        res.status(500).send("Error al obtener los registros");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Cmm1Controller.prototype.Find = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var startDate, endDate, results, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        startDate = req.params.startDate;
                        endDate = req.params.endDate;
                        console.log(startDate, endDate);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, data_source_1.cmm1.query("\n            SELECT\n            AVG(usUnits) AS avg_usUnits,\n            AVG(barometer) AS avg_barometer,\n            AVG(pressure) AS avg_pressure,\n            AVG(altimeter) AS avg_altimeter,\n            MAX(inTemp) AS inTempMax,\n            MIN(inTemp) AS inTempMin,\n            AVG(outTemp) AS avg_outTemp,\n            AVG(inHumidity) AS avg_inHumidity,\n            AVG(outHumidity) AS avg_outHumidity,\n            AVG(windSpeed) AS avg_windSpeed,\n            AVG(windDir) AS avg_windDir,\n            AVG(windGust) AS avg_windGust,\n            AVG(windGustDir) AS avg_windGustDir,\n            AVG(rainRate) AS avg_rainRate,\n            AVG(rain) AS avg_rain,\n            AVG(dewpoint) AS avg_dewpoint,\n            AVG(windchill) AS avg_windchill,\n            AVG(heatindex) AS avg_heatindex,\n            AVG(ET) AS avg_ET,\n            AVG(radiation) AS avg_radiation,\n            AVG(UV) AS avg_UV,\n            AVG(extraTemp1) AS avg_extraTemp1,\n            AVG(extraTemp2) AS avg_extraTemp2,\n            AVG(heatingVoltage) AS avg_heatingVoltage,\n            AVG(supplyVoltage) AS avg_supplyVoltage,\n            AVG(referenceVoltage) AS avg_referenceVoltage,\n            AVG(windBatteryStatus) AS avg_windBatteryStatus,\n            AVG(rainBatteryStatus) AS avg_rainBatteryStatus,\n            AVG(outTempBatteryStatus) AS avg_outTempBatteryStatus,\n            AVG(inTempBatteryStatus) AS avg_inTempBatteryStatus,\n            DATE_FORMAT(FROM_UNIXTIME(dateTime), '%Y-%m-%d') AS formattedDateTime\n        FROM archive\n        WHERE DATE(FROM_UNIXTIME(dateTime)) BETWEEN ? AND ?\n        GROUP BY DATE(FROM_UNIXTIME(dateTime))\n        ORDER BY DATE(FROM_UNIXTIME(dateTime)) DESC;\n            ", [startDate, endDate])];
                    case 2:
                        results = _a.sent();
                        res.send(results);
                        return [3 /*break*/, 4];
                    case 3:
                        error_2 = _a.sent();
                        console.log(error_2);
                        res.status(500).send("Error al obtener los registros");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return Cmm1Controller;
}());
exports.Cmm1Controller = Cmm1Controller;
//# sourceMappingURL=Cmm1Controller.js.map