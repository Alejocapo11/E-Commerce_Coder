import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';



// Importa la clase ProductManager
//import ProductManager from './ProductManager.js';

// Crea una instancia de ProductManager
//const productManager = new ProductManager('productos.json'); // Ajusta la ruta del archivo


//Voy a implementar los routers 

import productsRouter from './routers/products.router.js';
import cartsRouter from './routers/carts.router.js';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', productsRouter, cartsRouter);

// app.get('/products', async (req, res) => {
//   try {
//     const limit = req.query.limit; // Obtén el valor del query param "limit"
//     //Si existe limit mando lo que necesito, en caso de no mandarlo paso todo
//     if(!limit || isNaN(limit)) return res.json(await productManager.getProducts());
//     const products = await productManager.getProducts(limit);
//     res.json(products);
//   } catch (error) {
//     res.status(500).json({ error: 'Error al obtener productos.' });
//   }
// });

// // Endpoint para obtener un producto por ID
// app.get('/products/:pid', async (req, res) => {
//   const productId = parseInt(req.params.pid);
//   if (isNaN(productId)) {
//     return res.status(400).json({ error: 'ID de producto no válido.' });
//   }

//   try {
//     const product = await productManager.getProductById(productId);
//     res.json(product);
//   } catch (error) {
//     res.status(404).json({ error: 'Producto no encontrado.' });
//   }
// });

// Inicia el servidor
app.listen(8080, () => {
  console.log(`Servidor escuchando en http://localhost: 8080`);
});
