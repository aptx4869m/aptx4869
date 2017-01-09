import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';
import { Group } from '../group';

@Component({
  selector: 'app-group-editor',
  templateUrl: './group-editor.component.html',
  styleUrls: ['./group-editor.component.css']
})
export class GroupEditorComponent implements OnInit {
  group: Group = new Group();
  groupObservable: FirebaseObjectObservable<any>;
  _key: string;
  editable: boolean = false;

  @Input()
  set key(key: string) {
    this._key = key;
    this.groupObservable = this.af.database.object('/groups/' + key);
    this.groupObservable.subscribe(snapshot => {
      this.group = snapshot;
      this.editable = snapshot.owner == this.af.auth.getAuth().uid;
    });
  }

  constructor(public af: AngularFire, private _route: ActivatedRoute) {
    _route.params.subscribe(p => {
      this.key = p['id'];
    });
  }

  ngOnInit() {
  }

  updateGroupName() {
    if (this.group.name) {
      this.groupObservable.update({name: this.group.name});
    }
  }

  updateGroupDescription() {
    if (this.group.description) {
      this.groupObservable.update({description: this.group.description});
    }
  }

  updateGroupImage(image: string) {
    this.group.image = image;
    if (image) {
      this.groupObservable.update({image: this.group.image});
    }
  }

  updateGroupLink() {
    if (this.group.link) {
      this.groupObservable.update({link: this.group.link});
    }
  }

  updateGroupReceiver(uid: string) {
    this.group.receiver = uid;
    if (uid) {
      this.groupObservable.update({receiver: uid});
    }
  }

  updateGroupTags(tags: string[]) {
    this.group.tags = tags;
    if (tags) {
      this.groupObservable.update({tags: tags});
    }
  }

  delete() {
    this.groupObservable.update({valid: false});
  }
}
