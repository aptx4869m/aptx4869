import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';

@Injectable()
export class UserService {

  constructor(public af: AngularFire, public router: Router) { }

  loginAngularFire(email: string, password: string) {
    return this.af.auth.login({
      email: email,
      password: password,
    }).then((success) => {
      console.log("Firebase success: " + JSON.stringify(success));
      return success;
    }).catch((error) => {
      console.log("Firebase failure: " + JSON.stringify(error));
      return error;
    });;
  }

  logout() {
     this.af.auth.logout();
  }

  register(email: string, password: string, displayName?: string, photoURL?: string) {
    return this.af.auth.createUser({email: email, password: password})
      .then((auth) => {
        this.af.auth.subscribe(auth => {
          var data = {displayName: displayName, photoURL: photoURL};
          var user = firebase.auth().currentUser;
          user.updateProfile(data)
            .then(_ => console.log('success'))
            .catch(err => console.log(err, 'You do not have access!'));
          this.af.database.object('/users/' + user.uid).update(data)
            .then(_ => console.log('success'))
            .catch(err => console.log(err, 'You do not have access!'));
//          this.router.navigateByUrl('/profile');
        });
        return auth;
      })
      .catch((error) => {
        console.log("Firebase failure: " + JSON.stringify(error));
        return error;
    });
  }
}
