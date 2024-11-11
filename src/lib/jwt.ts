import jwt from 'jsonwebtoken'

interface JwtPayload {
    email: string,
}

const secret = process.env.JWT_SERECT
const issuer = 'drive.wliafdew.dev';
const audience = 'drive.wliafdew.dev';

export const generateToken = (payload: JwtPayload) => {

    const token =    jwt.sign(payload, secret, {
        issuer,
        audience,
        expiresIn: '24h'
    })

    return token
}


export const extractToken = (token: string) => {
    try {
        const payload = jwt.verify(token, secret) as JwtPayload;
        return payload
    } catch (error) {
        return null
    }
}