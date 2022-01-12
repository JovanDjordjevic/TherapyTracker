import { Component, Input, OnInit } from '@angular/core';
import { Biopsy, BiopsyHistotype, BiopsySide, BiopsyType } from 'src/app/models/biopsy.model';

@Component({
  selector: 'app-biopsy-info',
  templateUrl: './biopsy-info.component.html',
  styleUrls: ['./biopsy-info.component.css']
})
export class BiopsyInfoComponent implements OnInit {
  @Input() biopsy: Biopsy;
  BiopsySideEnum = BiopsySide;

  constructor() {
    this.biopsy = new Biopsy(new Date, BiopsySide.Both, BiopsyType.AxillaBiopsy, '', BiopsyHistotype.Type0, '', BiopsyType.AxillaBiopsy, '', BiopsyHistotype.Type0, '', '');
  }

  ngOnInit(): void {
  }
}
