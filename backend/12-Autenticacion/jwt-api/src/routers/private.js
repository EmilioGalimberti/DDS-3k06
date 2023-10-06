import express, { Router } from "express";
import { Usuario } from '../models/usuarios.js'
import { Producto } from '../models/productos.js'
import { autorizar } from "../middlewares/autorizarJwt.js";

export const router = Router()
router.use(autorizar)

router.get('/productos',async (req, res) => {
    const productos = await Producto.findAll({})
    res.json(productos)
})

router.get('/usuarios', validarAdmin, async (req, res) => {
    const list = await Usuario.findAll({})
    res.json(list)
})

async function validarAdmin(req, res, next){
    //
    const id = req.body.id
    //buscar el rol del usuario 
    //validar si NO tiene rol = "ADMIN" --> cierro request con 403
    //caso contrario next()

    const user = await Usuario.findOne({
        where: {
            id: id
        }
    })
    
    if(user){
        if(user.rol !== "admin") //esto es código duro, se podría consultar otra tabla de la base por ej.
        {
            res.status(403)
            res.send({mensaje: 'Usuario sin permisos'})
        }else{
            next()
        }
    }

}