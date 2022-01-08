import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Biopsy } from 'src/app/models/biopsy.model';
import { formattedDate } from 'src/app/utils/utils';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-biopsy-list',
  templateUrl: './biopsy-list.component.html',
  styleUrls: ['./biopsy-list.component.css'],
})
export class BiopsyListComponent implements OnInit {
  @Input() biopsies: Biopsy[] = [];
  @Output() selectBiopsy = new EventEmitter<Biopsy>();
  @Output() loadMoreBiopsies = new EventEmitter<string>();
  formatDate = formattedDate;

  sub: Subscription = new Subscription()
  counter: number = 2;

  constructor() {
  }

  onScrollDown(ev: any) {
    this.loadMoreBiopsies.emit("load more biopsies emitted")
  }

  openBiopsy(biopsy: Biopsy) {
    this.selectBiopsy.emit(biopsy);
  }

  ngOnInit(): void { }
}
