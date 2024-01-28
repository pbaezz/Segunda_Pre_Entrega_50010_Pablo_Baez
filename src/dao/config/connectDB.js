import mongoose from "mongoose";
const URI='mongodb+srv://pbaez:Rdd456Grtb9LHdZ3@cluster0.1gq5cbw.mongodb.net/PF_ecommerce?retryWrites=true&w=majority'

const connectDB = () => {
    try {
        mongoose.connect(URI)
        console.log('MongoDB conectado')
    } catch (error) {
        console.log(error);
    }
};

export default connectDB