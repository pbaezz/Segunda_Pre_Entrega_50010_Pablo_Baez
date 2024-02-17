import { Router } from 'express';
//import ProductManager from '../dao/managers/productManager.js';
import { __dirname } from "../utils.js"
import { productsModel } from '../models/products.model.js';
import {cartsModel} from '../models/carts.model.js';

//const pm = new ProductManager()
const viewsRouter = Router()

viewsRouter.get("/products",async(req,res)=>{
    const {limit = 2, pageQuery = 1} = req.query
        const {
            docs,
            hasPrevPage, 
            hasNextPage,
            prevPage, 
            nextPage,
            page 
        } = await productsModel.paginate({}, {limit, page: pageQuery, sort: {price: -1}, lean: true})
        res.render("home", {
            listadeproductos: docs,
            hasPrevPage, 
            hasNextPage,
            prevPage, 
            nextPage,
            page 
        })
    })

viewsRouter.get("/product/:pid",async(req,res)=>{
    try {
        
        const productId = req.params.pid;
    
        // Buscar el producto por ID en la base de datos
        const product = await productsModel.findById(productId);
    
        if (!product) {
            return res.status(404).send('Producto no encontrado');
        }
    
        // Renderizar la vista del producto
        res.render("detalle", product);
    } catch (error) {
        res.status(500).send('Error interno del servidor');
    }
});

viewsRouter.get("/carts/:cid", async(req,res)=>{
    try {
        const cartId = req.params.cid;
    
        // Buscar el producto por ID en la base de datos
        const cart = await cartsModel.findById(cartId);
    
        if (!cart) {
            return res.status(404).send('Carrito no encontrado');
        }
        
        res.render("cart", cart)
        
    } catch (error) {
        res.status(500).send('Error interno del servidor');  
    }
})
        


viewsRouter.get("/realtimeProducts",(req,res)=>{
res.render("realtimeProducts")
})


export default viewsRouter