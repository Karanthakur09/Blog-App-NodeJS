import { Router } from "express"
import User from '../models/user.js'
const router = Router();

router.get('/signin', (req, res) => {
    return res.render("signin");
})

router.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.matchPassword(email, password);
        console.log(user);
    } catch (e) {
        console.log("error: ", e);
    }
    return res.redirect('/');
})


router.get('/signup', (req, res) => {
    return res.render("signup");
})
router.post('/signup', async (req, res) => {
    const { fullName, email, password } = req.body;
    await User.create({
        fullName,
        email,
        password
    })
    return res.redirect("/");
})

export default router;