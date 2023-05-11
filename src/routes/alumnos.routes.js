import { Router } from "express";
import { getAlumnos, postAlumnos, updateAlumnos, deleteAlumnos,getAlumno } from '../controllers/alumnos.controllers.js'

const router = Router()


router.get('/alumnos', getAlumnos )

router.get('/alumnos/:id', getAlumno )

router.post('/alumnos', postAlumnos )

router.patch('/alumnos/:id', updateAlumnos)

router.delete('/alumnos/:id', deleteAlumnos )

export default router