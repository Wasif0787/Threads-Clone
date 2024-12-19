import jwt from "jsonwebtoken"

const generateTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '99d'
    })

    res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: 99 * 24 * 60 * 60 * 1000,
        sameSite: "strict"
    })
    return token
}
export default generateTokenAndSetCookie