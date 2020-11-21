import { Component, OnInit } from '@angular/core';
import { User } from './models/user-model';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  pages = []
  user = null

  constructor(public router: Router, private route: ActivatedRoute){

    this.pages = [
      {title:"Discover", icon: "language", url: "discover", notificationCount: 2},
      {title:"Lists", icon: "list", url: "lists"},
      {title:"Archive", icon: "folder", url: "archive", disabled: true}
    ]

  }

  ngOnInit(){
    // this.user = new User(1, "kwang@supercharge.work", "pass", [0])
    // this.user.name = "Michael"
    this.user = JSON.parse(localStorage.getItem("user"));
    console.log(this.user);
    if (this.user) {
      this.user.displayName = "Michael";
      this.router.navigate(['discover']);
    }
  }

}

