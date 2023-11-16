import mongoose from "mongoose";

export const URI = 'mongodb+srv://alejo111999:CoderHouse@ecommerce.geavxbx.mongodb.net/?retryWrites=true&w=majority'

export const init = async () => {
    try {
        await mongoose.connect(URI);
        console.log('Database connected ');
    } catch (error) {
        console.log('Error connecting to database ');
    }
}