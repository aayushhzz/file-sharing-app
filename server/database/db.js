import mongoose from 'mongoose';

// Connect to MongoDB
const DB_URL = 'mongodb+srv://aayush:tqYjaVs5HIUzmYhb@cluster0.nkcucoe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

const DBconnection = async ()=>{
    try {
        await mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connected to database');
    } catch (error) {
        console.error('Error while connecting with database: ', error.message);
    }
}


export default DBconnection;