import { model, Schema } from "mongoose";

const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    coverImageURL: {
        type: String,
        default: '/images/default.png'
    },
    createdBy:{
        type:Schema.Types.ObjectId,
        ref:"user"
    }
}, { timestamps: true });

const Blog = model('blog', blogSchema);
export default Blog;