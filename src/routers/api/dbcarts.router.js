//Router de carts con db
import { Router } from 'express';
import { randomNumber } from '../../utils.js';
import { __dirname } from '../../utils.js';
import dbCartManager from '../../dao/dbCartManager.js';
import CartController from '../../controllers/cart.controller.js';

const router = Router();

//Hago el get que me devuelva lo que tiene el carrito por id

router.get('/carts/:cid', async (req, res) => {
    try{
        //Obtener productos por id
        const { params: { cid } } = req;
        const cart = await CartController.getById(cid);
        res.status(200).json(cart); 
    }catch (error){
        res.status(404).json({ error: 'Carrito no encontrado.' });
    }
});

//Ahora post que debera crear un carrito vacio y devolver su id

router.post('/carts', async (req, res) => {
    try{
        const cart = await CartController.addCart();
        console.log(cart);
        //Devuelvo el id del carrito creado
        res.status(201).json(cart);
    }catch (error){
        res.status(500).json({ error: 'Error al crear carrito.' });
    }
});

//Ahora pongo a actualizar el producto
router.post('/carts/:cid/products/:id_producto', async (req, res) => {
    try{
        const { params: { cid, id_producto } } = req;
        const cart = await CartController.getById(cid);
        if(!cart) throw new Error('Carrito no encontrado');
        const product = await CartController.addProductToCart(cid, id_producto);
        //Si todo salio bien mando mensaje que se agrego el producto y como va el carrito hasta ahora
        //Actualizo carrito
        const cart_act = await CartController.getById(cid);
        res.status(201).json({message: 'Producto agregado', cart_act});
    }catch (error){
        //Que tire el error que recibe
        res.status(error.statusCode || 500).json({ message: error.message });
    }
});

//Tengo que agregar un put ahora que agregue los productos que se pasan como array
router.put('/carts/:cid', async (req, res) => {
    //saco el id
    const { params: { cid } } = req;
    //saco los productos
    const { body: { products } } = req;
    //Llamo a la funcion que hice
    try{
        const updatedcart = await CartController.updateCart(cid, products);
        res.status(200).json(updatedcart);
    }catch (error){
        res.status(error.statusCode || 500).json({ message: error.message });
    }
});

//El put para actualizar las cantidades de un determinado producto
router.put('/carts/:cid/products/:id_producto', async (req, res) => {
    //La cantidad pasa como req.body
    const { params: { cid, id_producto } } = req;
    const { body: { quantity } } = req;
    try{
        const updatedcart = await CartController.updateProductQuantity(cid, id_producto, quantity);
        res.status(200).json(updatedcart);
    }catch (error){
        res.status(error.statusCode || 500).json({ message: error.message });
    }
});


export default router;