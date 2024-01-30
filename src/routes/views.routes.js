import { Router } from 'express';
import ProductManager from '../dao/managers/productManager.js';
import { __dirname } from "../utils.js"
import { productsModel } from '../models/products.model.js';

const pm = new ProductManager()
const viewsRouter = Router()


viewsRouter.get("/",async(req,res)=>{
    const listadeproductos=await pm.getProductsView()
    res.render("home",{listadeproductos})
})

viewsRouter.get("/products",async(req,res)=>{
    const {limit = 10, pageQuery = 1} = req.query
        const {
            docs,
            hasPrevPage, 
            hasNextPage,
            prevPage, 
            nextPage,
            page 
        } = await productsModel.paginate({}, {limit, page: pageQuery, sort: {price: -1}, lean: true})
        //console.log(page)
        res.render("home", {
            products: docs,
            hasPrevPage, 
            hasNextPage,
            prevPage, 
            nextPage,
            page 
        })
    })

viewsRouter.get("/realtimeProducts",(req,res)=>{
res.render("realtimeProducts")
})


export default viewsRouter