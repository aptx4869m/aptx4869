import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import { UserService } from '../user.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  password: string;
  email: string;
  displayName: string;
  photoUrl: string;
  error: string;

  constructor(public af: AngularFire, router: Router, userService: UserService) {
    this.af.auth.subscribe(auth => {
      if (auth) {
        this.displayName = auth.auth.displayName;
        this.photoUrl = auth.auth.photoURL;
        if (!this.displayName || !this.photoUrl) {
          router.navigateByUrl('/profile');
        }
      } else {
        router.navigateByUrl('/register');
      }
    });
  }

  ngOnInit() {
  }

  login() {
    this.af.auth.login({
      email: this.email,
      password: this.password,
    }).then((success) => {
      this.displayName = success.auth.displayName;
      this.photoUrl = success.auth.photoURL;
      console.log(success);
      console.log("Firebase success: " + JSON.stringify(success));
    })
    .catch((error) => {
      this.error = error.message;
      console.log("Firebase failure: " + JSON.stringify(error));
    });;
  }

  logout() {
     this.af.auth.logout();
  }
}
