import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  email: string;
  password: string;
  photoURL: string;
  displayName: string;
  error: string = '';
  valid: boolean = false;

  constructor(public af: AngularFire, public router: Router) { }

  ngOnInit() {
  }

  validateForm() {
    this.valid = !(!this.email || !this.password || !this.displayName || !this.photoURL);
  }

  register() {
    this.af.auth.createUser({email: this.email, password: this.password})
      .then((auth) => {
        console.log(auth);
        this.af.auth.subscribe(auth => {
           
          var data = {displayName: this.displayName, photoURL: this.photoURL};
          var user = firebase.auth().currentUser;
          user.updateProfile(data)
            .then(_ => console.log('success'))
            .catch(err => console.log(err, 'You do not have access!'));
          this.af.database.object('/users/' + user.uid).update(data)
            .then(_ => console.log('success'))
            .catch(err => console.log(err, 'You do not have access!'));
//          this.router.navigateByUrl('/profile');
        });
      })
      .catch((error) => {
        this.error = error.message;
    });
  }
}
