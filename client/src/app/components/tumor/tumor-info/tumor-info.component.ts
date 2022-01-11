import { Component, Input, OnInit } from '@angular/core';
import { Gradus, Her2Status, HER2_FISH_SICH, Tumor } from 'src/app/models/tumor.model';

@Component({
  selector: 'app-tumor-info',
  templateUrl: './tumor-info.component.html',
  styleUrls: ['./tumor-info.component.css']
})
export class TumorInfoComponent implements OnInit {
  @Input() tumor: Tumor;

  constructor() {
    this.tumor = new Tumor(new Date, '', '', Gradus.Type1, 0, 0, 0, 0, 0, 0, 0, 0, HER2_FISH_SICH.Negative, Her2Status.One, '', 0);
  }

  ngOnInit(): void {
  }

}
