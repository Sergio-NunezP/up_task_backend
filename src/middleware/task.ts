import type { Request, Response, NextFunction } from "express";
import Task, { ITask } from "../models/Task";

declare global {
    namespace Express {
        interface Request {
            task: ITask
        }
    }
}

// Middleware para verificar si la tarea existe
export async function taskExist(req: Request, res: Response, next: NextFunction) {
    try {
        const { taskId } = req.params;
        const task = await Task.findById(taskId)
        if (!task) {
            const error = new Error('Tarea no encontrada')
            res.status(404).json({ message: error.message })
            return
        }
        req.task = task
        next()
    } catch (error) {
        res.status(500).json({ message: 'Hubo un error' })
    }
}

// Middleware para verificar si la tarea pertenece al proyecto
export function taskBelongToProject(req: Request, res: Response, next: NextFunction) {
    if (req.task.project.toString() !== req.project.id.toString()) {
        const error = new Error('Acción no permitida, la tarea no pertenece al proyecto');
        res.status(400).json({ error: error.message });
        return
    }
    next()
}