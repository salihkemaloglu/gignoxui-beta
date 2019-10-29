export class UserInformation {
  Publisher: string;
  FileName: string;
  FileHash: string;
  FileOpenedDate: string;
  UnitAmount: number;
  RemaningDate: any[];
  constructor(publisher: string, fileName: string, fileHash: string, fileOpenedDate: string, unitAmount: number, remaningDate: any[]) {
    this.Publisher = publisher;
    this.FileName = fileName;
    this.FileHash = fileHash;
    this.FileOpenedDate = fileOpenedDate;
    this.UnitAmount = unitAmount;
    this.RemaningDate = remaningDate;
  }
}
