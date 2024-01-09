import { Router, response } from 'express';
import { randomNumber } from '../utils/utils.js';
import { __dirname } from '../utils/utils.js';
import path from 'path';
import { fileURLToPath } from 'url';
import productModel from '../models/product.model.js';
import { authenticateUser } from '../utils/utils.js';


const router = Router();

//Aca voy a implementar la logica para que me devuleva la lista de productos que tengo en mi product manager
//Aca tengo que mostrar los productos que tengo en la lista y tiene que cumplir los requisitos solicitados en la clase


router.get('/products', async (req, res) => {
    //Verifico que el usuario este logueado
    if (!req.session.user) {
        return res.redirect('/login');
    }
    const { page = 1, limit = 5, stock, sort } = req.query; // sort: asc | desc
    const opts = { page, limit, sort: { price: sort || 'asc' } };
    const criteria = {};
    if (stock){
        criteria.stock = stock;
    }
    const result = await productModel.paginate(criteria, opts);
    let respuesta = buildResponse({ ...result, stock, sort });
    //Agrego el usuario
    respuesta.user = req.session.user;

    res.render('products', respuesta);

});

//Creo una ruta privada donde estaria el formulario para crear un producto y que solo puedan entrar admins

router.get('/products/create', authenticateUser('admin'), (req, res) => {
    //Si pudo entrar que aparezca un mensaje diciendo que es la ruta para crear un producto
    res.response('Esta es la ruta para crear un producto');
}
);


const buildResponse = (data) =>{

    return{
        status : 'success',
        payload: data.docs.map(product => product.toJSON()),
        totalPages: data.totalPages,
        prevPage: data.prevPage,
        nextPage: data.nextPage,
        page: data.page,
        hasPrevPage: data.hasPrevPage,
        hasNextPage: data.hasNextPage,
        prevLink: data.hasPrevPage ? `http://localhost:8080/products?limit=${data.limit}&page=${data.prevPage}${data.stock ? `&stock=${data.stock}` : ''}${data.sort ? `&sort=${data.sort}` : ''}` : '',
        nextLink: data.hasNextPage ? `http://localhost:8080/products?limit=${data.limit}&page=${data.nextPage}${data.stock ? `&stock=${data.stock}` : ''}${data.sort ? `&sort=${data.sort}` : ''}` : '',
    }
};

export default router;