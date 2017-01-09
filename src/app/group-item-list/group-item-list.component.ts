import { Component, OnInit, Input } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { GroupItem } from '../group-item';
import { Proposal } from '../proposal';

@Component({
  selector: 'app-group-item-list',
  templateUrl: './group-item-list.component.html',
  styleUrls: ['./group-item-list.component.css']
})
export class GroupItemListComponent implements OnInit {
  groupItem: GroupItem;
  items: FirebaseListObservable<any[]>;
  stock = {};
  stockObservable: FirebaseObjectObservable<any>;
  proposal = {};
  proposalObservable: FirebaseObjectObservable<any>;
  key: string;
  _group: string;
  editable: boolean = true; 
  currentUser: string;
 
  @Input()
  get group() { return this._group; }
  set group(group: string) {
    this._group = group;
    this.items = this.af.database.list('/groups/' + group + '/items');
    this.readStock();
    this.readProposal();
  }

  constructor(public af: AngularFire) {
    this.af.auth.subscribe(auth => {
      this.currentUser = auth.uid;
    });
  }

  delete(key: string) {
    this.items.remove(key);
    this.addNewItem();
  }

  read(key: string) {
    this.key = key;
    this.af.database.object('/groups/' + this._group + '/items/' + key).subscribe(snapshot => {
      this.groupItem = snapshot;
    });
  }

  /** Stock settings */
  setStock(key: string, count: number) {
    // Check ownership
    var updated = {};
    updated[key] = count;
    this.stockObservable.update(updated);
  }

  readStock() {
    this.stockObservable = this.af.database.object('/groups/' + this._group + '/stock');
    this.stockObservable.subscribe(snapshot => {
      if (snapshot) {
        this.stock = snapshot;
        console.log(snapshot);
      }
    });
  }
  /** Stock setting end*/

  // groups/groupID/users/userId/ -> 
  // groups/groupID/items/item
  /** Proposal settings */
  setProposal(key: string, count: number) {
    // Check ownership
    var updated = {'requester': this.currentUser};
    updated[key] = count;
    this.proposalObservable.update(updated);
  }

  readProposal() {
    this.proposalObservable = this.af.database.object('/groups/' + this._group + '/proposals/' + this.currentUser);
    this.proposalObservable.subscribe(snapshot => {
      if (snapshot) {
        this.proposal = snapshot;
        console.log(snapshot);
      }
    });
  }
  /** Proposal setting end*/
  // groups/groupId/userId/proposals/proposalId
  // groups/groupId/userId/confirmed
  // groups/groupId

  // groups/groupID/users/userId/ -> 
  

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
    this.addNewItem();
  }

  addNewItem() {
    this.key = null;
    this.groupItem = new GroupItem();
  }

  ngOnInit() {
  }

}
