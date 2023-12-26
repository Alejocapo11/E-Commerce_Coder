//Aca tengo que hacer el ticket services 

import dbTicketManager from "../dao/dbTicketManager";
import dbProductManager from "../dao/dbProductManager";
import dbCartManager from "../dao/dbCartManager";

export default class TicketService {

    static async createTicket(Cartid){
        //Antes de crear el ticket voy a revisar que tenga stock de los productos que hay en ese cart
        //Primero tengo que buscar el cart
        const cart = await dbCartManager.getCartById(Cartid);
        //Si no existe el cart, lanzo una excepcion
        if(!cart){
            throw new Exception("Cart not found", 404);
        }

        //Ahora obtengo los productos de ese cart
        const products = cart.products;

        //Si no hay stock, saco ese producto del ticket 
        // Me fijo en el product manager si encuentro todos los productos que me pasaron
        for (let i = 0; i < products.length; i++) {
            const product = await dbProductManager.getProductById(products[i].product);
            if(!product){
                products.splice(i,1);
            }
            if(product.stock < products[i].quantity){
                products.splice(i,1);
            }
        }
        //Ahora creo el ticket
        return await dbTicketManager.createTicket(products, user);
    }

    static async getTicketById(id){
        return await dbTicketManager.getTicketById(id);
    }

}