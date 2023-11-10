import User from "../models/userModel.js"
import Post from "../models/postModel.js"

const createPost = async (req, res) => {
    try {
        const { postedBy, text, img } = req.body
        if (!postedBy || !text) return res.status(400).json({ message: "PostedBy and text fields are mandatory" })
        const user = await User.findById(postedBy)
        if (!user) return res.status(404).json({ message: "User not found" })
        if (user._id.toString() !== req.user._id.toString()) return res.status(400).json({ message: "Unauthorised" })

        const maxLen = 500;
        if (text.length > maxLen) {
            return res.status(400).json({ message: `Text length is greater then ${maxLen}` })
        }
        const newPost = new Post({ text, postedBy, img })

        await newPost.save()
        res.status(201).json({ message: "Post created successfully", newPost })

    } catch (err) {
        res.status(500).json({ message: err.message })
        console.log(err);
    }
}

const getPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (!post) return res.status(404).json({ message: "No post found" })
        res.status(200).json({ post })
    } catch (err) {
        res.status(500).json({ message: err.message })
        console.log("Error in get", err);
    }
}

const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (!post) return res.status(400).json({ message: "Post doesnt exists" })
        if (post.postedBy.toString() !== req.user._id.toString()) return res.status(401).json({ message: "Unauthorised" })
        await Post.findByIdAndDelete(req.params.id)
        res.status(200).json({ message: "Post Deleted" })
    } catch (err) {
        res.status(500).json({ message: err.message })
        console.log("Error in deletePost", err);
    }
}

const likeUnlikePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (!post) res.status(404).json({ message: "Post not found" })
        const currentUser = await User.findById(req.user._id)
        if (!currentUser) return res.staus(400).json({ message: "User not found" })
        const isLiked = post.likes.includes(req.user._id)
        if (isLiked) {
            await Post.findByIdAndUpdate(post._id, { $pull: { likes: currentUser._id } })
            res.status(200).json({ message: "User unliked successfully" })
        } else {
            await Post.findByIdAndUpdate(post._id, { $push: { likes: currentUser._id } })
            const updatedPost = await Post.findById(post._id);
            const tot = updatedPost.likes.length
            res.status(200).json({ message: "User liked successfully,Total Likes: ", tot })
            console.log(tot);
        }
    } catch (err) {
        res.status(500).json({ message: err.message })
        console.log(`Error in likeUnlikePost : ${err.message}`);
    }
}

const replyToPost = async (req, res) => {
    try {
        const { text } = req.body;
        const postId = req.params.id;
        const userId = req.user._id;
        const userProfilePic = req.user.profilePic;
        const username = req.user.username;

        if (!text) {
            return res.status(400).json({ error: "Text field is required" });
        }

        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }

        const reply = { userId, text, userProfilePic, username };

        post.replies.push(reply);
        await post.save();

        res.status(200).json(post);
    } catch (err) {
        res.status(500).json({ message: err.message })
        console.log(`Error in replyToPost : ${err.message}`);
    }
}

const getFeedPost = async (req, res) => {
    try {
        const userId = req.user._id
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        const following = user.following;
        const feedPosts = await Post.find({ postedBy: { $in: following } }).sort({ createdAt: -1 });

        res.status(200).json(feedPosts);
    } catch (err) {
        res.status(500).json({ message: err.message })
        console.log(`Error in replyToPost : ${err.message}`);
    }
}

export { createPost, getPost, deletePost, likeUnlikePost, replyToPost, getFeedPost }