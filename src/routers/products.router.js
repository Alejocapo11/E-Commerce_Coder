//Aca hay que hacer la implementación del get, post, put y delete

import { Router } from 'express';
import ProductManager from './ProductManager.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { emitFromApi } from '../server.js';

//Para que los archivos se creen siempre en la misma carpeta no importa desde donde se llame

const ruta= path.resolve(path.resolve(path.dirname(fileURLToPath(import.meta.url)), 'archivos', 'productos.json'));

const productManager = new ProductManager(ruta);

//Empezemos con el gets

const router = Router();



router.get('/products', async (req, res) => {
    try {
        const limit = req.query.limit; // Obtén el valor del query param "limit"
        //Si existe limit mando lo que necesito, en caso de no mandarlo paso todo
        if(!limit || isNaN(limit)) return res.json(await productManager.getProducts());
        const products = await productManager.getProducts(limit);
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener productos.' });
    }
});

router.get('/products/:id', async (req, res) => {
    //Obtener productos por id
    const productId = parseInt(req.params.id);
    if (isNaN(productId)) {
        return res.status(400).json({ error: 'ID de producto no válido.' });
    }
    try {
        const product = await productManager.getProductById(productId);
        res.json(product);
    } catch (error) {
        res.status(404).json({ error: 'Producto no encontrado.' });
    }
});

router.post('/products', async (req, res) => {
    try {
        //Verifico que se pasen todas las keys obligatorias
        if (!req.body.title || !req.body.description || !req.body.price || !req.body.code || !req.body.stock) {
            throw new Error('Faltan datos obligatorios');
        }
        //Extraigo los datos del body
        const productData = req.body;
        //Si es que no me paso status lo pongo en true por defecto
        if (!req.body.status) {
            productData.status = true;
        }
        //Llamo a la funcion addProduct de ProductManager
        await productManager.addProduct(productData);
        //Emito el evento a todos los clientes con el nuevo producto
        const products = await productManager.getProducts();
        emitFromApi('notification', products);
        // Respuesta exitosa
        res.status(201).json({ message: 'Producto agregado correctamente' });
    } catch (error) {
        // Manejo de errores en caso de que ocurra un problema al agregar el producto
        res.status(400).json({ error: error.message });
    }
});


router.put('/products/:id', async (req, res) => {
    try {
        // Obtén el ID del producto de los parámetros de la URL
        const productId = parseInt(req.params.id);

        // Verifica si el producto con el ID proporcionado existe
        const existingProduct = await productManager.getProductById(productId);

        // Extrae los datos actualizados del cuerpo de la solicitud
        const updatedProduct = req.body;
        console.log(updatedProduct);

        // Llama al método updateProduct de ProductManager para actualizar el producto
        await productManager.updateProduct(productId, updatedProduct);

        // Respuesta exitosa
        res.json({ message: 'Producto actualizado correctamente' });
    } catch (error) {
        // Manejo de errores en caso de que ocurra un problema al actualizar el producto
        res.status(400).json({ error: error.message });
    }
});

router.delete('/products/:id', (req, res) => {
    try{
        const productId = parseInt(req.params.id);
        productManager.deleteProduct(productId);
        res.json({ message: 'Producto eliminado correctamente' });
    }catch(error){
        res.status(400).json({ error: error.message });
    }
});

export default router;


