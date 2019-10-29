
export class GeneralResponseModal {
    GrpcResponseCode: number;
    GrpcResponseMessage: string;
    constructor(grpcResponseCode: number, grpcResponseMessage: string) {
        this.GrpcResponseCode = grpcResponseCode;
        this.GrpcResponseMessage = grpcResponseMessage;
    }

}
