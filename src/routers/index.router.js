import { Router } from "express";

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

router.get("/login" , publicRouter, (req, res) => {
    res.render("login", { title: "Login" });
});

//Ahora register
router.get("/register" , publicRouter, (req, res) => {
    res.render("register", { title: "Register" });
});

export default router;