import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { GroupListComponent } from './group-list/group-list.component';
import { ProfileSettingComponent } from './profile-setting/profile-setting.component';
//import { CreateGroupTemplateComponent } from './create-group-template/create-group-template.component';
import { GroupItemEditorComponent } from './group-item-editor/group-item-editor.component';
import { GroupEditorComponent } from './group-editor/group-editor.component';
//import { GroupViewerComponent } from './group-viewer/group-viewer.component';
import { TagsEditorComponent } from './tags-editor/tags-editor.component';
import { UserPickerComponent } from './user-picker/user-picker.component';
import { ImagePickerComponent } from './image-picker/image-picker.component';
//import { GroupItemListComponent } from './group-item-list/group-item-list.component';
//import { ProposalListComponent } from './proposal-list/proposal-list.component';
import { RegisterComponent } from './register/register.component';

import { UserService } from './user.service';

import * as wilddog from 'wilddog'

// Must export the config
export const firebaseConfig = {
  apiKey: 'AIzaSyCYyoMTv3YIQGeBk4vg_WH96I_YUjthOp8',
  authDomain: 'conan-aptx4869.firebaseapp.com',
  databaseURL: 'https://conan-aptx4869.firebaseio.com',
  storageBucket: 'conan-aptx4869.appspot.com',
//  messagingSenderId: '562476944197'
};

const myFirebaseAuthConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
}

var config = {
  syncURL: "https://aptx4869.wilddogio.com" 
};
wilddog.initializeApp(config);

const appRoutes: Routes = [
  { path: '*', component: GroupListComponent },
  { path: 'group-list', component: GroupListComponent },
  { path: 'profile', component: ProfileSettingComponent },
  { path: 'group/:id', component: GroupEditorComponent },
  { path: 'register', component: RegisterComponent },
];


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    GroupListComponent,
    ProfileSettingComponent,
//    CreateGroupTemplateComponent,
    GroupItemEditorComponent,
    GroupEditorComponent,
//    GroupViewerComponent,
    TagsEditorComponent,
    UserPickerComponent,
    ImagePickerComponent,
//    GroupItemListComponent,
//    ProposalListComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig),
    RouterModule.forRoot(appRoutes),
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
