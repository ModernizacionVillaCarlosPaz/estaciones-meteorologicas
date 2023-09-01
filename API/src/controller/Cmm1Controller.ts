import { cmm1 } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { Archive } from "../entity/Archive";

export class Cmm1Controller {

    private cmm1Repository = cmm1.getRepository(Archive);

    async last(req: Request, res: Response, next: NextFunction) {
        try {
            const results = await cmm1.query(`SELECT *, DATE_FORMAT(FROM_UNIXTIME(dateTime), '%Y-%m-%d %H:%i:%s') AS formattedDateTime
            FROM archive
            WHERE dateTime = (
                SELECT MAX(dateTime)
                FROM archive
            );`)
            const closestArchive = results;
            if (closestArchive) {
                res.send(closestArchive);
            } else {
                res.send("No se encontraron registros.");
            }
        } catch (error) {
            res.status(500).send("Error al obtener los registros");
        }
    }

    async Find(req: Request, res: Response, next: NextFunction) {
        const startDate = req.params.startDate;
        const endDate = req.params.endDate;
        console.log(startDate, endDate)
        try {

            const results = await cmm1.query(`
            SELECT
                ROUND(AVG(usUnits), 1) AS avg_usUnits,
                ROUND(AVG(barometer), 1) AS avg_barometer,
                ROUND(AVG(pressure), 1) AS avg_pressure,
                ROUND(AVG(altimeter), 1) AS avg_altimeter,
                ROUND(MAX(outTemp), 1) AS outTempMax,
                ROUND(MIN(outTemp), 1) AS outTempMin,
                ROUND(AVG(outTemp), 1) AS avg_outTemp,
                ROUND(AVG(inHumidity), 1) AS avg_inHumidity,
                ROUND(AVG(outHumidity), 1) AS avg_outHumidity,
                ROUND(AVG(windSpeed), 1) AS avg_windSpeed,
                ROUND(AVG(windDir), 1) AS avg_windDir,
                ROUND(AVG(windGust), 1) AS avg_windGust,
                ROUND(AVG(windGustDir), 1) AS avg_windGustDir,
                ROUND(AVG(rainRate), 1) AS avg_rainRate,
                ROUND(AVG(rain), 1) AS avg_rain,
                ROUND(AVG(dewpoint), 1) AS avg_dewpoint,
                ROUND(AVG(windchill), 1) AS avg_windchill,
                ROUND(AVG(heatindex), 1) AS avg_heatindex,
                ROUND(AVG(ET), 1) AS avg_ET,
                ROUND(AVG(radiation), 1) AS avg_radiation,
                ROUND(AVG(UV), 1) AS avg_UV,
                ROUND(AVG(extraTemp1), 1) AS avg_extraTemp1,
                ROUND(AVG(extraTemp2), 1) AS avg_extraTemp2,
                ROUND(AVG(heatingVoltage), 1) AS avg_heatingVoltage,
                ROUND(AVG(supplyVoltage), 1) AS avg_supplyVoltage,
                ROUND(AVG(referenceVoltage), 1) AS avg_referenceVoltage,
                ROUND(AVG(windBatteryStatus), 1) AS avg_windBatteryStatus,
                ROUND(AVG(rainBatteryStatus), 1) AS avg_rainBatteryStatus,
                ROUND(AVG(outTempBatteryStatus), 1) AS avg_outTempBatteryStatus,
                ROUND(AVG(inTempBatteryStatus), 1) AS avg_inTempBatteryStatus,
                DATE_FORMAT(FROM_UNIXTIME(dateTime), '%Y-%m-%d') AS formattedDateTime
            FROM archive
            WHERE FROM_UNIXTIME(dateTime) BETWEEN ? AND ?
            GROUP BY DATE(FROM_UNIXTIME(dateTime))
            ORDER BY DATE(FROM_UNIXTIME(dateTime)) DESC;
            `, [startDate, endDate]);

            res.send(results);
        } catch (error) {
            console.log(error)
            res.status(500).send("Error al obtener los registros");
        }
    }

    async FindDay(req: Request, res: Response, next: NextFunction) {
        const Date = req.params.Date;

        try {

            const results = await cmm1.query(`
            SELECT
            ROUND(usUnits, 1) AS usUnits,
            ROUND(barometer, 1) AS barometer,
            ROUND(pressure, 1) AS pressure,
            ROUND(altimeter, 1) AS altimeter,
            ROUND(inTemp, 1) AS inTemp,
            ROUND(outTemp, 1) AS outTemp,
            ROUND(inHumidity, 1) AS inHumidity,
            ROUND(outHumidity, 1) AS outHumidity,
            ROUND(windSpeed, 1) AS windSpeed,
            ROUND(windDir, 1) AS windDir,
            ROUND(windGust, 1) AS windGust,
            ROUND(windGustDir, 1) AS windGustDir,
            ROUND(rainRate, 1) AS rainRate,
            ROUND(rain, 1) AS rain,
            ROUND(dewpoint, 1) AS dewpoint,
            ROUND(windchill, 1) AS windchill,
            ROUND(heatindex, 1) AS heatindex,
            ROUND(ET, 1) AS ET,
            ROUND(radiation, 1) AS radiation,
            ROUND(UV, 1) AS UV,
            ROUND(extraTemp1, 1) AS extraTemp1,
            ROUND(extraTemp2, 1) AS extraTemp2,
            ROUND(heatingVoltage, 1) AS heatingVoltage,
            ROUND(supplyVoltage, 1) AS supplyVoltage,
            ROUND(referenceVoltage, 1) AS referenceVoltage,
            ROUND(windBatteryStatus, 1) AS windBatteryStatus,
            ROUND(rainBatteryStatus, 1) AS rainBatteryStatus,
            ROUND(outTempBatteryStatus, 1) AS outTempBatteryStatus,
            ROUND(inTempBatteryStatus, 1) AS inTempBatteryStatus,
            DATE_FORMAT(FROM_UNIXTIME(dateTime), '%H:%i') AS formattedDateTime
        FROM archive
        WHERE DATE(FROM_UNIXTIME(dateTime)) = ?
        ORDER BY DATE(FROM_UNIXTIME(dateTime)) DESC;
            `, [Date]); // Date esta en formato dd/mm/yyyy

            res.send(results);
        } catch (error) {
            console.log(error)
            res.status(500).send("Error al obtener los registros");
        }
    }
}