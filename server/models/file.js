import mongoose from "mongoose";



const fileSchema = new mongoose.Schema({
    path : {
        type : String,
        required : true
    },
    name : {
        type : String,
        required : true
    },
    downloads : {
        type : Number,
        required : true,
        default : 0
    },
    size : {
        type : Number,
        required : true
    }
})


const File = mongoose.model('file', fileSchema);


export default File;
