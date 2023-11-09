import User from "../models/userModel.js"
import Post from "../models/postModel.js"

const createPost = async (req, res) => {
    try {
        const { postedBy, text, img } = req.body
        if (!postedBy || !text) return res.status(400).json({ message: "PostedBy and text fields are mandatory" })
        const user = await User.findById(postedBy)
        if (!user) return res.status(404).json({ message: "User not found" })
        if (user._id.toString() !== req.user._id.toString()) return res.status(400).json({ message: "Unauthorised" })

        const maxLen=500;
        if(text.length>maxLen){
            return res.status(400).json({message:`Text length is greater then ${maxLen}`})
        }
        const newPost = new Post({text,postedBy,img})

        await newPost.save()
        res.status(201).json({message:"Post created successfully",newPost})

    } catch (err) {
        res.status(500).json({ message: err.message })
        console.log(err);
    }
}

export default createPost