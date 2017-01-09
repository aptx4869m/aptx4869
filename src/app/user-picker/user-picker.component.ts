import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'app-user-picker',
  templateUrl: './user-picker.component.html',
  styleUrls: ['./user-picker.component.css']
})
export class UserPickerComponent implements OnInit {
  users: FirebaseListObservable<any[]>;
  _selected: string;
  displayName: string;
  photoURL: string;
  @Input() editable: boolean = true;

  @Input() set value(uid: string) {
    this._selected = uid;
    this.users.forEach((snapshots) => {
      snapshots.forEach((snapshot) => {
        if (snapshot.$key == this._selected) {
          this.displayName = snapshot.displayName;
          this.photoURL = snapshot.photoURL;
        }
      });
    });
  }

  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();

  set selected(selected: string) {
    this._selected = selected;
    this.valueChange.emit(this._selected);
  }

  get selected(): string {
    return this._selected;
  }

  constructor(public af: AngularFire) {
    this.users = af.database.list('/users');
  }

  ngOnInit() {
  }

}
