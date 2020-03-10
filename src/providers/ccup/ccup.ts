import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from  '@angular/common/http';  
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
    //   headers: new HttpHeaders({})    
    // };

    // const httpOptions = {
    //   reportProgress: true,
    //   observe: 'events'
    // };

    return this.http.post<any>(this.SERVER_URL, formData, 
    {
      reportProgress: true,
      observe: 'events'
    }).pipe(
      catchError(this.errorMgmt)
    )  
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
