import { cmm } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { Archive } from "../entity/Archive";

export class CmmController {

    private cmmRepository = cmm.getRepository(Archive);

    async last(req: Request, res: Response, next: NextFunction) {
        try {
            console.log("entra");
    
            const currentTimestamp = Math.floor(Date.now() / 1000); // Obtén el timestamp actual en segundos
    
            const closestArchive = await this.cmmRepository
                .createQueryBuilder("archive")
                .addSelect("ABS(archive.dateTime - :currentTimestamp)", "difference")
                .orderBy("difference")
                .setParameter("currentTimestamp", currentTimestamp)
                .getOne();
    
            if (closestArchive) {
                const formattedDateTime = new Date(closestArchive.dateTime * 1000)
                    .toLocaleString("es-ES", {
                        timeZone: "UTC",
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit"
                    });
    
                // Agregar la propiedad formattedDateTime al objeto closestArchive
                closestArchive['formattedDateTime'] = formattedDateTime;
    
                res.send(closestArchive);
            } else {
                res.send("No se encontraron registros.");
            }
        } catch (error) {
            res.status(500).send("Error al obtener los registros");
        }
    }
    

    async one(req: Request, res: Response, next: NextFunction) {
        const dateTime = parseInt(req.params.dateTime);
        console.log(dateTime);
        const archive = await this.cmmRepository.findOne({
            where: { dateTime }
        });
    
        if (!archive) {
            res.status(404).send("Registro no encontrado");
            return;
        }
    
        console.log(archive);
        res.send(archive);
    }
}
