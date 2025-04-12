import type { Request, Response } from 'express';
import Project from '../models/Project';

export class ProjectController {

    // Crear un proyecto : POST /api/projects
    static createProject = async (req: Request, res: Response) => {
        const project = new Project(req.body)
        try {
            await project.save()
            res.send('Proyecto creado correctamente')
        } catch (error) {
            console.error(error)
        }
    }


    // Obtener todos los proyectos : GET /api/projects
    static getAllProjects = async (req: Request, res: Response) => {
        try {
            const projects = await Project.find({})
            res.json(projects)
        } catch (error) {
            console.error(error)
        }
    }
}