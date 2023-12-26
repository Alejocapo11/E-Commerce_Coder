import mongoose from "mongoose";

//El modelo de esto es igual al del cart, solo que cuando se vayan a pagar hay que verificar que el stock sea mayor a 0

const productItemSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: { type: Number, default: 1 }  // Asumiendo que la cantidad predeterminada es 1
},{ _id: false });

const ticketSchema = new mongoose.Schema({
    products: [productItemSchema]
});

//Ahora lo de populate

ticketSchema.pre('find', function() {
    this.populate('products.product');
});

export default mongoose.model('Ticket', ticketSchema);