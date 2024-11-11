import { GrpcAuthClient } from '../lib/grpc';
import { sendMail } from '../lib/node-mailer';
import { generateToken, extractToken } from '../lib/jwt';
import bcrypt from 'bcrypt';
import { SALT_ROUND } from '../config/appConfig';

interface CreateUserRequest {
    id: string,
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    password: string,
    googleProviderId?: string,
    microsoftProviderId?: string,
    githubProviderId?: string,
    facebookProviderId?: string,
    loginProvider?: string,
    lastLogin: string,
}

interface RegisterRequest extends CreateUserRequest {
    password: string;
}

interface GrpcResponse {
    status_code: number;
    message: string;
}

export const registerFn = async (req: { body: RegisterRequest }, res: any): Promise<any> => {
    const { email, username, loginProvider, firstName, lastName, googleProviderId, githubProviderId, microsoftProviderId, facebookProviderId , password }: RegisterRequest = req.body;

    if (username === undefined || email === undefined || password === undefined || firstName === undefined || lastName === undefined) {
        return res.status(400).json({
            message: 'Missing required fields'
        });
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUND);
    const token = generateToken({ email });
    console.log(token)

    const resGrpc: GrpcResponse = await new Promise((resolve, reject) => {
        GrpcAuthClient.CreateUser({
            username,
            firstName,
            lastName,
            email,
            password: hashedPassword,
            googleProviderId,
            microsoftProviderId,
            githubProviderId,
            facebookProviderId,
            loginProvider,
            token,
        }, (error: any, response: GrpcResponse) => {
            if (error) {
                return reject(error);
            } else {
                return resolve(response);
            }
        });
    });

    if (resGrpc.status_code === 409) {
        return res.status(409).json({
            message: resGrpc.message
        });
    }


    if (resGrpc.status_code === 200) {
        await sendMail(email, token);
        return res.status(200).json({
            message: 'User created successfully'
        });
    }

    return res.status(500).json({
        message: 'Internal server error'
    });


}
