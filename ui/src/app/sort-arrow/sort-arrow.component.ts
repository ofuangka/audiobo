import { Component, Input } from '@angular/core';

@Component({
  selector: 'sort-arrow',
  templateUrl: './sort-arrow.component.html',
  styleUrls: ['./sort-arrow.component.css']
})
export class SortArrowComponent {

  @Input()
  dir: number;

  constructor() { }

}
