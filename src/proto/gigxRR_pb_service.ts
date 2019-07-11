// package: gigx
// file: proto/gigxRR.proto

import * as proto_gigxRR_pb from "../proto/gigxRR_pb";
export class GigxRRService {
  static serviceName = "gigx.GigxRRService";
}
export namespace GigxRRService {
  export class SayHello {
    static readonly methodName = "SayHello";
    static readonly service = GigxRRService;
    static readonly requestStream = false;
    static readonly responseStream = false;
    static readonly requestType = proto_gigxRR_pb.HelloRequest;
    static readonly responseType = proto_gigxRR_pb.HelloResponse;
  }
  export class Login {
    static readonly methodName = "Login";
    static readonly service = GigxRRService;
    static readonly requestStream = false;
    static readonly responseStream = false;
    static readonly requestType = proto_gigxRR_pb.LoginUserRequest;
    static readonly responseType = proto_gigxRR_pb.LoginUserResponse;
  }
  export class Register {
    static readonly methodName = "Register";
    static readonly service = GigxRRService;
    static readonly requestStream = false;
    static readonly responseStream = false;
    static readonly requestType = proto_gigxRR_pb.RegisterUserRequest;
    static readonly responseType = proto_gigxRR_pb.RegisterUserResponse;
  }
  export class CheckUserToRegister {
    static readonly methodName = "CheckUserToRegister";
    static readonly service = GigxRRService;
    static readonly requestStream = false;
    static readonly responseStream = false;
    static readonly requestType = proto_gigxRR_pb.CheckUserToRegisterRequest;
    static readonly responseType = proto_gigxRR_pb.CheckUserToRegisterResponse;
  }
  export class ResetUserPassword {
    static readonly methodName = "ResetUserPassword";
    static readonly service = GigxRRService;
    static readonly requestStream = false;
    static readonly responseStream = false;
    static readonly requestType = proto_gigxRR_pb.ResetUserPasswordRequest;
    static readonly responseType = proto_gigxRR_pb.ResetUserPasswordResponse;
  }
  export class GetUser {
    static readonly methodName = "GetUser";
    static readonly service = GigxRRService;
    static readonly requestStream = false;
    static readonly responseStream = false;
    static readonly requestType = proto_gigxRR_pb.GetUserRequest;
    static readonly responseType = proto_gigxRR_pb.GetUserResponse;
  }
  export class UpdateUser {
    static readonly methodName = "UpdateUser";
    static readonly service = GigxRRService;
    static readonly requestStream = false;
    static readonly responseStream = false;
    static readonly requestType = proto_gigxRR_pb.UpdateUserRequest;
    static readonly responseType = proto_gigxRR_pb.UpdateUserResponse;
  }
  export class DeleteUser {
    static readonly methodName = "DeleteUser";
    static readonly service = GigxRRService;
    static readonly requestStream = false;
    static readonly responseStream = false;
    static readonly requestType = proto_gigxRR_pb.DeleteUserRequest;
    static readonly responseType = proto_gigxRR_pb.DeleteUserResponse;
  }
  export class SendEmail {
    static readonly methodName = "SendEmail";
    static readonly service = GigxRRService;
    static readonly requestStream = false;
    static readonly responseStream = false;
    static readonly requestType = proto_gigxRR_pb.SendEmailRequest;
    static readonly responseType = proto_gigxRR_pb.SendEmailResponse;
  }
  export class GetIPInformation {
    static readonly methodName = "GetIPInformation";
    static readonly service = GigxRRService;
    static readonly requestStream = false;
    static readonly responseStream = false;
    static readonly requestType = proto_gigxRR_pb.GetIPInformationRequest;
    static readonly responseType = proto_gigxRR_pb.GetIPInformationResponse;
  }
  export class CheckVerificationLink {
    static readonly methodName = "CheckVerificationLink";
    static readonly service = GigxRRService;
    static readonly requestStream = false;
    static readonly responseStream = false;
    static readonly requestType = proto_gigxRR_pb.CheckVerificationLinkRequest;
    static readonly responseType = proto_gigxRR_pb.CheckVerificationLinkResponse;
  }
  export class GetFile {
    static readonly methodName = "GetFile";
    static readonly service = GigxRRService;
    static readonly requestStream = false;
    static readonly responseStream = false;
    static readonly requestType = proto_gigxRR_pb.GetFileRequest;
    static readonly responseType = proto_gigxRR_pb.GetFileResponse;
  }
  export class GetAllFiles {
    static readonly methodName = "GetAllFiles";
    static readonly service = GigxRRService;
    static readonly requestStream = false;
    static readonly responseStream = true;
    static readonly requestType = proto_gigxRR_pb.GetAllFilesRequest;
    static readonly responseType = proto_gigxRR_pb.GetAllFilesResponse;
  }
  export class UpdateFile {
    static readonly methodName = "UpdateFile";
    static readonly service = GigxRRService;
    static readonly requestStream = false;
    static readonly responseStream = false;
    static readonly requestType = proto_gigxRR_pb.UpdateFileRequest;
    static readonly responseType = proto_gigxRR_pb.UpdateFileResponse;
  }
  export class DeleteFile {
    static readonly methodName = "DeleteFile";
    static readonly service = GigxRRService;
    static readonly requestStream = false;
    static readonly responseStream = false;
    static readonly requestType = proto_gigxRR_pb.DeleteFileRequest;
    static readonly responseType = proto_gigxRR_pb.DeleteFileResponse;
  }
  export class UploadFile {
    static readonly methodName = "UploadFile";
    static readonly service = GigxRRService;
    static readonly requestStream = true;
    static readonly responseStream = true;
    static readonly requestType = proto_gigxRR_pb.UploadFileRequest;
    static readonly responseType = proto_gigxRR_pb.UploadFileResponse;
  }
}
