import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Tumor } from 'src/app/models/tumor.model';
import { formattedDate } from 'src/app/utils/utils';

@Component({
  selector: 'app-tumor-list',
  templateUrl: './tumor-list.component.html',
  styleUrls: ['../../../styles/table.css'],
})
export class TumorListComponent implements OnInit {
  @Input() tumors: Tumor[] = [];
  @Input() position: boolean = false;
  @Output() selectTumor = new EventEmitter<Tumor>();
  @Output() loadMoreTumors = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void { }

  onScrollDown(ev: any) {
    this.loadMoreTumors.emit("load more tumors emitted")
  }

  openTumor(tumor: Tumor) {
    this.selectTumor.emit(tumor);
  }

  formatDate(date: Date) {
    return formattedDate(date);
  };

}
