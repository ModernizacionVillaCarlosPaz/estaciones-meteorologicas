import { cmm2 } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { Archive } from "../entity/Archive";

export class Cmm2Controller {

    private cmm2Repository = cmm2.getRepository(Archive);

    async last(req: Request, res: Response, next: NextFunction) {
        try {
            const results = await cmm2.query(`SELECT *, DATE_FORMAT(FROM_UNIXTIME(dateTime), '%Y-%m-%d %H:%i:%s') AS formattedDateTime
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

            const results = await cmm2.query(`
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
}
