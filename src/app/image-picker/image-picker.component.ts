import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-image-picker',
  templateUrl: './image-picker.component.html',
  styleUrls: ['./image-picker.component.css']
})
export class ImagePickerComponent implements OnInit {
  @Input() image: string;
  @Input() editable: boolean = true;

  @Output() imageChange: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  updateImage() {
    this.imageChange.emit(this.image);
  }

  ngOnInit() {
  }

}
