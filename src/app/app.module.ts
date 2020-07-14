
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
import { DebugApiService } from './services/debug-api-service/debug-api.service';
import { ProdApiService } from './services/prod-api-service/prod-api.service';
import { SearchService } from './services/search-service/search.service';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import { InviteButtonComponent } from './components/invite-button/invite-button.component';
import { InviteDialog } from './components/invite-button/invite-button.component';
import { SessionButtonComponent, SessionDialog } from './components/session-button/session-button.component';
import {MatListModule} from '@angular/material/list';
import {MatSliderModule} from '@angular/material/slider';
import { UpgradeButtonComponent } from './components/upgrade-button/upgrade-button.component';
import { MatDialogModule } from '@angular/material/dialog';
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
import { CompareStartupsButtonComponent, CompareDialog } from './components/compare-startups-button/compare-startups-button.component';
import { ListButtonComponent, ListDialog } from './components/list-button/list-button.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchBarComponent,
    NavBarComponent,
    InviteButtonComponent,
    SessionButtonComponent,
    UpgradeButtonComponent,
    DiscoverComponent,
    ListsComponent,
    ArchiveComponent,
    StartupDetailComponent,
    InviteDialog,
    SessionDialog,
    ListDetailComponent,
    CompareStartupsButtonComponent,
    CompareDialog,
    ListButtonComponent,
    ListDialog
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
    MatSliderModule
  ],
  providers: [
    DebugApiService,
    ProdApiService,
    IpService,
    SearchService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
