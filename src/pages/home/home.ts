import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CcupProvider } from '../../providers/ccup/ccup';
import { FileUploader, FileLikeObject } from  'ng2-file-upload';
import { concat } from  'rxjs/operators';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [
    CcupProvider
  ]
})
export class HomePage  {


  public fileUploader: FileUploader = new FileUploader({});
  public hasBaseDropZoneOver: boolean = false;
  
  constructor(public navCtrl: NavController, private uploadingService: CcupProvider) 
  {

  }
  fileOverBase(event): void {
    this.hasBaseDropZoneOver = event;
  }
  getFiles(): FileLikeObject[] {
    return this.fileUploader.queue.map((fileItem) => {
      return fileItem.file;

    });
  }
  uploadFiles() {

    let files = this.getFiles();
    let requests = [];

    files.forEach((file) => {
      let formData = new FormData();
      formData.append('file' , file.rawFile, file.name);
      console.log(formData);
      requests.push(this.uploadingService.uploadFormData(formData).subscribe(
        (res) => {
          console.log(res);
        },
        (err) => {  
          console.log(err);
        }
      ));

    });
    

  }

}
