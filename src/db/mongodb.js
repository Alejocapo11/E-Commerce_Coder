import mongoose from "mongoose";

export const init = async () => {
    try {
        await mongoose.connect('mongodb+srv://alejo111999:CoderHouse@ecommerce.geavxbx.mongodb.net/?retryWrites=true&w=majority');
        console.log('Database connected ');
    } catch (error) {
        console.log('Error connecting to database ');
    }
}