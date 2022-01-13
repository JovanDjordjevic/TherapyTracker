import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Biopsy } from 'src/app/models/biopsy.model';
import { formattedDate } from 'src/app/utils/utils';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-biopsy-list',
  templateUrl: './biopsy-list.component.html',
  styleUrls: ['../../../styles/table.css'],
})
export class BiopsyListComponent implements OnInit {
  @Input() biopsies: Biopsy[] = [];
  @Input() position: boolean = false;
  @Output() selectBiopsy = new EventEmitter<Biopsy>();
  @Output() loadMoreBiopsies = new EventEmitter<void>();

  sub: Subscription = new Subscription()
  counter: number = 2;

  constructor() {}

  ngOnInit(): void {}

  onScrollDown(ev: any) {
    this.loadMoreBiopsies.emit()
  }

  openBiopsy(biopsy: Biopsy) {
    this.selectBiopsy.emit(biopsy);
  }

  formatDate(date: Date) {
    return formattedDate(date)
  }
}
