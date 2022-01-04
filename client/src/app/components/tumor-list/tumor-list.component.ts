import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Tumor } from 'src/app/models/tumor.model';
import { formattedDate } from 'src/app/utils/utils';

@Component({
  selector: 'app-tumor-list',
  templateUrl: './tumor-list.component.html',
  styleUrls: ['./tumor-list.component.css'],
})
export class TumorListComponent implements OnInit {
  @Input() tumors: Tumor[] = [];
  @Output() selectTumor = new EventEmitter<Tumor>();
  formatDate = formattedDate;

  constructor() { }

  openTumor(tumor: Tumor) {
    this.selectTumor.emit(tumor);
  }

  ngOnInit(): void { }
}
