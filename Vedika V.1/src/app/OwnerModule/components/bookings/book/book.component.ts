import { Component, EventEmitter, Output  } from '@angular/core';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent  {
  @Output() featureSelected = new EventEmitter();
  onSelect(feature: string) {
    this.featureSelected.emit(feature);
 }
}
