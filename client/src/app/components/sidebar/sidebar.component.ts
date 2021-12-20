import { Component, OnInit } from '@angular/core';
import { Biopsy, BiopsyHistotype, BiopsySide, BiopsyType } from 'src/app/models/biopsy.model';
import { Gender, Patient } from 'src/app/models/patient.model';
import { SideBar } from 'src/app/models/sidebar.model';
import { BiopsyService } from 'src/app/services/biopsy-service.service';
import { PatientService } from 'src/app/services/patient-service.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  constructor(private ps : PatientService, private bs : BiopsyService) {}

  ngOnInit(): void {}

  // for testing requests
  sendRequest(){
    // this.ps.getAllPatients();      //works
    // this.ps.getPatientByName("Jana", "Janic");      //works
    // const p = new Patient("1214966701524", "Ana", "Marija", "Anic", 1966, Gender.Female, 0, "Neka Ulica 55", "Beograd", "0112746172", "ana_anic@gmail.com", new Date(), "nesto nesto nesto nesto");
    // this.ps.insertPatientInDB(p);    // works
    // this.ps.deletePatientFromDB("some id"); // works


    //this.bs.getAllBiopsies();
    //this.bs.getAllBiopsiesForPatient("some id");
    //const b = new Biopsy(new Date(), BiopsySide.Left, BiopsyType.AxillaBiopsy, "1/2021", BiopsyHistotype.Type0, "ne", BiopsyType.BreastBiopsy, "2/2021", BiopsyHistotype.Type1, "2", "");
    //this.bs.addNewBiopsyForPatient("some id", b);
    //this.bs.updateBiopsyInfo(b);
    //this.bs.deleteBiopsyForPatient("some id1", "some id2");
  }
}
