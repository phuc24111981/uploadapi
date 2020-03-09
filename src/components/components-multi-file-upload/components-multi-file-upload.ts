import { Component } from '@angular/core';

@Component({
  selector: 'components-multi-file-upload',
  templateUrl: 'components-multi-file-upload.html'
})
export class ComponentsMultiFileUploadComponent {

  text: string;

  constructor() {
    console.log('Hello ComponentsMultiFileUploadComponent Component');
    this.text = 'Hello World';
  }

}
