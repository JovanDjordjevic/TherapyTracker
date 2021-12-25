import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Gradus, Her2Status, HER2_FISH_SICH } from 'src/app/models/tumor.model';

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
      gradus : ['',[Validators.required]],
      erScore : ['',[Validators.required]],
      erScorePercent : ['',[Validators.required, ]],
      erStatus : ['',[Validators.required]],
      pgrScore : ['',[Validators.required]],
      pgrScorePercent : ['',[Validators.required]],
      pgrStatus : ['',[Validators.required]],
      her2INC : ['',[Validators.required]],
      her2INCPercent : ['',[Validators.required]],
      her2_FISH_SICH : ['',[Validators.required]],
      her2Status : ['',[Validators.required]],
      ki67 : ['nepoznato',[Validators.required]],
      molecularSubtype : ['',[Validators.required]],
    });
  }

  ngOnInit(): void {
    $('.ui.checkbox').checkbox();
  }

  onTumorFormSubmit() {
    //console.log(this.tumorForm);
  }

  onKi67CheckboxChange() {
    this.ki67Disabled = !this.ki67Disabled;
    this.tumorForm.value.ki67 = ""
  }
}
