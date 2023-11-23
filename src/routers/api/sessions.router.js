import { Router } from "express";
import userModel from "../../models/user.model.js";
import {createHash, isValidPassword} from '../../utils.js';
import passport from "passport";


const router = Router();

/*router.post("/sessions/register", async (req, res) => {
    const {body} = req;
    body.role = 'user';
    const newUser = await userModel.create({...body, password : createHash(body.password)});
    //Agrego al newuser el rol de usuario
    res.redirect('/login');
});*/

//Ahora con passport
router.post("/sessions/register", passport.authenticate('register', {
    successRedirect: '/login',
    failureRedirect: '/register',
    failureFlash: true,
}));

/*router.post('/sessions/login', async (req, res) => {
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
    const isPassValid = isValidPassword(password, user);
    if (!isPassValid) {
        return res.status(401).send({ message: 'Correo o contraseña invalidos' });
    }
    //Abrimo la session del usuario
    const {first_name, last_name, role} = user;
    req.session.user = {first_name, last_name, email, role};
    res.redirect('/products');
});*/

//Ahora con passport

router.post('/sessions/login', passport.authenticate('login', { failureRedirect: '/login' }), (req, res) => {
    console.log('req.user', req.user);
    req.session.user = req.user;
    res.redirect('/products');
  });

//Ahora el router para github

router.get('/sessions/github', passport.authenticate('github', { scope: ['user:email'] }));

router.get('/sessions/github/callback', passport.authenticate('github', { failureRedirect: '/login' }), (req, res) => {
    req.session.user = req.user;
    res.redirect('/profile');
  });

//El router para recuperar el password
router.post('/sessions/recovery-password', async (req, res) => {
    const {email, newPassword}= req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
        return res.status(401).send({ message: 'No se encontro el usuario' });
    }
    await userModel.updateOne({email},{$set : {password : createHash(newPassword)}});
    res.redirect('/login');

});


//Ahora el router para cerrar session
router.get('/sessions/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/login');
});

export default router;