import { Request, Response } from "express";
import { Shift } from "../entities/shift/shift";
import { CreateShiftUserCase } from "../use-cases/createShift/create-shift-user-case";

export class CreateShiftController {
    constructor(private createdShiftUserCase: CreateShiftUserCase) {}

    async handlePontoBatido(req: Request, res: Response) {
        const { collaboratorCode, pointDate } = req.body; // pointDate é a data do turno (entrada ou saída)

        // Converte a data do ponto para um objeto Date
        const pointDateObj = new Date(pointDate);

        // Busca turnos existentes para o colaborador no mesmo dia
        const shiftsForDay = await repo.findByCollaboratorCodeAndDate(collaboratorCode, pointDateObj);

        // Caso não existam turnos para o dia
        if (shiftsForDay.length === 0) {
            // Cria um novo turno com a data de entrada
            const newShift = new Shift(collaboratorCode, pointDateObj);
            await repo.create(newShift);
            return res.status(201);
        }

        // Verifica se é uma entrada ou saída
        let shiftToUpdate: Shift | null = null;
        let isEntry = true;

        // Encontrar o último turno pendente de saída
        const sortedShifts = shiftsForDay.sort((a, b) => a.entry.getTime() - b.entry.getTime());
        for (const shift of sortedShifts) {
            if (!shift.exit) {
                shiftToUpdate = shift;
                isEntry = false;
                break;
            }
        }

        if (isEntry) {
            // Não encontrou turno pendente, cria novo turno de entrada
            const newShift = new Shift(collaboratorCode, pointDateObj);
            const createdShift = await repo.create(newShift);
            return res.status(201).json(createdShift);
        } else {
            // Atualiza turno existente com a data de saída
            if (shiftToUpdate) {
                shiftToUpdate.exit = pointDateObj;
                const updatedShift = await repo.update(shiftToUpdate);
                return res.status(200).json(updatedShift);
            } else {
                return res.status(400).send("No pending shift to update.");
            }
        }
    }
}
