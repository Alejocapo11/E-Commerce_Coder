//Aca voy a importar el product manager y voy a hacer que me devuelva las cosas pero usando la DB

import { Router } from 'express';
import { randomNumber } from '../../utils.js';
import { __dirname } from '../../utils.js';
import dbProductManager from '../../dao/dbProductManager.js';
import productModel from '../../models/product.model.js';

const router = Router();

//Tengo que actualizar todos los metodos con las funciones que cree en el dbProductManager

//El get

router.get('/products', async (req, res) => {
    try {
        const products = await dbProductManager.get();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener productos.' });
    }
});

router.get('/products/:sid', async (req, res) => {
    try{
        //Obtener productos por id
        const { params: { sid } } = req;
        const product = await dbProductManager.getById(sid);
        res.status(200).json(product); 
    }catch (error){
        res.status(404).json({ error: 'Producto no encontrado.' });
    }
});

//Post
router.post('/products', async (req, res) => {
    //try {
        const { body } = req;
        const newProduct = {...body};
        const student = await dbProductManager.create(newProduct);
        res.status(201).json(student);
    //} catch (error) {
       // res.status(500).json({ error: 'Error al crear el producto.' });
    //}
});

//Ahora el put
router.put('/products/:sid', async (req, res) => {
    try{
        const {params : {sid}, body} = req;
        console.log(sid);
        //sid = parseInt(sid);
        //veamos si lo encuentra
        const product = await dbProductManager.getById(sid);
        //si no lo encuentra tira un console log
        if(!product) throw new Error('Producto no encontrado');
        await dbProductManager.updateById(sid, body);
        res.status(204).json({message: 'Producto actualizado'});
    }catch (error){
        res.status(error.statusCode || 500).json({ message: error.message });
    }
});

//Solo queda el delete
router.delete ('/products/:sid', async (req, res) => {
    try{
        const {params : {sid}} = req;
        await dbProductManager.deleteById(sid);
        res.status(204).json({message: 'ProducSto borrado'});
    }catch (error){
        res.status(error.statusCode || 500).json({ message: error.message });
    }
});

export default router;