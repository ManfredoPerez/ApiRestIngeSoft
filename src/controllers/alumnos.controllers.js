import { pool } from '../db.js'

export const getAlumnos = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM alumno')
        res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message: 'Algo salio mal'
        })
    }
}

export const getAlumno = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM alumno WHERE id = ?', [req.params.id])
    
        if (rows.length <= 0 ) return res.status(404).json({
            message: 'Error Alumno no encontrado'
        })
        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({
            message: 'Algo salio mal'
        })
        
    }
}

export const postAlumnos = async (req, res) => {
    const {nombre, apellido, fecha_nacimiento, carrera, promedio} = req.body
    try {
        
        const [rows] = await pool.query('INSERT INTO alumno (nombre, apellido, fecha_nacimiento, carrera, promedio) VALUES (?, ?, ?, ?, ? )', [nombre, apellido, fecha_nacimiento, carrera, promedio])
        res.send( {
            id: rows.insertId,
            nombre,
            apellido,
            fecha_nacimiento,
            carrera,
            promedio,
        } )
    } catch (error) {
        return res.status(500).json({
            message: 'Algo salio mal'
        })
        
    }
}


export const deleteAlumnos = async (req, res) => {
    try {
        const result = await pool.query('DELETE FROM alumno WHERE id = ?', [req.params.id])
        if (result.affectedRows <= 0 ) return res.status(404).json({
            message: 'Estudiante no existe'
        })

        res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({
            message: 'Algo salio mal'
        })
    }
}

export const updateAlumnos = async (req, res) => {
    const {id} = req.params
    const {nombre, apellido, fecha_nacimiento, carrera, promedio} = req.body

    try {

        const [result] = await pool.query('UPDATE alumno SET nombre = IFNULL(?, nombre), apellido = IFNULL(?, apellido), fecha_nacimiento = IFNULL(?, fecha_nacimiento), carrera = IFNULL(?, carrera), promedio = IFNULL(?, promedio) WHERE id = ?', [nombre, apellido, fecha_nacimiento, carrera, promedio, id])
        console.log(result)

        if(result.affectedRows === 0) return res.status(404).json({
            message: "Alumno no encontrado"
        })

        const [rows] = await pool.query('SELECT * FROM alumno WHERE id = ?', [id])
        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({
            message: 'Algo salio mal'
        })
    }
}

