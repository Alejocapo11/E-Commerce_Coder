import CartDao from '../dao/dbCartManager.js'

export default class CartService {

    static async getCartById(sid) {
        return await CartDao.getById(sid);
    }

    static async addCart() {
        return await CartDao.create();
    }

    static async addProductToCart(cid, pid) {
        return await CartDao.addProductToCart(cid, pid);
    }

    static async updateCart(cid, products) {
        return await CartDao.updateCart(cid, products);
    }

    static async updateProductQuantity(cid, pid, quantity) {
        return await CartDao.updatequantity(cid, pid, quantity);
    }





}