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
            AVG(usUnits) AS avg_usUnits,
            AVG(barometer) AS avg_barometer,
            AVG(pressure) AS avg_pressure,
            AVG(altimeter) AS avg_altimeter,
            MAX(inTemp) AS inTempMax,
            MIN(inTemp) AS inTempMin,
            AVG(outTemp) AS avg_outTemp,
            AVG(inHumidity) AS avg_inHumidity,
            AVG(outHumidity) AS avg_outHumidity,
            AVG(windSpeed) AS avg_windSpeed,
            AVG(windDir) AS avg_windDir,
            AVG(windGust) AS avg_windGust,
            AVG(windGustDir) AS avg_windGustDir,
            AVG(rainRate) AS avg_rainRate,
            AVG(rain) AS avg_rain,
            AVG(dewpoint) AS avg_dewpoint,
            AVG(windchill) AS avg_windchill,
            AVG(heatindex) AS avg_heatindex,
            AVG(ET) AS avg_ET,
            AVG(radiation) AS avg_radiation,
            AVG(UV) AS avg_UV,
            AVG(extraTemp1) AS avg_extraTemp1,
            AVG(extraTemp2) AS avg_extraTemp2,
            AVG(heatingVoltage) AS avg_heatingVoltage,
            AVG(supplyVoltage) AS avg_supplyVoltage,
            AVG(referenceVoltage) AS avg_referenceVoltage,
            AVG(windBatteryStatus) AS avg_windBatteryStatus,
            AVG(rainBatteryStatus) AS avg_rainBatteryStatus,
            AVG(outTempBatteryStatus) AS avg_outTempBatteryStatus,
            AVG(inTempBatteryStatus) AS avg_inTempBatteryStatus,
            DATE_FORMAT(FROM_UNIXTIME(dateTime), '%Y-%m-%d') AS formattedDateTime
        FROM archive
        WHERE DATE(FROM_UNIXTIME(dateTime)) BETWEEN ? AND ?
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
        console.log(Date)

        try {

            const results = await cmm1.query(`
            SELECT
            ROUND(usUnits, 1) AS usUnits,
            ROUND(barometer, 1) AS barometer,
            ROUND(pressure, 1) AS pressure,
            ROUND(altimeter, 1) AS altimeter,
            ROUND(inTemp, 1) AS inTemp,
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
            DATE_FORMAT(FROM_UNIXTIME(dateTime), '%d-%m-%Y' ' ' '%h:%m:%s') AS formattedDateTime
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
