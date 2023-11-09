import mongoose from "mongoose";

const productItemSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: { type: Number, default: 1 }  // Asumiendo que la cantidad predeterminada es 1
},{ _id: false });

const cartSchema = new mongoose.Schema({
    products: [productItemSchema]
});

//Ahora lo de populate

cartSchema.pre('find', function() {
    this.populate('products.product');
});

export default mongoose.model('Cart', cartSchema);