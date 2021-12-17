import { Component, OnInit } from '@angular/core';
import { Gender, Patient } from 'src/app/models/patient.model';
import { SideBar } from 'src/app/models/sidebar.model';
import { PatientService } from 'src/app/services/patient-service.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  constructor(private ps : PatientService) {}

  ngOnInit(): void {}

  // for testing requests
  sendRequest(){
    this.ps.getAllPatients();      //works

    this.ps.getPatientByName();      //works

    const p = new Patient("1214966701524", "Ana", "Marija", "Anic", 1966, Gender.Female, 0, "Neka Ulica 55", "Beograd", "0112746172", "ana_anic@gmail.com", new Date(), "nesto nesto nesto nesto");
    this.ps.insertPatientInDB(p);    // works

    this.ps.deletePatientFromDB("1214966701524"); // works
  }
}
