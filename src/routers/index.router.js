import { Router } from 'express';
import { randomNumber } from '../utils.js';
import { __dirname } from '../utils.js';
import ProductManager from './ProductManager.js';
import path from 'path';
import { fileURLToPath } from 'url';

const ruta= path.resolve(path.resolve(path.dirname(fileURLToPath(import.meta.url)), 'archivos', 'productos.json'));
const productManager = new ProductManager(ruta);

const router = Router();

//Aca voy a implementar la logica para que me devuleva la lista de productos que tengo en mi product manager



router.get('/', async (req, res) => {
    try {
        const products = await productManager.getProducts();
        res.render('index', { products });
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener productos.' });
    }
//   const position = randomNumber(0, users.length - 1);
//   const user = users[1];
//   res.render('index');
});

export default router;