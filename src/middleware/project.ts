import type { Request, Response, NextFunction } from "express";
import Project, { IProject } from "../models/Project";

declare global {
    namespace Express {
        interface Request {
            project: IProject
        }
    }
}

// Middleware para verificar si el proyecto existe
export async function projectExist(req: Request, res: Response, next: NextFunction) {
    try {
        const { projectId } = req.params;
        const project = await Project.findById(projectId)
        if (!project) {
            const error = new Error('El proyecto no existe')
            res.status(404).json({ message: error.message })
        }
        req.project = project
        next()
    } catch (error) {
        res.status(500).json({ message: 'Hubo un error' })
    }
}