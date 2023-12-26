import TicketService from "../services/ticket.services";

export default class TicketController {
    
        static async createTicket(cartId){
            const ticket = await TicketService.createTicket(CartId);
            return ticket;
        }
    
        static async getTicketById(id){
            const ticket = await TicketService.getTicketById(id);
            return ticket;
        }
    
    }