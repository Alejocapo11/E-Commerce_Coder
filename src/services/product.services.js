import ProductDao from '../dao/dbProductManager.js'

export default class ProductService {
    //En esta clase lo que tengo que hacer es llamar a los metodos del dao y devolver lo que me devuelvan
    static async getAllProducts() {
        return await ProductDao.get();
    }

    static async getProductById(sid) {
        return await ProductDao.getById(sid);
    }

    static async createProduct(data) {
        return await ProductDao.create(data);
    }

    static async updateProductById(sid, data) {
        return await ProductDao.updateById(sid, data);
    }

    static async deleteProductById(sid) {
        return await ProductDao.deleteById(sid);
    }



}