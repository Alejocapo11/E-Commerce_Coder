import cartModel from "../models/cart.model.js";
import { Exception } from "../utils/utils.js";

export default class dbCartManager {
    
    static async getById(sid) {
        const cart = await cartModel.find({_id: sid}).populate('products.product');
        if (!cart) {
            throw new Exception("Cart not found", 404);
        }
        return cart;
    }
    //Para crear carritos pero los crea sin ningun dato
    static async addCart() {
        const cart = await cartModel.create({});
        console.log("Se creo el carrito");
        return cart;
    }

    //Agregamos productgo a un carrito
    static async addProductToCart(cartId, productId) {
        try {
            console.log('Llegue aca');
            // Utilizar findOne en lugar de find para obtener un solo documento
            let cart = await cartModel.findOne({_id: cartId});
            console.log(cart);
            if (!cart) {
                throw new Exception("Cart not found", 404);
            }
    
            // Verificar si existe un producto con esa id en el carrito
            const product = cart.products.find(p => p.product.toString() === productId);
    
            if (product) {
                // Si existe, incrementar la cantidad
                product.quantity++;
            } else {
                // Si no existe, agregar el producto al carrito con cantidad 1
                cart.products.push({ product: productId, quantity: 1 });
            }
    
            // Guardar el carrito actualizado
            let result = await cart.save();
    
            return { success: true, message: 'Product added to cart successfully' };
        } catch (error) {
            // Manejar el error y devolver la respuesta correspondiente
            return { success: false, error: error.message || 'Internal Server Error' };
        }
    }


    //Ahora tengo que hacer una funcion de update cart
    static async updateCart(cartId,products){
        //Me pasan un arreglo de ids y cantidades y se agregan al carrito
        //Primero tengo que ver si el carrito existe
        const cart = await cartModel.findOne({_id: cartId});
        if (!cart) {
            throw new Exception("Cart not found", 404);
        }
        //Ahora agrego los productos por id
        cart.products = products;
        //Guardo el carrito
        await cart.save();
        return cart;
    }
    
    //Ahora tengo que hacer una funcion que me actualize las cantidades de un producto pasandole la id del producto ese en el carrito
    static async updatequantity(cartId,productId,quantity){
        const cart = await cartModel.findOne({_id: cartId});
        if (!cart) {
            throw new Exception("Cart not found", 404);
        }
        //Ahora tengo que buscar el producto en el carrito
        const product = cart.products.find(p => p.product.toString() === productId);
        //Si no lo encuentra tiro error
        if (!product) {
            throw new Exception("Product not found", 404);
        }
        //Si lo encuentra actualizo la cantidad
        product.quantity = quantity;
        //Guardo el carrito
        await cart.save();
        return cart;
    }


}