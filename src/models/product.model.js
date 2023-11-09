import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productSchema = new mongoose.Schema({
    title: {type : String, required: true},
    description: {type : String, required: true},
    code: {type : String, required: true},
    price: {type : Number, required: true},
    stock: {type : Number, required: true},
    thumbnail: {type : String, required: false},
    status: {type : Boolean, required: false},
});

productSchema.plugin(mongoosePaginate);

export default mongoose.model('Product', productSchema);
