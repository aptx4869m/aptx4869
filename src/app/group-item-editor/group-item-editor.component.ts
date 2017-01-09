import { Component, OnInit, Input } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { GroupItem } from '../group-item';
import { Proposal } from '../proposal';

@Component({
  selector: 'app-group-item-editor',
  templateUrl: './group-item-editor.component.html',
  styleUrls: ['./group-item-editor.component.css']
})
export class GroupItemEditorComponent implements OnInit {
  groupItem: GroupItem;
  items: FirebaseListObservable<any[]>;
  key: string;

  proposals: {};
  proposalTypes: {};
  proposalObservable: FirebaseListObservable<any>;

  _group: string;
  currentUser: string;
  groupUsers: string[] = [];
  displayNames: {};
  newUser: string;

  editProposal: boolean = false;

  @Input() editable: boolean = true;
 
  @Input()
  get group() { return this._group; }
  set group(group: string) {
    this._group = group;
    this.items = this.af.database.list('/groups/' + group + '/items');
    this.readProposals();
  }

  constructor(public af: AngularFire) {
    this.af.auth.subscribe(auth => {
      this.currentUser = auth.uid;
    });
  }

  delete(key: string) {
    this.items.remove(key);
    this.key = null;
  }

  read(key: string) {
    this.key = key;
    this.af.database.object('/groups/' + this._group + '/items/' + key).subscribe(snapshot => {
      this.groupItem = snapshot;
    });
  }

  setStock(key: string, count: number) {
    this.items.update(key, {stock: count});
  }

  setProposal(key: string, count: number, user?: string) {
    if (!user) user = this.currentUser;
    var updated = {count: count};
    if (this.editable) {
      updated['owner'] = count;
    } else {
      updated['user'] = count;
    }

    this.af.database.object('/groups/' + this._group + '/proposals/' + user + '/' + key).update(updated);
    this.af.database.object('/users/' + user + '/proposals/' + this._group + '/' + key).update(updated);
  }

  readProposals() {
    this.groupUsers = [];
    this.proposals = {};
    this.proposalTypes = {};
    this.displayNames = {};
    this.proposals[this.currentUser] = {};
    this.proposalTypes[this.currentUser] = {};
    this.af.database.list('/users').subscribe(snapshots => {
      snapshots.forEach(snapshot => {
        var user = snapshot.$key;
        this.displayNames[user] = snapshot.displayName;
      });
    });
    this.af.database.list('/groups/' + this._group + '/proposals').subscribe(snapshots => {
      if (!snapshots.length) return;
      console.log(snapshots);
      this.groupUsers = [];
      snapshots.forEach((snapshot) => {
        console.log(snapshot.$key);
        var user = snapshot.$key;
        this.groupUsers.push(user);
        this.proposals[user] = {};
        this.proposalTypes[user] = {};
        Object.keys(snapshot).forEach((key) => {
          var ownerApproved = false, userApproved = false;
          if (snapshot[key]) {
            if (snapshot[key].count == snapshot[key].owner) {
              ownerApproved = true;
            }
            if (snapshot[key].count == snapshot[key].user) {
              userApproved = true;
            }
            this.proposals[user][key] = snapshot[key].count;
            if (userApproved && ownerApproved) {
              this.proposalTypes[user][key] = 'confirmed';
            } else if ((userApproved && this.editable) || (ownerApproved && !this.editable)) {
              this.proposalTypes[user][key] = 'needs-action';
            } else if ((userApproved && !this.editable) || (ownerApproved && this.editable)) {
              this.proposalTypes[user][key] = 'pending';
            }
          }
        });
      });
    });
  }

  save() {
    if (!this.key) {
      this.items.push(this.groupItem);
    } else {
      var updated = {};
      if (this.groupItem.name) {
        updated['name'] = this.groupItem.name;
      }
      if (this.groupItem.image) {
        updated['image'] = this.groupItem.image;
      }
      if (this.groupItem.link) {
        updated['link'] = this.groupItem.link;
      }
      this.items.update(this.key, updated);
    }
    this.key = null;
  }

  addNewItem() {
    this.key = null;
    this.groupItem = new GroupItem();
  }

  addNewUser() {
    this.groupUsers.push(this.newUser);
    this.proposals[this.newUser] = {};
    this.proposalTypes[this.newUser] = {};
  }

  ngOnInit() {
  }

}
