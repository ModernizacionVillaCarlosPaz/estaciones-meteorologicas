import { cmm2 } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { Archive } from "../entity/Archive";

export class Cmm2Controller {

    private cmm2Repository = cmm2.getRepository(Archive);

    async all(request: Request, response: Response, next: NextFunction) {
        console.log("entra")
        return this.cmm2Repository.find();
    }

    async one(request: Request, response: Response, next: NextFunction) {
        const dateTime = parseInt(request.params.dateTime);
        console.log("entra")
        const archive = await this.cmm2Repository.findOne({
            where: { dateTime }
        });

        if (!archive) {
            return "Registro no encontrado";
        }
        return archive;
    }
}
