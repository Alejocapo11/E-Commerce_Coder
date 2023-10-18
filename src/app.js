import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { __dirname } from './utils.js';
import handlebars from 'express-handlebars';



//Voy a implementar los routers 

import productsRouter from './routers/products.router.js';
import cartsRouter from './routers/carts.router.js';
import indexRouter from './routers/index.router.js';
import realTimeProducts from './routers/realtimeproducts.router.js';

const app = express();
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));
app.engine('handlebars', handlebars.engine());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');



app.use('/', indexRouter,realTimeProducts);
app.use('/api', productsRouter, cartsRouter);


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