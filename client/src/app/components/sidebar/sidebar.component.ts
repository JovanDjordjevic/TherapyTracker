import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Biopsy, BiopsyHistotype, BiopsySide, BiopsyType } from 'src/app/models/biopsy.model';
import { Gender, Patient } from 'src/app/models/patient.model';
import { Therapy } from 'src/app/models/therapy.model';
import { Gradus, Her2Status, HER2_FISH_SICH, Tumor } from 'src/app/models/tumor.model';
import { BiopsyService } from 'src/app/services/biopsy-service.service';
import { PatientService } from 'src/app/services/patient-service.service';
import { TherapyService } from 'src/app/services/therapy.service';
import { TumorService } from 'src/app/services/tumor.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})

export class SidebarComponent implements OnInit {

  @Output() onDisplayHome = new EventEmitter<void>();
  @Output() onDisplayPatients = new EventEmitter<void>();
  @Output() onDisplayBiopsies = new EventEmitter<void>();
  @Output() onDisplayTumors = new EventEmitter<void>();
  @Output() onDisplayTherapies = new EventEmitter<void>();

  constructor(private ps : PatientService, private bs : BiopsyService, private ts : TumorService, private ths : TherapyService) {}

  ngOnInit(): void {}

  displayHomeClicked(){
    //console.log("click");
    this.onDisplayHome.emit();
  }

  displayPatientsClicked(){
    //console.log("click");
    this.onDisplayPatients.emit();
  }

  displayBiopsiesClicked(){
    //console.log("click");
    this.onDisplayBiopsies.emit();
  }

  displayTumorsClicked(){
    //console.log("click");
    this.onDisplayTumors.emit();
  }

  displayTherapiesClicked(){
    //console.log("click");
    this.onDisplayTherapies.emit();
  }

  // for testing requests
  sendRequest(){
    // this.ps.getAllPatients(2);      //works
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

    //this.ts.getAllTumors();
    //this.ts.getAllTumorsForPatient("some id");
    //const t = new Tumor(Gradus.Type1, 1, 100, 1, 1, 100, 1, 1, 100, HER2_FISH_SICH.Negative, Her2Status.One, "ki67string", 1);
    //this.ts.addNewTumorForPatient("some id", t);
    //this.ts.updateTumorInfo(t);
    //this.ts.deleteTumorForPatient("some id1", "some id2");

    //this.ths.getAllTherapies();
    //this.ths.getAllTherapiesForPatient("some id");
    //const th = new Therapy(2, true, 2, 3, "nije primenljivo", "neki komentar");
    //this.ths.addNewTherapyForPatient("some id", th);
    //this.ths.updateTherapyInfo(th);
    //this.ths.deleteTherapyForPatient("some id1", "some id2");
  }
}
