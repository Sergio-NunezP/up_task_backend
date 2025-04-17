import { Router } from 'express';
import { body, param } from 'express-validator';
import { ProjectController } from '../controllers/ProjectController';
import { handleInputErrors } from '../middleware/validation';
import { TaskController } from '../controllers/TaskController';
import { validateProjectExist } from '../middleware/project';

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

// Actualizar un proyecto por id: PUT /api/projects/:id
router.put('/:id',
    param('id').isMongoId().withMessage('El ID no es valido'),
    body('projectName')
        .notEmpty().withMessage('El Nombre del proyecto es obligatorio'),
    body('clientName')
        .notEmpty().withMessage('El Nombre del Cliente es obligatorio'),
    body('description')
        .notEmpty().withMessage('La description del proyecto es obligatorio'),
    handleInputErrors,
    ProjectController.updateProject
);

// Eliminar un proyecto por id: DELETE /api/projects/:id
router.delete('/:id',
    param('id').isMongoId().withMessage('El ID no es valido'),
    handleInputErrors,
    ProjectController.deleteProject
);

/** Routes para las tareas (tasks) 

*/

// Crear una tarea : POST /api/projects/:id/tasks
router.post('/:projectId/tasks',
    validateProjectExist,
    body('name')
        .notEmpty().withMessage('El Nombre de la tarea es obligatorio'),
    body('description')
        .notEmpty().withMessage('La description de la tarea es obligatoria'),
    handleInputErrors,
    TaskController.createProject
)
// Obtener todas las tareas de un proyecto : GET /api/projects/:id/tasks
router.get('/:projectId/tasks',
    validateProjectExist,
    TaskController.getProjectTasks
)

// Obtener una tarea por id : GET /api/:projectId/tasks/:taskId
router.get('/:projectId/tasks/:taskId',
    validateProjectExist,
    TaskController.getTaskById
)


export default router;