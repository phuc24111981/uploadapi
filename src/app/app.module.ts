import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { UploadPage } from '../pages/upload/upload';

import { HttpClientModule } from '@angular/common/http';
import { FileUploadModule } from 'ng2-file-upload';
import { CcupProvider } from '../providers/ccup/ccup';
import { DxButtonModule } from 'devextreme-angular';
import { ReactiveFormsModule } from '@angular/forms';

import { DxPopupModule, DxTemplateModule } from 'devextreme-angular';
import { ProgressBarModule } from "angular-progress-bar";
import { DxLoadIndicatorModule } from 'devextreme-angular';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    UploadPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    FileUploadModule,
    DxButtonModule,
    ReactiveFormsModule,
    DxPopupModule,
    DxTemplateModule,
    ProgressBarModule,
    DxLoadIndicatorModule
  ],
  bootstrap: [IonicApp],
  entryComponents: 
  [
    MyApp,
    HomePage,
    UploadPage
  ],
  providers: 
  [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    CcupProvider
  ]
})
export class AppModule {}
