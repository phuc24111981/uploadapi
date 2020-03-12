import { NavController } from 'ionic-angular';
import { Component, enableProdMode } from '@angular/core';
import { CcupProvider } from '../../providers/ccup/ccup';
import { FileUploader, FileLikeObject } from  'ng2-file-upload';
import { FormGroup } from '@angular/forms';


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
  inProgress = false;
  filesCount: number = 0;
  filesUploadAlready: number = 0;
  
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

    // files.forEach((file) => 
    // {
    //   let formData = new FormData();
    //   formData.append('file' , file.rawFile, file.name);
    //   console.log(formData);
    //   requests.push(this.uploadingService.uploadFormData(formData).subscribe
    //   (
    //     (res) => {},
    //     (err) => 
    //     {  
    //       //console.log(err);
    //       this.uploadSuccess = false;
    //       //alert('Teo');
    //     }
    //   ));
        
    // });
    this.filesCount = files.length;
    console.log(this.filesCount);
    this.inProgress = true;
    this.filesUploadAlready = 0;

    files.forEach((file) => 
    {
      let formData = new FormData();
      formData.append('file' , file.rawFile, file.name);
      requests.push(this.uploadingService.uploadFormData(formData).subscribe((event: String) => 
      {
        if(event == 'File uploaded!')
        {
          this.filesUploadAlready = this.filesUploadAlready + 1;
          //alert('Up xong roi!');
        }
        else
        {
          alert('Upload lỗi cmnr!');
        }
        
      }));
    });

  }

  onButtonClick() 
  {
    if (this.inProgress) 
    {

    } 
    else 
    {

    }
    this.inProgress = !this.inProgress;
}


  

}
