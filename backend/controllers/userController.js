import User from "../models/userModel.js"
import bcrypt from "bcryptjs"
import generateTokenAndSetCookie from "../utils/helpers/generateTokenAndSetCookie.js"


const signupUser = async (req, res) => {
    try {
        const { name, email, username, password } = req.body
        const user = await User.findOne({ $or: [{ email }, { username }] })

        if (user) {
            return res.status(400).json({ message: "User already exists" })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            name,
            email,
            username,
            password: hashedPassword
        })

        await newUser.save()

        if (newUser) {
            generateTokenAndSetCookie(newUser._id, res)
            res.status(201).json({
                _id: newUser._id,
                name: newUser.name,
                username: newUser.username,
                email: newUser.email
            })
        } else {
            res.status(400).json({ message: "Invalid user data" })
        }

    } catch (err) {
        res.status(500).json({ message: err.message })
        console.log(`Error in signupuser : ${err.message}`);
    }
}

const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body
        const user = await User.findOne({ username })
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "")

        if (!user || !isPasswordCorrect) return res.status(400).json({ message: "Invalid username or password" })

        generateTokenAndSetCookie(user._id, res)
        res.status(200).json({
            _id: user._id,
            name: user.name,
            emai: user.email,
            username: user.username
        })

    } catch (err) {
        res.status(500).json({ message: err.message })
        console.log(`Error in loginuser : ${err.message}`);
    }
}

const logoutUser = async (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 1 })
        res.status(200).json({ message: "User loggedout successfully" })
    } catch (err) {
        res.status(500).json({ message: err.message })
        console.log(`Error in logoutuser : ${err.message}`);
    }
}

const followUnFollowUser = async (req, res) => {
    try {
        const { id } = req.params

        const userToModify = await User.findById(id)
        const currentUser = await User.findById(req.user._id)

        if (id === req.user._id) return res.status(400).json({ message: "You cannt follow/unfollow yourself" })
        if (!currentUser || !userToModify) return res, staus(400).json({ message: "User not found" })
        const isFollowing = currentUser.following.includes(id)
        if (isFollowing) {
            //Unfollowing user
            await User.findByIdAndUpdate(req.user._id, { $pull: { following: id } })
            await User.findByIdAndUpdate(id, { $pull: { followers: req.user._id } })
            res.status(200).json({ message: "User unfollowed successfully" })
        } else {
            //Following
            await User.findByIdAndUpdate(req.user._id, { $push: { following: id } })
            await User.findByIdAndUpdate(id, { $push: { followers: req.user._id } })
            res.status(200).json({ message: "User followed successfully" })
        }

    } catch (err) {
        res.status(500).json({ message: err.message })
        console.log(`Error in followUnFollowUser : ${err.message}`);
    }
}

const updateProfile= async (req,res)=>{
    try {
        
    } catch (err) {
        res.status(500).json({ message: err.message })
        console.log(`Error in updateProfile : ${err.message}`);
    }
}

export { signupUser, loginUser, logoutUser, followUnFollowUser,updateProfile}