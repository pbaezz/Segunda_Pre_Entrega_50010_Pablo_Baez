import express from 'express'
import { __dirname } from './utils.js'
import handlebars from 'express-handlebars'
import { Server } from 'socket.io'

import productsRouter from './routes/products.routes.js'
import { cartsRouter } from './routes/carts.routes.js'
import viewsRouter from './routes/views.routes.js'
import socketProducts from './listeners/socketProducts.js'
import connectDB from './dao/config/connectDB.js'

const server = express ()
const PORT = 8080
connectDB()


server.use(express.static(__dirname+'/public'))
server.use(express.json())
server.use(express.urlencoded({extended:true}))

server.use('/api',cartsRouter)
server.use('/api', productsRouter)
server.use('/', viewsRouter)

server.engine('handlebars', handlebars.engine())
server.set('views', __dirname+'/views')
server.set('view engine', 'handlebars')


const httpServer=server.listen(PORT, ()=>{
    try{
        console.log(`Servidor Express Puerto ${PORT}\nAcceder a:`)
        console.log(`\t1). http://localhost:${PORT}/api/products`)
        console.log(`\t2). http://localhost:${PORT}/api/carts`)
        console.log(`\t3). http://localhost:${PORT}/products`)
        console.log(`\t4). http://localhost:${PORT}/carts/65be85cb58506dd222398cb4`)
        console.log(`\t3). http://localhost:${PORT}/product/65ada11cea4c1fc8af22cb77`)
        
    }
    catch (err){
        console.log(err)
    }
})

const socketServer = new Server(httpServer)
socketProducts(socketServer)
