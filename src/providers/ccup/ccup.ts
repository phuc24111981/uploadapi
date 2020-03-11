import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpRequest, HttpEventType } from  '@angular/common/http';  
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';




@Injectable()
export class CcupProvider 
{
  SERVER_URL: string = "http://localhost/api/api/FileUploading/UploadFile"; 
  //SERVER_URL: string = "http://118.69.59.60:8086/api/api/FileUploading/UploadFile"; 

  constructor(public http: HttpClient) {}

  public uploadFormData(formData) 
  {
    // const httpOptions = 
    // {
    //   headers: new HttpHeaders({}),
    //   reportProgress: true,
    //   observe: 'events'
    // };

    // let httpOptions = new HttpHeaders({'observe': 'events', 'reportProgress':'true'});
    return this.http.post<any>(this.SERVER_URL, formData,  { headers: new HttpHeaders({})}).pipe(catchError(this.errorMgmt));

    // const httpOptions = {
    //   reportProgress: true,
    //   observe: 'events'
    // };

    // return this.http.post<any>(this.SERVER_URL, formData, 
    // {
    //   reportProgress: true,
    //   observe: 'events',
    //   headers: new HttpHeaders({})
    // }).pipe(
    //   catchError(this.errorMgmt)
    // )  

  //   const httpOptions = {
  //     headers: new HttpHeaders () {
  //         [header: string]: string | string[];
  //     };
  //     observe?: 'body';
  //     params?: HttpParams | {
  //         [param: string]: string | string[];
  //     };
  //     reportProgress?: boolean;
  //     responseType?: 'json';
  //     withCredentials?: boolean;
  // }


        //   const uploadReq = new HttpRequest('POST', this.SERVER_URL, formData, {
        //     headers: new HttpHeaders({})
        // });

        // this.http.request(uploadReq).subscribe((event) => {
        //     if (event.type === HttpEventType.UploadProgress) {
        //         //this.progress = Math.round(100 * event.loaded / event.total);
        //         console.log(event.loaded);
        //     }
        //     else if (event.type === HttpEventType.Response) {
        //         //this.message = event.body.toString();
        //         console.log(event.body.toString());
        //     }
        // });

        //return this.http.request(uploadReq);

 
  }

  errorMgmt(error: HttpErrorResponse) 
  {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) 
    {
      // Get client-side error
      errorMessage = error.error.message;
    } 
    else 
    {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return errorMessage;
  }

}
