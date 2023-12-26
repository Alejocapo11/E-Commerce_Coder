//Aca tengo que hacer un metodo que me cree el ticket a partir de los datos proporcionados y tambien un metodo que me devuelva el ticket por id

import ticketModel from "../models/ticket.model.js";
import { Exception } from "../utils.js";

export default class dbTicketManager {
    //Aca tengo que hacer un metodo que me cree el ticket a partir de los datos proporcionados
    static async createTicket(products, user){
        //Tengo que crear un ticket con los productos y el usuario que me pasan
        //Primero tengo que ver si el usuario existe
        //Si el usuario no existe tengo que lanzar una excepcion
        //Si el usuario existe tengo que ver si los productos existen
        //Si los productos no existen tengo que lanzar una excepcion
        //Si los productos existen tengo que ver si hay stock
        //Si no hay stock tengo que lanzar una excepcion
        //Si hay stock tengo que crear el ticket
        //Tengo que devolver el ticket creado
        //Tengo que actualizar el stock de los productos
        try{
            const ticket = await ticketModel.create({products: products, user: user});
            return ticket;
        }catch(error){
            throw new Exception("Error al crear el ticket", 500);
        }
    }

    //Ahora tengo que hacer un metodo que me devuelva el ticket por id
    static async getTicketById(id){
        //Tengo que ver si el ticket existe
        //Si el ticket no existe tengo que lanzar una excepcion
        //Si el ticket existe tengo que devolver el ticket
        try{
            const ticket = await ticketModel.findById(id);
            if(!ticket){
                throw new Exception("Ticket not found", 404);
            }
            return ticket;
        }catch(error){
            throw new Exception("Error al obtener el ticket", 500);
        }
    }
}