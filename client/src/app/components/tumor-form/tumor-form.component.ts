import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Gradus, Her2Status, HER2_FISH_SICH } from 'src/app/models/tumor.model';
import { Ki67Validator, MustBeNumber } from 'src/app/validators/tumor.validator';

declare const $: any;

@Component({
  selector: 'app-tumor-form',
  templateUrl: './tumor-form.component.html',
  styleUrls: ['./tumor-form.component.css']
})
export class TumorFormComponent implements OnInit {

  tumorForm : FormGroup;
  GradusEnum = Gradus;
  HER2_FISH_SICH_Enum = HER2_FISH_SICH;
  Her2StatusEnum = Her2Status;

  ki67Disabled : boolean = true;

  constructor(private formBuilder : FormBuilder) { 
    this.tumorForm = this.formBuilder.group({
      gradus : ['', [Validators.required]],
      erScore : ['', [Validators.required, MustBeNumber]],
      erScorePercent : ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      erStatus : ['', [Validators.required]],
      pgrScore : ['', [Validators.required], MustBeNumber],
      pgrScorePercent : ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      pgrStatus : ['', [Validators.required]],
      her2INC : ['', [Validators.required], MustBeNumber],
      her2INCPercent : ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      her2_FISH_SICH : ['', [Validators.required]],
      her2Status : ['', [Validators.required]],
      ki67 : ['nepoznato', [Validators.required, Ki67Validator]],
      molecularSubtype : ['', [Validators.required], MustBeNumber],
    });
  }

  ngOnInit(): void {
    $('.ui.checkbox').checkbox();
  }

  onTumorFormSubmit() {
    console.log(this.tumorForm);
  }

  gradusSelected(){
    const gradusValue = this.tumorForm.get("gradus")?.value
    if (gradusValue === "GradusEnum.Unknown") {   // kao string jer ovaj value vraca string a mrzi me da pravim konverziju
      this.tumorForm.patchValue({erStatus: 0, pgrStatus : 0})
    }
  }

  erPercentEntered(){
    const erPercentValue = parseInt(this.tumorForm.get("erScorePercent")?.value)
    if (erPercentValue < 1) {
      this.tumorForm.patchValue({erStatus: 0})
    }
    else {
      this.tumorForm.patchValue({erStatus: 1})
    }
  }

  pgrPercentEntered(){
    const pgrPercentValue = parseInt(this.tumorForm.get("pgrScorePercent")?.value)
    if (pgrPercentValue < 1) {
      this.tumorForm.patchValue({erStatus: 0})
    }
    else {
      this.tumorForm.patchValue({erStatus: 1})
    }
  }

  onKi67CheckboxChange() {
    if (this.ki67Disabled) { 
      this.tumorForm.patchValue({
        ki67 : ''
      });
    }
    else {
      this.tumorForm.patchValue({
        ki67 : 'nepoznato'
      });
    }
    
    this.ki67Disabled = !this.ki67Disabled;
  }
}
