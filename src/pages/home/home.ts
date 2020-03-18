import { NavController } from 'ionic-angular';
import { Component, enableProdMode } from '@angular/core';
import { CcupProvider } from '../../providers/ccup/ccup';
import { FileUploader, FileLikeObject } from  'ng2-file-upload';
import { DomSanitizer } from '@angular/platform-browser';


enableProdMode();

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [CcupProvider]
})
export class HomePage  
{
  public fileUploader: FileUploader = new FileUploader({});
  public hasBaseDropZoneOver: boolean = false;
  public uploadSuccess: boolean = true;


  progress: number = 0;
  inProgress = false;
  filesCount: number = 0;
  filesUploadAlready: number = 0;
  popupVisible = false;
  public previewPath: any;
  public pPath: Array<any> = [];
  

  constructor(public navCtrl: NavController, private uploadingService: CcupProvider, public sanitizer: DomSanitizer ) 
  {
    this.fileUploader.onAfterAddingFile = (fileItem) => {
      //this.setPreview(fileItem);
      this.pPath.push(this.sanitizer.bypassSecurityTrustUrl((window.URL.createObjectURL(fileItem._file))));
    }
  }
  removeItem(index) {
    this.fileUploader.queue[index].remove(); 
    this.pPath.splice(index,1);
  }
  // setPreview(fileItem) {
  //   this.previewPath = this.sanitizer.bypassSecurityTrustUrl((window.URL.createObjectURL(fileItem._file)));
  //   this.pPath.push(this.previewPath);
  // }

  getThumbnail(index) {
    return this.pPath[index];
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
    this.progress = 0;
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
    this.popupVisible = true;
    this.filesUploadAlready = 0;

    files.forEach((file) => 
    {
      let formData = new FormData();
      formData.append('file' , file.rawFile, file.name);
      requests.push(this.uploadingService.uploadFormData(formData).subscribe((event: String) => 
      {
        if(event == '0')
        {
          this.filesUploadAlready = this.filesUploadAlready + 1;
          //alert('Up xong roi!');
          this.checkIfDoneUpload();
        }
        else
        {
          //alert('Upload failed!');
        }
        
      }));
    });

  }


  checkIfDoneUpload()
  {
    this.progress = Math.round((this.filesUploadAlready * 100) / this.filesCount);
    if(this.filesUploadAlready >= this.filesCount)
    {
      //Done
      this.popupVisible = false;
    }
    
  }

  

}
