import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';
import path from 'path';

// Load the .proto file
const PROTO_PATH = path.join(__dirname, 'db.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
});
const proto = grpc.loadPackageDefinition(packageDefinition) as any;


export const GrpcHealthCheckClient = new proto.filemanager.HealthCheck(
    'localhost:50051',
    grpc.credentials.createInsecure()
)

export const GrpcAuthClient = new proto.filemanager.AuthService(
    'localhost:50051',
    grpc.credentials.createInsecure()
)


