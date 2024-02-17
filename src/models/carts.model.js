import { Schema, model } from 'mongoose';

const cartCollection="carts"
const cartSchema = new Schema({
    products: {
        type: Array,
        required: true,
        default: [],
    },
    isActive:{
        type:Boolean,
        default:true
    }
})
		


export const cartsModel = model(cartCollection, cartSchema);