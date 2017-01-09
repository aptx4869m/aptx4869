import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(af: AngularFire, router: Router) {
    af.auth.subscribe(auth => {
      if (!auth) {
        router.navigateByUrl('/register');
      } else if (!auth.auth.displayName || !auth.auth.photoURL) {
        router.navigateByUrl('/profile');
      } else {
        router.navigateByUrl('/group-list');
      }
    });
  }
}
