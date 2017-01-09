import { Component, OnInit, Input } from '@angular/core';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';
import { Group } from '../group';

@Component({
  selector: 'app-group-viewer',
  templateUrl: './group-viewer.component.html',
  styleUrls: ['./group-viewer.component.css']
})
export class GroupViewerComponent implements OnInit {
  group: Group = new Group();
  groupObservable: FirebaseObjectObservable<any>;
  _key: string;
  fields = ['owner', 'name', 'open', 'image', 'link', 'items', 'tags', 
        'receiver', 'description', 
        'totalShippingFee', 'totalWeight'];

  constructor(public af: AngularFire) {}

  ngOnInit() {
  }

  @Input()
  set key(key: string) {
    this._key = key;
    this.groupObservable = this.af.database.object('/groups/' + key);
    this.groupObservable.subscribe(snapshot => {
      this.group = snapshot;
      console.log(this.group);
    });
  }
}
