import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

export const ConnectMongoDB = async () =>{
    try {
        const conn = await mongoose.connect(process.env.MONGOURL);
        console.log("connected to mongodb", conn.connection.host);
    } catch (error) {
        console.log("Error while connecting to MongoDB", error); 
    }
}