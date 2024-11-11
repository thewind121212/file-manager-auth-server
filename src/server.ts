import express from 'express';
import serverMiddeleware from '../middeware';
import cors from 'cors';
import dotenv from 'dotenv';
import { registerFn } from './sevices/register';
import { verifyUser } from './sevices/verify';
import { resendVerifyUser } from './sevices/resend-verify';
import { GrpcAuthClient } from './lib/grpc';
import axios from 'axios';

import { OAuth2Client } from 'google-auth-library';


const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET, 'http://localhost:5173/auth/google/callback');




dotenv.config();
const app = express();

app.use(cors())
app.use(serverMiddeleware)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));




app.post('/register', registerFn)
app.post("/resend_verify_email", resendVerifyUser)
app.post('/verify_account', verifyUser)

app.post('/login_with_google', async (req: {
    body: {
        code: string,
    }
}, res) => {
    const { code } = req.body
    try {
        const { tokens } = await client.getToken(code);

        const response: {
            data: {
                id: string,
                email: string,
                verified_email: boolean,
                name: string,
                given_name: string,
                family_name: string,
                picture: string,
            }
        } = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokens.access_token}`)

        const user : any = await new Promise((resolve, reject) => {
            GrpcAuthClient.GetUser({
                providerPayload: response.data.id,
                providerMethod: 'google'
            }, (error: any, response: any) => {
                if (error) {
                    return reject(error);
                }
                return resolve(response)
            })
        })


        if (user.status_code == 404) {
            return res.status(404).json({
                message: 'Account not found please register'
            });
        }

        if (user.status_code == 200) {
            return res.status(409).json({
                message: 'Account already exist please login'
            })
        }


    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            message: 'Internal server error'
        })
    }

})


app.post('/login_with_microsoft', async (req, res) => {

    const { code } = req.body
    const clientId = "aea45ffd-cf3b-4b9e-8bb4-78ede950b294";
    const tenantId = "45c0702f-b84e-4d00-9df4-866127ae042a";
    const redirectUri = "http://localhost:5173/auth/microsoft/callback";

    try {
        const tokenResponse = await axios.post(`https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`, new URLSearchParams({
            client_id: clientId,
            client_secret: 'L_A8Q~1hu0kDv-_AtsEth39S4YZ3bpkpviv8TcBn',
            code: code,
            redirect_uri: redirectUri,
            grant_type: 'authorization_code'
        }));

        const { access_token, refresh_token, id_token } = tokenResponse.data;

        const userResponse: {
            data: {
                "@odata.context": string;
                businessPhones: string[];
                displayName: string;
                givenName: string;
                jobTitle: string | null;
                mail: string | null;
                mobilePhone: string | null;
                officeLocation: string | null;
                preferredLanguage: string;
                surname: string;
                userPrincipalName: string;
                id: string;
            }
        } = await axios.get('https://graph.microsoft.com/v1.0/me', {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        });
        

        const user = await new Promise((resolve, reject) => {
            GrpcAuthClient.GetUser({
                providerPayload: userResponse.data.id,
                providerMethod: 'microsoft'
            }, (error: any, response: any) => {
                if (error) {
                    return reject(error);
                }
                return resolve(response)
            })
        })


        res.json({ access_token, refresh_token, id_token });
        console.log(user)
    } catch (error) {
        console.error('Error exchanging authorization code:', error);
        res.status(500).json({ error: 'Failed to exchange authorization code' });
    }

})


app.post("/login_with_github", async (req, res) => {
    const { code } = req.body
    const clientId = "776de494aeba17ce3c5e";
    const redirectUri = "http://localhost:5173/auth/github/callback";
    const clientSecret = "a53c4f44bb317da4a25bf955fc88a2fecd85ab44"
    try {
        const response: {
            data: {
                access_token: string,
                token_type: string,
                scope: string
            }
        } = await axios.post('https://github.com/login/oauth/access_token', {
            client_id: clientId,
            client_secret: clientSecret,
            code: code,
            redirect_uri: redirectUri,
        }, {
            headers: {
                Accept: 'application/json'
            }
        })

        const profileUser = await axios.get('https://api.github.com/user', {
            headers: {
                Authorization: `token ${response.data.access_token}`
            }
        })


        const user = await new Promise((resolve, reject) => {
            GrpcAuthClient.GetUser({
                providerPayload: profileUser.data.id.toString(),
                providerMethod: 'github'
            }, (error: any, response: any) => {
                if (error) {
                    return reject(error);
                }
                return resolve(response)
            })
        })



        return res.status(200).json({
            message: 'success'
        })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            message: 'Internal server error'
        })
    }
})


app.post("/facebook", async (req, res) => {
    const { code } = req.body;


    try {
        const getToken = await axios.post(`https://graph.facebook.com/v21.0/oauth/access_token`, {
            client_id: '1771132680384554',
            client_secret: '26cb5426ed8cba0b739fb6f846529676',
            redirect_uri: 'http://localhost:5173/auth/facebook/callback',
            code,
        })



        const profile: {
            data: {
                id: string,
                name: string,
                piture: {
                    data: {
                        url: string
                        height: number,
                        is_silhouette: boolean,
                        width: number
                    }
                }
            }
        } = await axios.get(`https://graph.facebook.com/me?fields=id,name,email,birthday,gender,location,hometown,picture,friends&access_token=${getToken.data.access_token}`)



        const user = await new Promise((resolve, reject) => {
            GrpcAuthClient.GetUser({
                providerPayload: profile.data.id,
                providerMethod: 'facebook'
            }, (error: any, response: any) => {
                if (error) {
                    return reject(error);
                }
                return resolve(response)
            })
        })
        console.log(user)
    } catch (error) {

    }

})

app.listen(4200, async () => {
    console.log('Server is running on port 4200');
});

