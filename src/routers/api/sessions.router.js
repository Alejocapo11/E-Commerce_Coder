import { Router } from "express";
import userModel from "../../models/user.model.js";


const router = Router();

router.post("/sessions/register", async (req, res) => {
    const {body} = req;
    body.role = 'user';
    const newUser = await userModel.create(body);
    //Agrego al newuser el rol de usuario
    res.redirect('/login');
});

router.post('/sessions/login', async (req, res) => {
    const { body: { email, password } } = req;
    //Antes del resto veamos si no es el admin
    if (email === 'adminCoder@coder.com' && password === 'adminCod3r123') {
        req.session.user = {first_name: 'admin', last_name: 'coder', email: 'adminCoder@coder.com', role: 'admin'};
        return res.redirect('/products');
    }


    //Verificamos que exista el mail
    const user = await userModel.findOne({ email });
    if (!user) {
        return res.status(401).send({ message: 'Correo o contraseña invalidos' });
    }
    const isPassValid = user.password === password;
    if (!isPassValid) {
        return res.status(401).send({ message: 'Correo o contraseña invalidos' });
    }
    //Abrimo la session del usuario
    const {first_name, last_name, role} = user;
    req.session.user = {first_name, last_name, email, role};
    res.redirect('/products');
});

//Ahora el router para cerrar session
router.get('/sessions/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/login');
});

export default router;