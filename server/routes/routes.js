import express  from 'express';
import { uploadFile ,downloadFile,getAllFiles} from '../controller/file-controller.js';
import upload from '../utils/upload.js';

const router = express.Router();


router.post('/upload',upload.single('file') ,uploadFile);
router.get('/file/:fileId', downloadFile);
router.post('/getfiles',getAllFiles);

export default router;