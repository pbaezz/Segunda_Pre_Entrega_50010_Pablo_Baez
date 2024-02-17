import { Router } from 'express'
import {cartsModel} from '../models/carts.model.js'
import {productsModel} from '../models/products.model.js'
export const cartsRouter = Router()


cartsRouter
    .get('/carts', async (request, responses)=>{
        try {
            const carts = await cartsModel.find({isActive: true})
            responses.json({
                status: 'success',
                result: carts
            })
        } catch (error) {
            console.log(error)
        }
    })
    .post('/carts', async (request, responses)=>{
        try {
            const { body } = request
            const result = await cartsModel.create(body)

            responses.send({
                status: 'success',
                result
            })
        } catch (error) {
            console.log(error)
        }
    })
    .get('/carts/:cid', async (request, responses)=>{
        try {
            const { cid } = request.params
            const cart = await cartsModel.findOne({_id: cid})
            responses.json({
                status: 'success',
                result: cart
            })
        } catch (error) {
            console.log(error)
        }
    })
    .put('/carts/:cid/products/:pid', async (request, responses) => {
        try {
            const {cid} = request.params
            //const itemsUpdate= request.body;

            const existingCart = await cartsModel.findById ({_id: cid});

            if (!existingCart) {
                responses.status(404).json({ message: 'Carrito no encontrado' });
            }
            //const result = await cartsModel.findOneAndUpdate ({_id: cid}, itemsUpdate, {new:true})
            //const result = await cartsModel.paginate ({},{_id: cid}, {new:true})
            const {limit, pageQuery} = request.query
            const {
                docs,
                hasPrevPage, 
                hasNextPage,
                prevPage, 
                nextPage,
                page 
            } = await productsModel.paginate({}, {limit, page: pageQuery, sort: {price: -1}, lean: true})
            const docss = {
                payload: docs,
                hasPrevPage, 
                hasNextPage,
                prevPage, 
                nextPage,
                page, 
                status: 'sucess',
            }
            const prod = await cartsModel.findOneAndUpdate ({_id: cid}, docss, {new:true})
            responses.send({
                status: 'success',
                result: prod
            })
            
        } catch (err) {
            console.error(err);
            responses.status(500).json({ error: 'Internal Server Error' });
        }
    })

    .delete('/carts/:cid', async (request, responses)=>{
        try {
            const {cid} = request.params
            const result = await cartsModel.findByIdAndDelete ({_id:cid}, {isActive: false})
            responses.send('delete cart')
        } catch (error) {
            console.log(error)
        }
    })

    .delete('/carts/:cid/products/:pid', async (request, responses)=>{
        const {cid, pid} = request.params
        try {
            const cart = await cartsModel.findById(cid)
            if (!cart) {
                return responses.status(404).json({
                    message: 'carrito no encontrado'
                })
            }

            const updatedCart = await cartsModel.findByIdAndUpdate(
                cid,
                {$pull: {products:{_id: pid}}},
                {new: true}
            )
            res.json(updatedCart)
            responses.send('delete product')

        } catch (error) {
            console.error(error)
            res.status(500).json({message:'error interno del server'})
        }
    })

