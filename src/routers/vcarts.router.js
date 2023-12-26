// cartRouter.js
import { Router } from 'express';
import cartModel from '../models/cart.model.js';

const router = Router();

router.get('/carts/:cid', async (req, res) => {
    // Aca tengo que mostrar los productos pertenecientes a este carrito
    const { params: { cid } } = req;
    const result = await cartModel.findById(cid).populate('products.product');
    console.log(buildResponse(result));
    res.render('cart', buildResponse(result));
});



// Ahora la función de build response
const buildResponse = (data) => {
    return {
        status: 'success',
        payload: data.products.map(product => product.product.toJSON()), // Ajustado aquí
    };
};

export default router;
