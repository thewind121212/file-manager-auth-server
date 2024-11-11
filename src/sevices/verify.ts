import { GrpcAuthClient } from "../lib/grpc";
import { extractToken } from "../lib/jwt";

interface VerifyAccountRequest {
    token: string;
    email: string;
}


export const verifyUser = async  (req: { body: VerifyAccountRequest }, res) => {
    const { token, email } = req.body;


    const emailToken = extractToken(token);


    if (emailToken === null) {
        return res.status(400).json({
            message: 'Token is invalid'
        });
    }

    if (emailToken.email !== email || !emailToken.email) {
        return res.status(400).json({
            message: 'Token is invalid'
        });
    }

    const grpcRes: {
        status_code: number;
        message: string;
    } = await new Promise((resolve, reject) => {
        GrpcAuthClient.VerifyUser({
            email: emailToken.email,
            token
        }, (error: any, response: any) => {
            if (error) {
                return reject(error);
            } else {
                return resolve(response);
            }
        })
    })

    if (grpcRes.status_code === 404) {
        return res.status(404).json({
            message: 'Account not found'
        });
    }

    if (grpcRes.status_code === 400) {
        return res.status(400).json({
            message: 'Token is invalid'
        });
    }

    if (grpcRes.status_code === 409) {
        return res.status(409).json({
            message: 'Account already verified'
        });
    }

    if (grpcRes.status_code === 200) {
        return res.status(200).json({
            message: 'Account verified'
        })
    }

    return res.status(500).json({
        message: 'Internal server error'
    })


}