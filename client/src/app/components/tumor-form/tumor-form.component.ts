import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  Tumor,
  Gradus,
  Her2Status,
  HER2_FISH_SICH,
} from 'src/app/models/tumor.model';
import { MustBeNumber } from 'src/app/validators/common.validator';
import { Ki67Validator } from 'src/app/validators/tumor.validator';
import { Subscription } from 'rxjs';
import { TumorService } from 'src/app/services/tumor.service';
import { Patient } from 'src/app/models/patient.model';
import { PatientService } from 'src/app/services/patient-service.service';

declare const $: any;

@Component({
  selector: 'app-tumor-form',
  templateUrl: './tumor-form.component.html',
  styleUrls: ['./tumor-form.component.css'],
})
export class TumorFormComponent implements OnInit {
  tumorForm: FormGroup;
  GradusEnum = Gradus;
  HER2_FISH_SICH_Enum = HER2_FISH_SICH;
  Her2StatusEnum = Her2Status;

  ki67Disabled: boolean = true;

  patient: Patient;
  sub: Subscription = new Subscription();

  constructor(
    private formBuilder: FormBuilder,
    private patientService: PatientService,
    private tumorService: TumorService
  ) {
    this.patient = this.patientService.getCurrentPatient();

    this.tumorForm = this.formBuilder.group({
      gradus: ['', [Validators.required]],
      erScore: ['', [Validators.required, MustBeNumber]],
      erScorePercent: [
        '',
        [Validators.required, Validators.min(0), Validators.max(100)],
      ],
      erStatus: ['', [Validators.required]],
      pgrScore: ['', [Validators.required], MustBeNumber],
      pgrScorePercent: [
        '',
        [Validators.required, Validators.min(0), Validators.max(100)],
      ],
      pgrStatus: ['', [Validators.required]],
      her2INC: ['', [Validators.required], MustBeNumber],
      her2INCPercent: [
        '',
        [Validators.required, Validators.min(0), Validators.max(100)],
      ],
      her2_FISH_SICH: ['', [Validators.required]],
      her2Status: ['', [Validators.required]],
      ki67: ['nepoznato', [Validators.required, Ki67Validator]],
      molecularSubtype: ['', [Validators.required], MustBeNumber],
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {
    $('.ui.checkbox').checkbox();
  }

  onTumorFormSubmit() {
    const data = this.tumorForm.value;

    const newTumor = new Tumor(
      data.gradus,
      data.erScore,
      data.erScorePercent,
      data.erStatus,
      data.pgrScore,
      data.pgrScorePercent,
      data.pgrStatus,
      data.her2INC,
      data.her2INCPercent,
      data.her2_FISH_SICH,
      data.her2Status,
      data.ki67,
      data.molecularSubtype
    );

    //console.log(this.patient._id);
    this.sub = this.tumorService
      .addNewTumorForPatient(this.patient._id, newTumor)
      .subscribe((addedTumor: Tumor) => {
        console.log('added tumor for ', this.patient._id, ' : ', addedTumor);
      });
  }

  gradusSelected() {
    const gradusValue: Gradus = this.tumorForm.get('gradus')?.value;
    if (gradusValue === Gradus.Unknown) {
      this.tumorForm.patchValue({ erStatus: 0, pgrStatus: 0 });
    } else {
      const erPercentValue = parseFloat(
        this.tumorForm.get('erScorePercent')?.value
      );
      if (!Number.isNaN(erPercentValue)) {
        if (erPercentValue < 1) {
          this.tumorForm.patchValue({ erStatus: 0 });
        } else {
          this.tumorForm.patchValue({ erStatus: 1 });
        }
      }

      const pgrPercentValue = parseFloat(
        this.tumorForm.get('pgrScorePercent')?.value
      );
      if (!Number.isNaN(pgrPercentValue)) {
        if (pgrPercentValue < 1) {
          this.tumorForm.patchValue({ pgrStatus: 0 });
        } else {
          this.tumorForm.patchValue({ pgrStatus: 1 });
        }
      }
    }
  }

  erPercentEntered() {
    const erPercentValue = parseFloat(
      this.tumorForm.get('erScorePercent')?.value
    );
    const gradusValue: Gradus = this.tumorForm.get('gradus')?.value;
    if (gradusValue != Gradus.Unknown) {
      if (erPercentValue < 1) {
        this.tumorForm.patchValue({ erStatus: 0 });
      } else {
        this.tumorForm.patchValue({ erStatus: 1 });
      }
    }
  }

  pgrPercentEntered() {
    const pgrPercentValue = parseFloat(
      this.tumorForm.get('pgrScorePercent')?.value
    );
    const gradusValue: Gradus = this.tumorForm.get('gradus')?.value;
    if (gradusValue != Gradus.Unknown) {
      if (pgrPercentValue < 1) {
        this.tumorForm.patchValue({ pgrStatus: 0 });
      } else {
        this.tumorForm.patchValue({ pgrStatus: 1 });
      }
    }
  }

  onKi67CheckboxChange() {
    if (this.ki67Disabled) {
      this.tumorForm.patchValue({
        ki67: '',
      });
    } else {
      this.tumorForm.patchValue({
        ki67: 'nepoznato',
      });
    }

    this.ki67Disabled = !this.ki67Disabled;
  }
}
