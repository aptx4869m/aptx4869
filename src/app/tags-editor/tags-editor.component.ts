import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tags-editor',
  templateUrl: './tags-editor.component.html',
  styleUrls: ['./tags-editor.component.css']
})
export class TagsEditorComponent implements OnInit {
  _tags: string[];

  @Input()
  get tags(): string[] { return this._tags; }
  set tags(tags: string[]) { this._tags = tags; }

  @Input()
  editable: boolean = true;

  @Output() tagsChange: EventEmitter<string[]> = new EventEmitter<string[]>();
  
  addTag(tag: string) {
    if (!this.editable) return;
    if (!this._tags) {
      this._tags = [];
    }
    this._tags.push(tag);
    this.tagsChange.emit(this._tags);
  }

  removeTag(tag: string) {
    if (!this.editable) return;
    var index = this._tags.indexOf(tag, 0);
    if (index > -1) {
      this._tags.splice(index, 1);
    }
    this.tagsChange.emit(this._tags);
  }

  constructor() { }

  ngOnInit() {
  }

}
