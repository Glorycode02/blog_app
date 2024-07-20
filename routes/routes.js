const express = require('express');
const router = express.Router();
const Blogs = require("../models/blog")
const User = require("../models/user")


router.get("/login", (req, res) => {
    res.render("login", {
        title: 'Login page'
    })
})
router.get("/register", (req, res) => {
    res.render("register", {
        title: 'Register'
    })
})

router.post('/register', (req, res) => {
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })

    user.save(
        res.redirect("/login")
    )
})


router.post("/addnew", (req, res) => {
    const blog = new Blogs({
        title: req.body.title,
        description: req.body.description,
    })
    blog.save(
        res.redirect("/")
    )
})
router.get("/addblog", (req, res) => {
    res.render("addblog", {
        title: "Add new Blog"
    })
})

// router.put("/edit/:_id", async (req, res) => {
//     const newBlog = await Blogs.findById(req.params._id)
//     res.render()
// })

router.get("/edit/:_id", async (req, res) => {
    const BlogToEdit = await Blogs.findById(req.params._id)
    res.render(`editblog`, {
        title: "Edit blog",
        blog: BlogToEdit
    })
})

router.delete("/delete/:_id", async (req, res) => {
    await Blogs.findByIdAndDelete(req.params._id)
    res.redirect("/")
})


router.get('/', async (req, res) => {
    const blogs = await Blogs.find().sort({ createdAt: -1 });
    res.render('index', {
        title: "All Blogs",
        blogs: blogs
    });
});



module.exports = router;