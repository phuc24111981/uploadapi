import { Component } from '@angular/core';
import { FileUploader, FileLikeObject } from 'ng2-file-upload';
import { CcupProvider } from '../../providers/ccup/ccup';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [
    CcupProvider
  ]
})
export class HomePage  {

  public uploader: FileUploader = new FileUploader({});
  public hasBaseDropZoneOver: boolean = false;

  constructor() { 

  }

  getFiles(): FileLikeObject[] {
    return this.uploader.queue.map((fileItem) => {
      return fileItem.file;
    });
  }

  fileOverBase(ev): void {
    this.hasBaseDropZoneOver = ev;
  }

  reorderFiles(reorderEvent: CustomEvent): void {
    let element = this.uploader.queue.splice(reorderEvent.detail.from, 1)[0];
    this.uploader.queue.splice(reorderEvent.detail.to, 0, element);
  }
  

}
