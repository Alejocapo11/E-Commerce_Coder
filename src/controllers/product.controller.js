import ProductService from "../services/product.services.js";

export default class ProductController {
    static async get(){
        const products = await ProductService.getAllProducts();
        return products;
    }

    static async getById(sid){
        const product = await ProductService.getProductById(sid);
        return product;
    }

    static async create(data){
        const product = await ProductService.createProduct(data);
        return product;
    }

    static async updateById(sid, data){
        const product = await ProductService.updateProductById(sid, data);
        return product;
    }

    static async deleteById(sid){
        const product = await ProductService.deleteProductById(sid);
        return product;
    }


}