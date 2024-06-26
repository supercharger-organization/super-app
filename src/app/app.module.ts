
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module'; 

import { FormsModule } from '@angular/forms';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { HttpClientModule } from '@angular/common/http';

// Combined all of the model services into just a debug and production api service
import { ProdApiService } from './services/prod-api-service/prod-api.service';
import { SearchService } from './services/search-service/search.service';

import {MatTabsModule} from '@angular/material/tabs';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatSliderModule} from '@angular/material/slider';
import { UpgradeButtonComponent } from './components/upgrade-button/upgrade-button.component';
import { MatDialogModule } from '@angular/material/dialog';
import { LogInComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { ForgotPasswordComponent } from './pages/auth/forgotPassword/forgotPassword.component';
import { DiscoverComponent } from './pages/discover/discover.component';
import { ListsComponent } from './pages/lists/lists.component';
import { ArchiveComponent } from './pages/archive/archive.component';
import { StartupDetailComponent } from './pages/startup-detail/startup-detail.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {TextFieldModule} from '@angular/cdk/text-field';
import { ListDetailComponent } from './pages/list-detail/list-detail.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatBadgeModule } from '@angular/material/badge';
import { MdePopoverModule } from '@material-extended/mde';
import { XunkCalendarModule } from 'xunk-calendar';
import {MatCardModule} from '@angular/material/card';
import { IpService } from './services/ip-service/ip.service';
import { AbstractInputComponent } from './abstracts/input.component';
import { AbstractNgModelComponent } from './abstracts/ng-model.component';
import { InputTextComponent } from './components/form-text-field/input-text.component';
import { InputTextWithLabelComponent } from './components/form-text-field/input-text-with-label.component';
import { MultipleTextInputWithLabelComponent } from './components/form-text-field/multi-item-text-input.compent';
import { InputTextAreaWithLabelComponent } from './components/form-text-field/input-text-area-with-label.component';
import { InputFileWithLabelComponent } from './components/form-text-field/single-file-input.component';
import { InputMultiFileWithLabelComponent } from './components/form-text-field/multi-file-input.component';
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AuthService } from './services/auth/auth.service';
import { CompareStartupsDialogComponent } from './components/dialogs/compare-startups-dialog/compare-startups-dialog.component';
import { InviteDialogComponent } from './components/dialogs/invite-dialog/invite-dialog.component';
import { SessionDialogComponent } from './components/dialogs/session-dialog/session-dialog.component';
import { ListDialogComponent } from './components/dialogs/list-dialog/list-dialog.component';
import { S3BucketService } from './services/s3-bucket-service/s3-bucket.service';

import { ToastrModule } from 'ngx-toastr';
import { BoardService } from './services/board-service/board.service';
import { ListService } from './services/list-service/list.service';
import { StartupService } from './services/startup-service/startup.service';
import { AdminComponent } from './pages/admin/admin.component';
import { StartupEditComponent } from './pages/startup-edit/startup-edit.component';
import { AddToListDialogComponent } from './components/dialogs/add-to-list-dialog/add-to-list-dialog.component';


var config = {
  apiKey: "AIzaSyCbRakyCmZUXNvVetabwjMGvDveI7Hm5Ms",
  authDomain: "supercharger-3e6d7.firebaseapp.com",
  databaseURL: "https://supercharger-3e6d7.firebaseio.com",
  projectId: "supercharger-3e6d7",
  storageBucket: "supercharger-3e6d7.appspot.com",
  messagingSenderId: "182064045012",
  appId: "1:182064045012:web:c678989c8dc3684805d441",
  measurementId: "G-1P7PQYV1VR"
};

@NgModule({
  declarations: [
    AppComponent,
    SearchBarComponent,
    NavBarComponent,
    UpgradeButtonComponent,
    DiscoverComponent,
    ListsComponent,
    ArchiveComponent,
    StartupDetailComponent,
    ListDetailComponent,
    CompareStartupsDialogComponent,
    AdminComponent,
    AbstractInputComponent,
    AbstractNgModelComponent,
    InputTextComponent,
    InputTextWithLabelComponent,
    InputFileWithLabelComponent,
    InputMultiFileWithLabelComponent,
    MultipleTextInputWithLabelComponent,
    InputTextAreaWithLabelComponent,
    ListDialogComponent,
    LogInComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    CompareStartupsDialogComponent,
    InviteDialogComponent,
    SessionDialogComponent,
    StartupEditComponent,
    AddToListDialogComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatSelectModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatListModule,
    MatDialogModule,
    MatProgressBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    TextFieldModule,
    MatChipsModule,
    MatBadgeModule,
    MdePopoverModule,
    MatCardModule,
    XunkCalendarModule,
    HttpClientModule,
    MatSliderModule,
    AngularFireModule.initializeApp(config),
    AngularFireAuthModule,
    BrowserAnimationsModule,
    MatTabsModule,
    ToastrModule.forRoot()
  ],
  providers: [
    AuthService,
    ProdApiService,
    IpService,
    SearchService,
    S3BucketService,
    BoardService,
    ListService,
    StartupService,
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
