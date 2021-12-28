import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  displayPatientForm: boolean = false;

  constructor() {}

  setShowPatientForm(value: boolean) {
    this.displayPatientForm = value;
  }

  onNewPatient() {
    this.displayPatientForm = true;
  }

  ngOnInit(): void {}
}
