const express = require('express');
const app = express();
const port = 8080; 

// Importa la clase ProductManager
const ProductManager = require('./ProductManager'); // Asegúrate de que la ruta sea correcta

// Crea una instancia de ProductManager
const productManager = new ProductManager('productos.json'); // Ajusta la ruta del archivo


//Define los endpoints

// Endpoint para obtener todos los productos con límite opcional
app.get('/products', async (req, res) => {
  try {
    const limit = req.query.limit; // Obtén el valor del query param "limit"
    //Si existe limit mando lo que necesito, en caso de no mandarlo paso todo
    if(!limit || isNaN(limit)) return res.json(await productManager.getProducts());
    const products = await productManager.getProducts(limit);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener productos.' });
  }
});

// Endpoint para obtener un producto por ID
app.get('/products/:pid', async (req, res) => {
  const productId = parseInt(req.params.pid);
  if (isNaN(productId)) {
    return res.status(400).json({ error: 'ID de producto no válido.' });
  }

  try {
    const product = await productManager.getProductById(productId);
    res.json(product);
  } catch (error) {
    res.status(404).json({ error: 'Producto no encontrado.' });
  }
});

// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
