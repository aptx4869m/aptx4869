import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { GroupTemplate } from '../group-template';

@Component({
  selector: 'app-create-group-template',
  templateUrl: './create-group-template.component.html',
  styleUrls: ['./create-group-template.component.css']
})
export class CreateGroupTemplateComponent implements OnInit {
  template: GroupTemplate = new GroupTemplate();
  groupTemplates: FirebaseListObservable<any[]>;
  key: string;

  constructor(public af: AngularFire) {
    this.groupTemplates = af.database.list('/group-template');
  }

  read(key: string) {
    this.key = key;
    if (this.key) {
      console.log('get key');
      this.af.database.object('/group-template/' + this.key).subscribe((snapshot) => {
        this.template = snapshot;
        console.log('success');
      });
    }
  }

  addTag(newTag: string) {
    if (!this.template.tags) {
      this.template.tags = [];
    }
    this.template.tags.push(newTag);
  }

  save() {
    if (!this.key) {
      this.key = this.groupTemplates.push(this.template).key;
    } else {
      var updated = {};
      console.log(this.template);
      if (this.template.name) {
        updated['name'] = this.template.name;
      }
      if (this.template.image) {
        updated['image'] = this.template.image;
      }
      if (this.template.link) {
        updated['link'] = this.template.link;
      }
      if (this.template.tags) {
        updated['tags'] = this.template.tags;
      }
      this.groupTemplates.update(this.key, updated);
    }
  }

  ngOnInit() {
  }

}
