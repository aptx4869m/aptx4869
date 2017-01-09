import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';

@Component({
  selector: 'app-profile-setting',
  templateUrl: './profile-setting.component.html',
  styleUrls: ['./profile-setting.component.css']
})
export class ProfileSettingComponent implements OnInit {
  name: string = '';
  avatar: string = '';

  constructor(public af: AngularFire) {
    this.af.auth.subscribe(auth => {
      if (auth) {
        this.name = auth.auth.displayName;
        this.avatar = auth.auth.photoURL;
      }
    });
  }

  updateProfile() {
    var user = firebase.auth().currentUser;
    var data = {displayName: this.name, photoURL: this.avatar};
    user.updateProfile(data)
      .then(_ => console.log('success'))
      .catch(err => console.log(err, 'You do not have access!'));
    this.af.database.object('/users/' + user.uid).update(data);
  }

  ngOnInit() {
  }

}
