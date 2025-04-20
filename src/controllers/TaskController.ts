import type { Request, Response } from "express";
import Task from "../models/Task";

export class TaskController {
    // Crear una tarea : POST /api/:projectId/tasks
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
            res.status(500).json({ error: 'Error al obtener la tarea' });
        }
    }

    // Obtener todas las tareas de un proyecto : GET /api/:projectId/tasks
    static getProjectTasks = async (req: Request, res: Response) => {
        try {
            const tasks = await Task.find({ project: req.project.id }).populate("project");
            res.json(tasks);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener la tarea' });
        }
    }

    // Obtener una tarea por id : GET /api/:projectId/tasks/:taskId
    static getTaskById = async (req: Request, res: Response) => {
        try {
            res.json(req.task);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener la tarea' });
        }
    }

    // Actualizar una tarea por id : PUT /api/:projectId/tasks/:taskId
    static updateTask = async (req: Request, res: Response) => {
        try {
            req.task.name = req.body.name
            req.task.description = req.body.description
            await req.task.save()
            res.send('Tarea actualizada correctamente');
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener la tarea' });
        }
    }
    // Eliminar una tarea por id : DELETE /api/:projectId/tasks/:taskId
    static deleteTask = async (req: Request, res: Response) => {
        try {
            req.project.tasks = req.project.tasks.filter(task => task.toString() !== req.task.id.toString())
            await Promise.allSettled([req.task.deleteOne(), req.project.save()])
            res.send('Tarea eliminada correctamente');
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener la tarea' });
        }
    }

    // Actualizar el estado de una tarea por id : POST /api/:projectId/tasks/:taskId/status
    static updateStatus = async (req: Request, res: Response) => {
        try {
            const { status } = req.body
            req.task.status = status
            await req.task.save()
            res.send('Estado de la tarea actualizado correctamente');

        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Error al obtener la tarea' });
        }
    }
}  