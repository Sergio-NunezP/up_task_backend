import { Router } from 'express';
import { body, param } from 'express-validator';
import { ProjectController } from '../controllers/ProjectController';
import { handleInputErrors } from '../middleware/validation';

const router = Router();

// Crear un proyecto : POST /api/projects
router.post('/',
    body('projectName')
        .notEmpty().withMessage('El Nombre del proyecto es obligatorio'),
    body('clientName')
        .notEmpty().withMessage('El Nombre del Cliente es obligatorio'),
    body('description')
        .notEmpty().withMessage('La description del proyecto es obligatorio'),
    handleInputErrors,
    ProjectController.createProject);

// Obtener todos los proyectos : GET /api/projects
router.get('/', ProjectController.getAllProjects);

// Obtener un proyecto por id: GET /api/projects/:id
router.get('/:id',
    param('id').isMongoId().withMessage('El ID no es valido'),
    handleInputErrors,
    ProjectController.getProjectByID
);



export default router;