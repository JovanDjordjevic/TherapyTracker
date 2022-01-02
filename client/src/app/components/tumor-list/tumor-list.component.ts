import { Component, OnInit, Input } from '@angular/core';
import { Tumor } from 'src/app/models/tumor.model';

@Component({
  selector: 'app-tumor-list',
  templateUrl: './tumor-list.component.html',
  styleUrls: ['./tumor-list.component.css'],
})
export class TumorListComponent implements OnInit {
  @Input() tumors: Tumor[] = [];
  constructor() {}

  ngOnInit(): void {}
}
