import { GrpcAuthClient } from "../lib/grpc";
import { generateToken } from "../lib/jwt";
import { sendMail } from "../lib/node-mailer";

export const resendVerifyUser = async (req: { body: { email: string } }, res) => {
    const { email } = req.body;

    try {
        const token = generateToken({ email });
        const grpcRes: {
            status_code: number;
            message: string;
        } = await new Promise((resolve, reject) => {
            GrpcAuthClient.ResendVerificationEmail({
                email,
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

        if (grpcRes.status_code === 409) {
            return res.status(409).json({
                message: 'Account already verified'
            })
        }

        if (grpcRes.status_code === 200) {
            await sendMail(email, token);
            return res.status(200).json({
                message: 'resend email success'
            })
        }

        return res.status(500).json({
            message: 'Internal server error'
        })

    } catch (error) {

        return res.status(500).json({
            message: 'Internal server error'
        })
    }
} 