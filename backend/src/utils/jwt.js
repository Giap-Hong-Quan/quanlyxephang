import jwt from 'jsonwebtoken';
// tao access token và refresh token 

export const signAccessToken = ( payload)=>{
    return jwt.sign(payload,process.env.JWT_ACCESS_SECRET,{
        expiresIn:process.env.JWT_ACCESS_EXPIRES
    })
}

export const signRefreshToken = ( payload)=>{
    return jwt.sign(payload,process.env.JWT_REFRESH_SECRET,{
        expiresIn:process.env.JWT_REFRESH_EXPIRES
    })
}

// verify token

export const verifyAccessToken = (token)=>{
    return jwt.verify(token,process.env.JWT_ACCESS_SECRET)
}
export const verifyRefreshToken = (token)=>{
    return jwt.verify(token,process.env.JWT_REFRESH_SECRET)
}