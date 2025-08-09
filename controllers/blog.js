import Blog from "../models/blog.js";
import Comment from "../models/comment.js";

export const fileUpload = async (req, res) => {
    const { title, body } = req.body;

    const blog = await Blog.create({
        body,
        title,
        createdBy: req.user._id,
        coverImageURL: `/uploads/${req.file.filename}`
    })
    res.redirect(`/blog/${blog._id}`);
}

export const blogDetail = async (req, res) => {
    const blog = await Blog.findById(req.params.id).populate('createdBy');
    const comments = await Comment.find({ blogId: req.params.id }).populate('createdBy');
    console.log(comments);
    return res.render('blog', {
        user: req.user,
        blog,
        comments
    })
}

export const blogCommentHandler = async (req, res) => {
    await Comment.create({
        content: req.body.content,
        blogId: req.params.blogId,
        createdBy: req.user._id
    });
    return res.redirect(`/blog/${req.params.blogId}`)
}