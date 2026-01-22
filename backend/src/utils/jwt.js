import jwt from 'jsonwebtoken';
// tao access token 
export const signAccessToken = ( payload)=>{
    return jwt.sign(payload,process.env.JWT_ACCESS_SECRET,{
        expiresIn:process.env.JWT_ACCESS_EXPIRES
    })
}
// verify token
export const verifyAccessToken = (token)=>{
    return jwt.verify(token,process.env.JWT_ACCESS_SECRET)
}
