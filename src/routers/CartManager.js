import { promises as fs } from 'fs';
import path from 'path';

export default class CartManager {
    constructor(filePath) {
        this.path = filePath;
        this.carts = [];
        this.nextId = 1;

        // Verificar si el archivo existe, si no, crearlo
        // (async () => {
        //     await this.checkAndCreateFile();
        // })();
        this.checkAndCreateFile();
    }

    async checkAndCreateFile() {
        try {
            await fs.access(path.resolve(this.path));
        } catch (error) {
            // El archivo no existe, crearlo con un arreglo vacío
            await fs.writeFile(this.path, '[]', 'utf8');
        }
    }

    async addCart() {
        //Los datos del carrito son unicamente una Id y no se pasan productos todavia
        await this.loadFromFile(); //Siempre cargo los productos antes de agregar uno nuevo

        // Generar el carrito para agregarlo al array
        const newCart = {
            id: this.nextId++,
            products: []
        };

        this.carts.push(newCart);

        // Guardar el array en el archivo
        await this.saveToFile();

    }

    async getCartById(cartId) {
        await this.loadFromFile();
        const cart = this.carts.find(cart => cart.id === cartId);
        if (!cart) {
            throw new Error('Carrito no encontrado');
        }
        return cart;
    }

    async addProductToCart(cartId, productId) {
        await this.loadFromFile();
        const cart = await this.getCartById(cartId);
        //Si ya existe el producto aumento una unidad si no agrego el primer al carrito
        const existingProduct = cart.products.find(product => product.id === productId);
        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            cart.products.push({ id: productId, quantity: 1 });
        }
        await this.saveToFile();
    }


    async saveToFile() {
        try{
            await fs.writeFile(this.path, JSON.stringify(this.carts, null, 2), 'utf8');
        }catch(error){
            throw new Error('Error al guardar los datos');
        }   
    }

    async loadFromFile() {
        try{
            await this.checkAndCreateFile();
            const fileData = await fs.readFile(this.path, 'utf8');
            //verifico si el archivo esta vacio
            if(fileData.trim()=='')
            {
                this.carts = [];
                return;
            }else{
                this.carts = JSON.parse(fileData);
            }

            //calculo el siguiente id basado en los carritos cargados
            if(this.carts.length > 0){
                const lastCart = this.carts[this.carts.length - 1];
                this.nextId = lastCart.id + 1;
            }
        }catch(error){
            //Tiro el error y el tipo
            throw new Error('Error al cargar los datos');
        }
    }
}


//Pruebas
// const cartManager = new CartManager('carritos.json');

// (async () => {
//     try {
//         await cartManager.addCart();
//         await cartManager.addCart();
//         //Tengo dos carritos creados
//         //Agrego productos a cada uno
//         await cartManager.addProductToCart(1, 1);
//         await cartManager.addProductToCart(1, 1);
//         await cartManager.addProductToCart(1, 2);
//         console.log(await cartManager.getCartById(1));
//         console.log(await cartManager.getCartById(2));
//     } catch (error) {
//         console.log(error);
//     }
// }
// )();

