//Aca tengo que hacer algo parecido a lo que hice con el router de products
//Los carritos deberan contar cada uno con un id propio 
//Ya tengo la clase hecha asi que es muy parecido al router de productos

import { Router } from 'express';
import ProductManager from './ProductManager.js';
import CartManager from './CartManager.js';
import path from 'path';
import { fileURLToPath } from 'url';

const ruta = path.resolve(path.resolve(path.dirname(fileURLToPath(import.meta.url)), 'archivos', 'carritos.json'));

const rutap = path.resolve(path.resolve(path.dirname(fileURLToPath(import.meta.url)), 'archivos', 'productos.json'));

const productManager = new ProductManager(rutap);
const cartManager = new CartManager(ruta);

const router = Router();

//La ruta GET /:cid deberá listar los productos que pertenezcan al carrito con el parámetro cid proporcionados.


router.get('/carts/:cid', async (req, res) => {
    const cartId = parseInt(req.params.cid);
    if (isNaN(cartId)) {
        return res.status(400).json({ error: 'ID de carrito no válido.' });
    }
    try {
        const cart = await cartManager.getCartById(cartId);
        res.json(cart);
    } catch (error) {
        res.status(404).json({ error: 'Carrito no encontrado.' });
    }
});

//La ruta POST / deberá crear un carrito vacío y devolver su id.

router.post('/carts', async (req, res) => {
    try {
        await cartManager.addCart();
        res.json({ message: 'Carrito creado exitosamente.' });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear carrito.' });
    }
});

//La ruta POST /:cid/productos/:id_producto deberá agregar un producto al carrito con el id proporcionado.

router.post('/carts/:cid/products/:id_producto', async (req, res) => {
    const cartId = parseInt(req.params.cid);
    const productId = parseInt(req.params.id_producto);
    if (isNaN(cartId) || isNaN(productId)) {
        return res.status(400).json({ error: 'ID de carrito o producto no válido.' });
    }
    try {
        //Antes de agregar el producto verifico que exista su id en el product manager
        await productManager.getProductById(productId); //Esto ya deberia tirar el error con la logica previamente programada
        await cartManager.addProductToCart(cartId, productId);
        res.json({ message: 'Producto agregado exitosamente.' });
    } catch (error) {
        res.status(404).json({ error: 'Carrito o producto no encontrado.' });
    }
});

export default router;

//Con esto deberia andar todo bien