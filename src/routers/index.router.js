import { Router } from "express";
import {createHash, isValidPassword} from '../utils.js';
import { generateProduct } from "../utils/utils.js"; 
import { CustomError } from "../utils/CustomError.js";
import { generatorProductError } from "../utils/CauseMessageError.js";

const router = Router();

const privateRouter = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }
    next();
};

const publicRouter = (req, res, next) => {
    if (req.session.user) {
        return res.redirect('/profile');
    }
    next();
};

router.get("/",privateRouter, (req, res) => {
    return res.redirect('/products');
});



router.get("/profile", privateRouter, (req, res) => {
    res.render("profile", { title: "Profile", user : req.session.user });
});

//Creo un router current que es casi igual al profile 
router.get('/current', async (req, res) => {
    try {
        // Obtén el usuario desde la sesión u otras fuentes
        const user = req.session.user; // Asegúrate de tener una sesión establecida correctamente

        if (!user) {
            return res.status(401).json({ error: 'Usuario no autenticado' });
        }

        // Crea un DTO con la información necesaria del usuario
        const userDTO = {
            // Agrega cualquier otra información necesaria
            name: user.first_name + ' ' + user.last_name,
            role: user.role,
            email: user.email
        };

        res.json({ user: userDTO });
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el usuario actual' });
    }
});



router.get("/login" , publicRouter, (req, res) => {
    res.render("login", { title: "Login" });
});

//Ahora register
router.get("/register" , publicRouter, (req, res) => {
    res.render("register", { title: "Register" });
});


//Ahora el router para recuperar el password
router.get("/recovery-password" , publicRouter, (req, res) => {
    res.render("recovery-password", { title: "Recover Password" });
});

//Aca hago el generador de usuarios para pruebas

//Le agrego el chekeo de los errrores
router.get("/mockingproducts", (req, res) => {

    const products = [];
    for (let index = 0; index < 10; index++) {
        //Checkeo que el producto este bien y si no creo un custom error
        const product = generateProduct();
        if(!product.title || !product.price || !product.code){
            CustomError.createError({
                name: 'ValidationError',
                message: generatorProductError(product),
                code: 400,
            });
        }
        products.push(product);
    }
    res.status(200).json(products);

}
);

export default router;