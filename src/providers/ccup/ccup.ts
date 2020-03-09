import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from  '@angular/common/http';  



@Injectable()
export class CcupProvider 
{
  SERVER_URL: string = "http://localhost/api/api/FileUploading/UploadFile"; 
  //SERVER_URL: string = "http://118.69.59.60:8086/api/api/FileUploading/UploadFile"; 

  constructor(public http: HttpClient) {}

  public uploadFormData(formData) 
  {
    const httpOptions = {headers: new HttpHeaders({})};
    return this.http.post<any>(this.SERVER_URL, formData, httpOptions);  
  }

}
