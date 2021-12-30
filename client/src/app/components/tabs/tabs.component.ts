import { Component, OnInit, Input } from '@angular/core';
import { Gender, Menopause, Patient } from 'src/app/models/patient.model';

declare const $: any;

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css'],
})
export class TabsComponent implements OnInit {
  @Input() patient: Patient;

  constructor() {
    this.patient = new Patient(
      'aaa',
      '',
      '',
      '',
      0,
      Gender.Female,
      Menopause.Peri,
      '',
      '',
      '',
      '',
      new Date(),
      ''
    );
  }

  ngOnInit() {
    $('.menu .item').tab();
  }
}
