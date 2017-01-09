import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css']
})
export class GroupListComponent implements OnInit {
  groups: FirebaseListObservable<any[]>;
  currentUser: string;

  // create new Group
  newGroupName: string;
  newGroupImage: string;
  showCreateGroup: boolean = false;

  constructor(public af: AngularFire, public router: Router) {
    this.groups = af.database.list('/groups', this.validGroup);
    af.auth.subscribe(auth => {
      this.currentUser = auth.uid;
    });
  }

  get validGroup() {
    return {
      query: {
        orderByChild: 'valid',
        equalTo: true
      }
    };
  }

  get myGroup() {
    return {
      query: {
        orderByChild: 'owner',
        equalTo: this.currentUser
      }
    };
  }

  addGroup() {
    this.showCreateGroup = false;
    let key = this.groups.push({
      owner: this.currentUser, 
      receiver: this.currentUser, 
      name: this.newGroupName, 
      image: this.newGroupImage,
      valid: true
    }).key;
    this.router.navigateByUrl('/group/' + key);
  }

  ngOnInit() {
  }

}
