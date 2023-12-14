import mongoose from "mongoose";
import config from '../config.js';

export const URI = config.db.mongodbUri;

export const init = async () => {
    try {
        await mongoose.connect(URI);
        console.log('Database connected ');
    } catch (error) {
        console.log('Error connecting to database ');
    }
}