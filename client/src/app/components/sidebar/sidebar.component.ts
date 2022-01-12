import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BiopsyService } from 'src/app/services/biopsy-service.service';
import { CommonService } from 'src/app/services/common.service';
import { TherapyService } from 'src/app/services/therapy.service';
import { TumorService } from 'src/app/services/tumor.service';
import { Page } from 'src/app/models/enums.model';
import { type } from 'os';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})

export class SidebarComponent implements OnInit {

  PageEnum = Page;

  onClick(e: any) {
    this.id = e.target.id;
    this.commonService.sideBarItemClicked.emit(this.id);
    console.log(e + " " + typeof (e));
    console.log(this.id, typeof (this.id));
  }

  id: Page = Page.Main;

  constructor(private commonService: CommonService, private bs: BiopsyService, private ts: TumorService, private ths: TherapyService) { }

  ngOnInit(): void { }

  // for testing requests
  sendRequest() {
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
