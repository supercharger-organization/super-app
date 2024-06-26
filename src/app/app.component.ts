import { Component, OnInit } from '@angular/core';
import { User } from './models/user-model';
import { ActivatedRoute, Event, NavigationEnd, NavigationError, NavigationStart } from '@angular/router';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { InviteDialogComponent } from './components/dialogs/invite-dialog/invite-dialog.component';
import { SessionDialogComponent } from './components/dialogs/session-dialog/session-dialog.component';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  pages = []
  user = null
  url: string;

  constructor(
    public router: Router, 
    private route: ActivatedRoute, 
    public dialog: MatDialog, 
    public authService: AuthService){

    this.pages = [
      {title:"Discover", icon: "language", url: "discover"},
      //{title:"Discover", icon: "language", url: "discover", notificationCount: 2},
      {title:"Lists", icon: "list", url: "lists"},
    ]

    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        this.url = event.url;
      }

      if (event instanceof NavigationEnd) {
        //navigation end
      }

      if (event instanceof NavigationError) {
        //navigation error
      }
    });
  }

  ngOnInit(){
    this.user = JSON.parse(localStorage.getItem("user"));
  }

  navigateToAdminPage(){
    this.router.navigate(['admin']);
  }

}

