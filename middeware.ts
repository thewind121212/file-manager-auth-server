import { NextFunction, Request, Response } from "express";
import { GrpcHealthCheckClient } from "./src/lib/grpc";

const checkGrpcServerHealth = () => {
    return new Promise((resolve, reject) => {
        GrpcHealthCheckClient.Ping({}, (error: any, response: {
            status_code: number;
            message: string;
        }) => {
            if (error) {
                reject(new Error("gRPC server is not available"), );
            } else {
                resolve(response);
            }
        });
    });
};


const serverMiddeleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
       const grpcRes : any =  await checkGrpcServerHealth();


        if (grpcRes.status_code === 200) {
            next();
        }

    } catch (error) {
        console.log(error)
        res.status(503).json({
            message: "db service is not pass the health check"
        })

    }

}

export default serverMiddeleware;