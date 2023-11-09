import productModel from "../models/product.model.js";
import { Exception } from "../utils.js";

export default class dbProductManager {

    static async get() {
        return productModel.find();
    }


    //Ahora el get por id
    static async getById(sid) {
        //sid = "65444ca7225a033406e4e4f1";
        const product = await productModel.findById(sid);
        if (!product) {
            console.log("No se encontro el producto");
            throw new Exception("Product not found", 404);
        }
        return product;
    }

    //Ahora para crear
    static async create(data) {
        const product = await productModel.create(data);
        console.log("Se creo el producto");
        return product;
    }

    //Ahora para modificar por Id
    static async updateById(sid, data){
        const product = await productModel.findById(sid);
        if (!product) {
            throw new Exception("Product not found", 404);
        }
        const criteria = { _id: sid };
        const operation = { $set: data };
        await productModel.updateOne(criteria, operation);
        console.log("Se modifico el producto");
    }

    //Ahora para borrar por Id
    static async deleteById(sid){
        const product = await productModel.findById(sid);
        if (!product) {
            throw new Exception("Product not found", 404);
        }
        const criteria = { _id: sid };
        await productModel.deleteOne(criteria);
        console.log("Se borro el producto");
    }

}