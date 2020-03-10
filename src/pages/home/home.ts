import { NavController } from 'ionic-angular';
import { Component, enableProdMode } from '@angular/core';
import { CcupProvider } from '../../providers/ccup/ccup';
import { FileUploader, FileLikeObject } from  'ng2-file-upload';
import { FormGroup } from '@angular/forms';
import { HttpEvent, HttpEventType } from '@angular/common/http';


enableProdMode();

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [
    CcupProvider
  ]
})
export class HomePage  
{
  public fileUploader: FileUploader = new FileUploader({});
  public hasBaseDropZoneOver: boolean = false;
  public uploadSuccess: boolean = true;
  value: any[] = [];

  form: FormGroup;
  progress: number = 0;
  
  constructor(public navCtrl: NavController, private uploadingService: CcupProvider) 
  {

  }
  fileOverBase(event): void 
  {
    this.hasBaseDropZoneOver = event;
  }
  getFiles(): FileLikeObject[] 
  {
    return this.fileUploader.queue.map((fileItem) => 
    {
      return fileItem.file;
    });
  }
  uploadFiles() 
  {
    this.uploadSuccess = true;
    let files = this.getFiles();
    let requests = [];

    files.forEach((file) => 
    {
      let formData = new FormData();
      formData.append('file' , file.rawFile, file.name);
      console.log(formData);
      requests.push(this.uploadingService.uploadFormData(formData).subscribe
      (
        (res) => {},
        (err) => 
        {  
          //console.log(err);
          this.uploadSuccess = false;
          //alert('Teo');
        }
      ));
        
    });

    let formData = new FormData();
    formData.append('file' , files[0].rawFile, files[0].name);
    this.uploadingService.uploadFormData(formData).subscribe((event: HttpEvent<any>) => {
      switch (event.type) {
        case HttpEventType.Sent:
          console.log('Request has been made!');
          break;
        case HttpEventType.ResponseHeader:
          console.log('Response header has been received!');
          break;
        case HttpEventType.UploadProgress:
          this.progress = Math.round(event.loaded / event.total * 100);
          console.log(`Uploaded! ${this.progress}%`);
          break;
        case HttpEventType.Response:
          console.log('User successfully created!', event.body);
          setTimeout(() => {
            this.progress = 0;
          }, 1500);

      }
    });





    if (this.uploadSuccess)
        {
          alert('Upload ngon lành');
        }
        else
        {
          alert('Upload thế éo nào bị lỗi òi')
        }

  }
  

}
