import http from 'http';
import { Server } from 'socket.io';
import { Router } from 'express';
import ProductManager from './routers/ProductManager.js';
import path from 'path';
import { fileURLToPath } from 'url';

const ruta= path.resolve(path.resolve(path.dirname(fileURLToPath(import.meta.url)), 'routers/archivos', 'productos.json'));


const productManager = new ProductManager(ruta);

import app from './app.js';

const server = http.createServer(app);
const socketServer = new Server(server);
const PORT = 8080;

let products = await productManager.getProducts();
  
socketServer.on('connection', (clienteSocket) => {
    console.log(`Nuevo cliente conectado 🎉 (${clienteSocket.id}).`);
    clienteSocket.emit('start', products);
    
    clienteSocket.on('new-product', async (data) => {
        // Aca recibo los datos de un producto nuevo y tengo que agregarlo al product manager
        // y emitir un evento a todos los clientes con el nuevo producto
        // Agrego el producto al product manager
        await productManager.addProduct(data);
        // Emito un evento a todos los clientes con el nuevo producto
        products = await productManager.getProducts();
        socketServer.emit('notification', products);
        //console.log("Llegue");
    });

    clienteSocket.on('disconnect', () => {
      console.log(`Cliente desconectado (${clienteSocket.id}) 😨.`);
    });
  });
  
server.listen(PORT, () => {
    console.log(`Server running in http://localhost:${PORT}/`);
});