import { Component, Input, OnInit } from '@angular/core';
import {
  Biopsy,
  BiopsyHistotype,
  BiopsySide,
  BiopsyType,
} from 'src/app/models/biopsy.model';

@Component({
  selector: 'app-biopsy',
  templateUrl: './biopsy.component.html',
  styleUrls: ['./biopsy.component.css'],
})
export class BiopsyComponent implements OnInit {
  @Input() biopsy: Biopsy;

  constructor() {
    this.biopsy = new Biopsy(
      new Date(),
      BiopsySide.Left,
      BiopsyType.AxillaBiopsy,
      '',
      BiopsyHistotype.Type0,
      '',
      BiopsyType.BreastBiopsy,
      '',
      BiopsyHistotype.Type0,
      '',
      ''
    );
  }
  ngOnInit(): void {}
}
