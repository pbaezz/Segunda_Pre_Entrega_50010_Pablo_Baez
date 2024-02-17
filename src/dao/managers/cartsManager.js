import cartsModel from "../../models/carts.model.js";
import { productsModel } from "../../models/products.model.js";

class cartManagerMongo {
    async getCarts(){
        return await cartsModel.find({})
    }
    async getCart(cid){
        return await cartsModel.findOne({_id: cid})
    }
    async createCarts(cartNew){
        return await cartsModel.create(cartNew)
    }
    async deleteCart(cid){
        return await cartsModel.findByIdAndDelete({_id:cid})
    }
    async deleteProduct(){
        return await cartsModel.findByIdAndUpdate({_id:cid}, {_id:pid})
    }
    async updateCart(){
        return await productsModel.paginate({}, {limit, page, lean:true});
        //return await cartsModel.paginate ({_id: cid}, itemsUpdate, {new:true})
        //productsModel.paginate({}, {limit, page: pageQuery, sort: {price: -1}, lean: true})
        //productsModel.findOneAndUpdate({}, {limit, page: pageQuery, sort: {price: -1}, lean: true})
    }
}

export default cartManagerMongo