import CartService from "../services/cart.services.js";

export default class CartController {
    static async getById(sid){
        const cart = await CartService.getCartById(sid);
        return cart;
    }

    static async addCart(){
        const cart = await CartService.addCart();
        return cart;
    }

    static async addProductToCart(cid, pid){
        const cart = await CartService.addProductToCart(cid, pid);
        return cart;
    }

    static async updateCart(cid, products){
        const cart = await CartService.updateCart(cid, products);
        return cart;
    }

    static async updateProductQuantity(cid, pid, quantity){
        const cart = await CartService.updateProductQuantity(cid, pid, quantity);
        return cart;
    }

    


}