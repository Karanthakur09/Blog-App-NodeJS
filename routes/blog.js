import { Router } from "express"
import multer from "multer";
import path from 'path';
import Blog from '../models/blog.js'
import { blogCommentHandler, blogDetail, fileUpload } from "../controllers/blog.js";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(`./public/uploads/`))
  },
  filename: function (req, file, cb) {
    const filename=`${Date.now()}-${file.originalname}`
    cb(null,filename);
  },
})

const upload = multer({ storage: storage })

const router = Router();

router.get('/add-new',(req,res)=>{
     return res.render('addblog',{
        user:req.user,
     })
})

router.post('/',upload.single('coverImage'),fileUpload)

router.get('/:id',blogDetail);

router.post('/comment/:blogId',blogCommentHandler);

export default router;