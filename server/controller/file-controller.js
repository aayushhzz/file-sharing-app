import File from "../models/file.js";


export const uploadFile = async (req,res) => {
    const fileObj = {
        path : req.file.path,
        name : req.file.originalname,
        size : req.file.size
    }
    try {
        const file = await File.create(fileObj);
        res.status(200).json({path : `http://localhost:4999/file/${file._id}`});
    } catch (error) {
        console.error('Error uploading file: ', error.message);
    }
};


export const downloadFile = async (req,res) => {
    try {
        const file = await File.findById(req.params.fileId);
        file.downloads++;
        await file.save();
        res.download(file.path, file.name);
    } catch (error) {
        console.error('Error downloading file: ', error.message);
        return res.status(500).json({error : error.message});
    }
};


export const getAllFiles = async (req,res) => {
    try{
        const files = await File.find({});
        return res.json({files : files});
    }
    catch(error){
        console.error('error in getting the files from the DB',error.message);
    }
};