import { cmm1 } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { Archive } from "../entity/Archive";

export class Cmm1Controller {

    private cmm1Repository = cmm1.getRepository(Archive);

    async all(request: Request, response: Response, next: NextFunction) {
        console.log("entra")
        return this.cmm1Repository.find();
    }

    async one(request: Request, response: Response, next: NextFunction) {
        const dateTime = parseInt(request.params.dateTime);
        console.log("entra")
        const archive = await this.cmm1Repository.findOne({
            where: { dateTime }
        });

        if (!archive) {
            return "Registro no encontrado";
        }
        return archive;
    }
}
