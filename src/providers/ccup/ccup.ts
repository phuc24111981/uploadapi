import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpErrorResponse, HttpEventType } from  '@angular/common/http';  
import { concat, map } from  'rxjs/operators';


@Injectable()
export class CcupProvider {
  SERVER_URL: string = "http://localhost:8086/api/api/FileUploading/UploadFile"; 
  constructor(public http: HttpClient) {

  }

  public uploadFormData(formData) {

    return this.http.post<any>(this.SERVER_URL, formData, {  
      reportProgress: true,  
      observe: 'events'  
    });  
}

}
