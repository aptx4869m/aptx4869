import { Component, OnInit, Input } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

@Component({
  selector: 'app-proposal-list',
  templateUrl: './proposal-list.component.html',
  styleUrls: ['./proposal-list.component.css']
})
export class ProposalListComponent implements OnInit {
  groupProposals: FirebaseListObservable<any[]>;
  userProposals: FirebaseListObservable<any[]>;
  group: FirebaseObjectObservable<any>;
  users: FirebaseListObservable<any[]>;
  currentUser: string;
  _groupKey: string;

  @Input()
  set groupKey(groupKey: string) {
    this._groupKey = groupKey;
    this.getGroupProposals();
  }

  constructor(public af: AngularFire) {
    this.af.auth.subscribe(auth => {
      this.currentUser = auth.uid;
      this.getUsersProposals();
    });
  }

  getUsersProposals() {
    this.users = this.af.database.list('/users');
    this.userProposals = this.af.database.list('/users/' + this.currentUser + '/proposals');
    this.userProposals.subscribe(snapshots => {
      snapshots.forEach(snapshot => {
        console.log(snapshot.$key);
        if (snapshot.items) {
          console.log(snapshot.items);
          snapshot.items.forEach((key, value, map) => {
            console.log(`key ${key}`);
            this.af.database.object('/groups/' + this._groupKey + '/items/' + key).subscribe(snapshot => {
              var itemName = snapshot.name;
              console.log(`${value} ${itemName}`);
            });
          });
        }
        console.log(snapshot);
      });
    });
  }

  getGroupProposals() {
    this.group = this.af.database.object('/groups/' + this._groupKey);
    this.groupProposals = this.af.database.list('/groups/' + this._groupKey + '/proposals');
    this.groupProposals.subscribe(snapshots => {
      snapshots.forEach(snapshot => {
        console.log(snapshot.$key);
        console.log(snapshot);
      });
    });
  }

  ngOnInit() {
  }

}
