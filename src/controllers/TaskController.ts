import type { Request, Response } from "express";
import Task from "../models/Task";

export class TaskController {
    // Crear una tarea : POST /api/projects/:id/tasks
    static createProject = async (req: Request, res: Response) => {

        try {
            const task = new Task(req.body);
            task.project = req.project.id;
            req.project.tasks.push(task.id);
            await Promise.allSettled([
                task.save(),
                req.project.save()
            ])
            res.send('Tarea creada correctamente');
        } catch (error) {
            console.error(error);
        }
    }

    // Obtener todas las tareas de un proyecto : GET /api/projects/:id/tasks
    static getProjectTasks = async (req: Request, res: Response) => {
        try {
            const tasks = await Task.find({ project: req.project.id });
            res.json(tasks);
        } catch (error) {
            console.error(error);
        }
    }
}