import express from 'express';
import path from 'path';
import passport from 'passport';
import { fileURLToPath } from 'url';
import { __dirname } from './utils.js';
import handlebars from 'express-handlebars';
import expressSession from 'express-session';
import MongoStore from 'connect-mongo';

import { URI } from './db/mongodb.js';


//Voy a implementar los routers de views

import vproductsRouter from './routers/vproducts.router.js';
import realTimeProducts from './routers/realtimeproducts.router.js';
import vcartsRotuer from './routers/vcarts.router.js';
import indexRouter from './routers/index.router.js';

//Aca los routers con db
import dbproductsRouter from './routers/api/dbproducts.router.js';
import dbcartsRouter from './routers/api/dbcarts.router.js';

//sessions routers
import sessionRouter from './routers/api/sessions.router.js';

import {init as initPassportConfig} from './config/passport.config.js';


const app = express();

//Configuro las sesiones
const SESSION_SECRET = 'secret';

app.use(expressSession({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: URI,
      mongoOptions: {},
      ttl: 120,
    }), 
}));


// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));
app.engine('handlebars', handlebars.engine());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

initPassportConfig();

app.use(passport.initialize());
app.use(passport.session());

app.use('/', vproductsRouter,vcartsRotuer,realTimeProducts,indexRouter);
app.use('/api', dbproductsRouter, dbcartsRouter,sessionRouter);


// app.get('/realtimeproducts', (req, res) => {
//   // Renderiza la vista "realTimeProducts.handlebars" aquí
//   res.render('realTimeProducts');
// });
// app.use((error, req, res, next) => {
//   const message = `😨 Ah ocurrido un error desconocido: ${error.message}`;
//   console.log(message);
//   res.status(500).json({ status: 'error', message });
// });



export default app;