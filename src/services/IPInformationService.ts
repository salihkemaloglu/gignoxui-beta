import { GetIPInformationRequest, GetIPInformationResponse, IPInformation } from "../proto/gigxRR_pb";
import { GigxRRService } from '../proto/gigxRR_pb_service';
import { grpc } from '@improbable-eng/grpc-web';
import { ApiUrl } from '../environments/urls'

function DoGetIpAddressRequest() {
  const req = new GetIPInformationRequest();
  var info = new IPInformation()
  grpc.invoke(GigxRRService.GetIPInformation, {
    request: req,
    host: ApiUrl,
    onHeaders: (headers: grpc.Metadata) => {
      // console.log("onHeaders", headers);
    },
    onMessage: (responseData: GetIPInformationResponse) => {
      info = responseData.getIpInformation() === null ? JSON.parse("null") : responseData.getIpInformation();
      console.log(info.getIpAddress());
      console.log(info.getCountryFlag());
      console.log(info.getLanguageCode());
      console.log(info.getGmtOffSet());
    },
    onEnd: (code: grpc.Code, msg: string | undefined, trailers: grpc.Metadata) => {
      if (code === grpc.Code.OK) {
        console.log('all ok');
      } else {
        console.log('hit an error', code, msg, trailers);
      }
    }
  });
}

export { DoGetIpAddressRequest }
