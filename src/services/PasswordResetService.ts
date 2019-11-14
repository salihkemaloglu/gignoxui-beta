import { CheckVerificationLinkRequest, CheckVerificationLinkResponse, GeneralRequest, SendEmailRequest, SendEmailResponse, GeneralResponse, ResetUserPasswordRequest, ResetUserPasswordResponse } from "../proto/gigxRR_pb";
import { GigxRRService } from '../proto/gigxRR_pb_service';
import { grpc } from '@improbable-eng/grpc-web';
import { RRServiceUrl } from '../environments/urls'
import { GeneralResponseModal } from '../modals/helper-models/GeneralResponseModal'
import { lang } from '../helpers/LocalizationHelper';
var modal = new GeneralResponseModal(-1, "");
export function DoSendEmailRequest(generalRequest_: GeneralRequest, callback: any) {
  const req = new SendEmailRequest();
  var response = new GeneralResponse();
  req.setGeneralrequest(generalRequest_);
  grpc.invoke(GigxRRService.SendEmail, {
    request: req,
    host: RRServiceUrl,
    metadata: new grpc.Metadata({ "languagecode": lang }),
    onHeaders: (headers: grpc.Metadata) => {
      // console.log("onHeaders", headers);
    },
    onMessage: (responseData_: SendEmailResponse) => {
      response = responseData_.getGeneralResponse() === null ? JSON.parse("null") : responseData_.getGeneralResponse();
    },
    onEnd: (code_: grpc.Code, msg_: string, trailers: grpc.Metadata) => {
      modal.GrpcResponseCode = code_;
      modal.GrpcResponseMessage = msg_;
      callback(response, modal);
    }
  });
}
export function DoCheckVerificationTokenRequest(generalRequest_: GeneralRequest, callback: any) {
  const req = new CheckVerificationLinkRequest();
  var response = new GeneralResponse();
  req.setGeneralrequest(generalRequest_);
  grpc.invoke(GigxRRService.CheckVerificationLink, {
    request: req,
    host: RRServiceUrl,
    metadata: new grpc.Metadata({ "languagecode": lang }),
    onHeaders: (headers: grpc.Metadata) => {
      // console.log("onHeaders", headers);
    },
    onMessage: (responseData: CheckVerificationLinkResponse) => {
      response = responseData.getGeneralResponse() === null ? JSON.parse("null") : responseData.getGeneralResponse();
    },
    onEnd: (code_: grpc.Code, msg_: string, trailers: grpc.Metadata) => {
      modal.GrpcResponseCode = code_;
      modal.GrpcResponseMessage = msg_;
      callback(response, modal);
    }
  });
}
export function DoResetUserPasswordRequest(generalRequest_: GeneralRequest, callback: any) {
  const req = new ResetUserPasswordRequest();
  var response = new GeneralResponse();
  req.setGeneralrequest(generalRequest_);
  grpc.invoke(GigxRRService.ResetUserPassword, {
    request: req,
    host: RRServiceUrl,
    metadata: new grpc.Metadata({ "languagecode": lang }),
    onHeaders: (headers: grpc.Metadata) => {
      // console.log("onHeaders", headers);
    },
    onMessage: (responseData: ResetUserPasswordResponse) => {
      response = responseData.getGeneralResponse() === null ? JSON.parse("null") : responseData.getGeneralResponse();
    },
    onEnd: (code_: grpc.Code, msg_: string, trailers: grpc.Metadata) => {
      modal.GrpcResponseCode = code_;
      modal.GrpcResponseMessage = msg_;
      callback(response, modal);
    }
  });
}

