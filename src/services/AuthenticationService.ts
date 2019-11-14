import { LoginUserRequest, LoginUserResponse, UserLogin, User, RegisterUserRequest, RegisterUserResponse, GeneralResponse, CheckUserToRegisterRequest, CheckUserToRegisterResponse } from "../proto/gigxRR_pb";
import { GigxRRService } from '../proto/gigxRR_pb_service';
import { grpc } from '@improbable-eng/grpc-web';
import { RRServiceUrl } from '../environments/urls'
import { GeneralResponseModal } from '../modals/helper-models/GeneralResponseModal'
import { lang } from '../helpers/LocalizationHelper';
var modal = new GeneralResponseModal(-1, "");
export function DoLoginUserRequest(userLogin_: UserLogin, callback: any) {
  const req = new LoginUserRequest();
  req.setUser(userLogin_);
  grpc.invoke(GigxRRService.Login, {
    request: req,
    host: RRServiceUrl,
    metadata: new grpc.Metadata({ "languagecode": lang }),
    onHeaders: (headers: grpc.Metadata) => {
      // console.log("onHeaders", headers);
    },
    onMessage: (responseData_: LoginUserResponse) => {
      userLogin_ = responseData_.getUser() === null ? JSON.parse("null") : responseData_.getUser();
    },
    onEnd: (code_: grpc.Code, msg_: string, trailers: grpc.Metadata) => {
      modal.GrpcResponseCode = code_;
      modal.GrpcResponseMessage = msg_;
      callback(userLogin_, modal);
    }
  });
}

export function DoRegisterUserRequest(user_: User, callback: any) {
  const req = new RegisterUserRequest();
  var response = new GeneralResponse();
  req.setUser(user_);
  grpc.invoke(GigxRRService.Register, {
    request: req,
    host: RRServiceUrl,
    metadata: new grpc.Metadata({ "languagecode": lang }),
    onHeaders: (headers: grpc.Metadata) => {
      // console.log("onHeaders", headers);
    },
    onMessage: (responseData_: RegisterUserResponse) => {
      response = responseData_.getGeneralResponse() === null ? JSON.parse("null") : responseData_.getGeneralResponse();
    },
    onEnd: (code_: grpc.Code, msg_: string, trailers: grpc.Metadata) => {
      modal.GrpcResponseCode = code_;
      modal.GrpcResponseMessage = msg_;
      callback(response, modal);
    }
  });
}
export function DoCheckUserToRegisterRequest(user_: User, callback: any) {
  const req = new CheckUserToRegisterRequest();
  var response = new GeneralResponse();
  req.setUser(user_);
  grpc.invoke(GigxRRService.CheckUserToRegister, {
    request: req,
    host: RRServiceUrl,
    metadata: new grpc.Metadata({ "languagecode": lang }),
    onHeaders: (headers: grpc.Metadata) => {
      // console.log("onHeaders", headers);
    },
    onMessage: (responseData_: CheckUserToRegisterResponse) => {
      response = responseData_.getGeneralResponse() === null ? JSON.parse("null") : responseData_.getGeneralResponse();
    },
    onEnd: (code_: grpc.Code, msg_: string, trailers: grpc.Metadata) => {
      modal.GrpcResponseCode = code_;
      modal.GrpcResponseMessage = msg_;
      callback(response, modal);
    }
  });
}


